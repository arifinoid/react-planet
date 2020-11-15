import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import { RingLoader } from "react-spinners";

import { color } from "../../globalStyle";

const Container = styled.div`
  min-height: 60vh;
  margin: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-weight: 400;
    font-size: 32px;
    color: ${color.yellow};
  }
`;

interface PropTypes {
  isLoading: boolean;
}

export default (({ isLoading }) => (
  <Container>
    <RingLoader loading={isLoading} color={color.yellow} />
    <h1>Loading ... </h1>
  </Container>
)) as FunctionComponent<PropTypes>;
