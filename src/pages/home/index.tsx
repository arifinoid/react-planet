import React, { Fragment } from "react";
import debounce from "lodash.debounce";
import styled from "@emotion/styled";
import { connect, ConnectedProps } from "react-redux";

import Card from "../../components/Card";

import { fetchPlanetList } from "../../modules/planets/action";
import { ApplicationState } from "../../typings/state";
import { IPlanet } from "../../typings/api";
import { color } from "../../globalStyle";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  background-color: ${color.black};
`;

const Footer = styled.footer`
  background-color: ${color.black};
  display: flex;
  justify-content: center;
  padding: 1rem;

  span {
    color: ${color.yellow};
    font-weight: 300;

    a {
      text-decoration: none;

      &:visited {
        color: ${color.yellow};
      }
    }
  }
`;

const mapStateToProps = ({ planet }: ApplicationState) => ({
  data: planet.data,
  isLoading: planet.isLoading,
  error: planet.errorMessage,
  pagination: planet.pagination,
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
    const { data } = this.props;
    return (
      <Fragment>
        <Container>
          {data.map((item: IPlanet, index: number) => (
            <Card key={index} index={index} footer={<span>{item.name}</span>} />
          ))}
        </Container>
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
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
