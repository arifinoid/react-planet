import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/star-wars-logo.png";
import { color } from "../../globalStyle";

interface Props {
  to: string;
}

const NavbarStyled = styled.div`
  height: 2rem;
  background-color: ${color.black};
  padding: 1rem;
  margin: auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarLogo = styled(Link)<Props>`
  img {
    max-width: 5rem;
  }
`;

const Navbar = (): ReactElement<{}> => (
  <NavbarStyled>
    <NavbarLogo to="/">
      <img src={Logo} alt="star-wars-logo" />
    </NavbarLogo>
  </NavbarStyled>
);

export default Navbar;
