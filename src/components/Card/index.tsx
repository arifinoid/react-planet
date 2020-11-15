import React, { FunctionComponent, ReactNode } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { color, device } from "../../globalStyle";
import Placeholder from "../../assets/images/placeholder.jpg";

interface PropTypes {
  footer: ReactNode;
  id: number;
}

const CardContainer = styled(Link)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 20%;
  margin-bottom: 2rem;
  text-decoration: none;
  flex: 1 1 21%;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  @media ${device.mobileM} {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    align-items: center;

    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }
`;

const InnerContainer = styled.div`
  max-width: calc(100% / 1.5);
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: auto;
  }
`;

const CardFooter = styled.div`
  padding: 1rem 2rem;
  background-color: ${color.light};
  width: 100%;

  span {
    font-weight: 500;
    color: ${color.darkGrey};
  }
`;

export default (({ id, footer }) => (
  <CardContainer to={`/planet/${id}`}>
    <InnerContainer>
      <img
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt={`planets-${id}`}
        onError={(e: any) => {
          e.target.src = Placeholder;
        }}
      />
      <CardFooter>{footer}</CardFooter>
    </InnerContainer>
  </CardContainer>
)) as FunctionComponent<PropTypes>;
