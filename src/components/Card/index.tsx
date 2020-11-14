import React, { FunctionComponent, ReactNode } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { color } from "../../globalStyle";

interface PropTypes {
  footer: ReactNode;
  index: number;
}

const CardContainer = styled(Link)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 20%;
  margin-bottom: 2rem;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  &:not(:last-of-type) {
    margin-right: 1rem;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const CardFooter = styled.div`
  padding: 1rem 2rem;
  background-color: ${color.light};

  span {
    font-weight: 500;
    color: ${color.darkGrey};
    text-decoration: none;
  }
`;

export default (({ index, footer }) => (
  <CardContainer to={`/planets/${index + 1}`}>
    <img
      src={`https://starwars-visualguide.com/assets/img/planets/${
        index + 1
      }.jpg`}
      alt={`planets-${index + +1}`}
      onError={(e: any) => {
        e.target.src =
          "https://starwars-visualguide.com/assets/img/placeholder.jpg";
      }}
    />
    <CardFooter>{footer}</CardFooter>
  </CardContainer>
)) as FunctionComponent<PropTypes>;
