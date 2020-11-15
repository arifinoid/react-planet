import React, { Fragment } from "react";
import debounce from "lodash.debounce";
import styled from "@emotion/styled";
import { connect, ConnectedProps } from "react-redux";

import Card from "../../components/Card";

import { fetchPlanetList } from "../../modules/planets/action";
import { ApplicationState } from "../../typings/state";
import { IPlanet } from "../../typings/api";
import { color, device } from "../../globalStyle";
import Loader from "../../components/Loader";

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  background-color: ${color.black};
  text-align: -webkit-center;

  @media ${device.mobileM} {
    padding: 1rem;
    display: flex;
    flex-wrap: none;
    align-items: center;
    text-align: -webkit-left;
  }
`;

const NotFoundContainer = styled.div`
  height: 50vh;
  margin: 0 auto;
  display: flex;
  align-items: center;

  span {
    color: ${color.yellow};
    font-weight: 400;
    font-size: 36px;
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const mapStateToProps = ({ planet, searchPlanet }: ApplicationState) => ({
  data: planet.data,
  isLoading: planet.isLoading,
  error: planet.errorMessage,
  pagination: planet.pagination,
  searchData: searchPlanet.data,
  isSearching: searchPlanet.isSearching,
  isSearchLoading: searchPlanet.isLoading,
});

const mapDispatchToProps = { fetchPlanetList };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

class Home extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    window.onscroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        const { pagination, fetchPlanetList } = this.props;

        if (pagination.hasNext) {
          fetchPlanetList(pagination.currentPage + 1);
        }
      }
    }, 100);
  }

  async componentDidMount() {
    const { fetchPlanetList, pagination } = this.props;
    await fetchPlanetList(pagination.currentPage);
  }

  render() {
    const {
      data,
      isLoading,
      isSearching,
      searchData,
      isSearchLoading,
    } = this.props;
    const planets = isSearching ? searchData : data;

    const renderSearch = () =>
      isSearchLoading ? (
        <LoaderContainer>
          <Loader isLoading={isSearchLoading} />
        </LoaderContainer>
      ) : (
        <NotFoundContainer>
          <span>404 Not Found 🚀</span>
        </NotFoundContainer>
      );

    return (
      <Fragment>
        <Container>
          {planets.length > 0
            ? planets.map((item: IPlanet, index: number) => {
                const id = parseInt(item.url.split("/")[5]);

                return (
                  <Card key={index} id={id} footer={<span>{item.name}</span>} />
                );
              })
            : isSearching && renderSearch()}
        </Container>
        <Loader isLoading={isLoading} />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
