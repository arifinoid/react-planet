import React, { ReactElement, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import Logo from "../../assets/images/star-wars-logo.png";
import SearchIcon from "../../assets/images/search_icon.svg";
import Close from "../../assets/images/close.svg";
import { color, device } from "../../globalStyle";

import { ApplicationState } from "../../typings/state";
import {
  searchPlanet,
  cleanUpSearch,
} from "../../modules/search-planet/action";

interface Props {
  to: string;
}

const NavbarContainer = styled.div`
  height: 2rem;
  background-color: ${color.black};
  padding: 24px;
  margin: auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${device.mobileM} {
    padding: 12px;
  }
`;

const NavbarLogo = styled(Link)<Props>`
  img {
    max-width: 7rem;

    @media ${device.mobileM} {
      max-width: 4rem;
    }
  }
`;

const Searchbar = styled.form`
  display: flex;
  border: 2px solid ${color.yellow};
  border-radius: 4px;

  @media ${device.mobileM} {
    dispay: flex;
    justify-content: space-between;
    width: calc(100% / 2);
  }

  button {
    margin: 0;
    padding: 8px;
    background-color: ${color.black};
    border: none;
    outline: none;

    &:active {
      border: none;
      outline: none;
    }

    img {
      height: 30px;
      width: 30px;
    }
  }
`;

const SearcbarInput = styled.input`
  width: 100%;
  color: ${color.yellow};
  background-color: ${color.black};
  background-image: url(${SearchIcon});
  background-position: 10px 10px;
  background-repeat: no-repeat;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-size: 16px;
  padding: 0 20px;

  @media ${device.mobileM} {
    padding: 0 10px;
  }

  &:focus {
    outline: none;
  }
`;

const mapStateToProps = ({ searchPlanet }: ApplicationState) => ({
  data: searchPlanet.data,
  isLoading: searchPlanet.isLoading,
  error: searchPlanet.errorMessage,
  pagination: searchPlanet.pagination,
  isSearching: searchPlanet.isSearching,
});

const mapDispatchToProps = { searchPlanet, cleanUpSearch };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type IProps = PropsFromRedux & {};

const Navbar = ({
  searchPlanet,
  isSearching,
  cleanUpSearch,
}: IProps): ReactElement<{}> => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (!value) return;

    searchPlanet(value);
  };

  const handleOnClick = () => {
    if (isSearching) {
      cleanUpSearch();
      setValue("");
    }
  };

  return (
    <NavbarContainer>
      <NavbarLogo to="/">
        <img src={Logo} alt="star-wars-logo" />
      </NavbarLogo>
      <Searchbar onSubmit={handleSubmit}>
        <SearcbarInput
          placeholder="Search planets here..."
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          value={value}
        />
        <button type="submit" onClick={handleOnClick}>
          <img
            src={!isSearching ? SearchIcon : Close}
            alt={isSearching ? "search-button" : "close-button"}
          />
        </button>
      </Searchbar>
    </NavbarContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
