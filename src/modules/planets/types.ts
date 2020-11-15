import { IPlanet } from "../../typings/api";

export enum PlanetsActionTypes {
  FETCH_PLANET = "@@planets/FETCH_PLANET",
  FETCH_PLANET_SUCCESS = "@@planets/FETCH_PLANET_SUCCESS",
  FETCH_PLANET_ERROR = "@@planets/FETCH_ERROR",
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface PlanetState {
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string;
  readonly data: IPlanet[];
  readonly pagination: {
    currentPage: number;
    hasPrev: boolean;
    hasNext: boolean;
    total: number;
  };
}
