import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { connect, ConnectedProps } from "react-redux";

import { ApplicationState } from "../../typings/state";
import {
  fetchPlanetDetail,
  resetPlanetDetail,
} from "../../modules/planet-detail/action";
import { color, device } from "../../globalStyle";
import Loader from "../../components/Loader";
import Placeholder from "../../assets/images/placeholder.jpg";

const Container = styled.div`
  width: 100%;
  min-height: 75vh;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 1rem;
  width: 80%;
  margin: auto;
  padding: 1rem;
  min-height: 30vh;

  @media ${device.mobileM} {
    padding: 0.25rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    min-height: calc(90vh - 2rem);
  }
`;

const ImageContainer = styled.div`
  width: calc(100% / 2);
  display: flex;
  align-items: center;
  padding: 1rem;

  @media ${device.mobileM} {
    padding: 1rem;
    width: calc(100% - 2rem);
  }
`;

const PlanetImage = styled.img`
  width: 100%;
  height: auto;
`;

const PlanetDescription = styled.div`
  padding: 3rem;
  background-color: ${color.light};
  width: 100%;

  @media ${device.mobileM} {
    padding: 1rem;
    width: calc(100% - 2rem);
  }
`;

const PlanetName = styled.h1`
  font-weight: 500;
  font-size: 24px;
`;

const Description = styled.p`
  font-weight: 200;
  font-size: 16px;
  margin: 0;
`;

const mapStateToProps = ({ planetDetail }: ApplicationState) => ({
  data: planetDetail.data,
  hasError: planetDetail.hasError,
  errorMessage: planetDetail.errorMessage,
  isLoading: planetDetail.isLoading,
});

interface IMatch {
  params: IID;
}

interface IID {
  id: number;
}

const mapDispatchToProps = { fetchPlanetDetail, resetPlanetDetail };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & { match: IMatch };

const PlanetDetail = ({
  match,
  fetchPlanetDetail,
  resetPlanetDetail,
  data,
  isLoading,
}: Props) => {
  const { id } = match.params;

  useEffect(() => {
    fetchPlanetDetail(id);

    return function cleanUp() {
      resetPlanetDetail();
    };
  }, [id, fetchPlanetDetail, resetPlanetDetail]);

  if (isLoading) return <Loader isLoading={isLoading} />;
  return (
    <Container>
      <InnerContainer>
        <ImageContainer>
          <PlanetImage
            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
            alt={`planets-${id}`}
            onError={(e: any) => {
              e.target.src = Placeholder;
            }}
          />
        </ImageContainer>
        <PlanetDescription>
          <PlanetName>{data.name}</PlanetName>
          <Description>
            Rotation Period: {data.rotation_period} days
          </Description>
          <Description>Orbital Period: {data.orbital_period} days</Description>
          <Description>Diameter: {data.diameter} km</Description>
          <Description>Gravity: {data.gravity} Standard </Description>
          <Description>Terrain: {data.terrain} </Description>
          <Description>Surface Water: {data.surface_water}%</Description>
          <Description>Climate: {data.climate}</Description>
        </PlanetDescription>
      </InnerContainer>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanetDetail);
