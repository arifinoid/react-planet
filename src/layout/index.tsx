import React from "react";
import styled from "@emotion/styled";

import Navbar from "../components/Navbar";
import { color } from "../globalStyle";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${color.black};
`;

const Footer = styled.footer`
  height: 10px;
  background-color: ${color.black};
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 2rem;

  span {
    color: ${color.yellow};
    font-weight: 300;

    a {
      color: ${color.yellow};
      text-decoration: none;

      &:visited {
        color: ${color.yellow};
      }
    }
  }
`;

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Container>
    <Navbar />
    {children}
    <Footer>
      <span>
        <a
          href="http://github.com/arifinoid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Arifinoid
        </a>
        , {new Date().getFullYear()}
      </span>
    </Footer>
  </Container>
);

export default Layout;
