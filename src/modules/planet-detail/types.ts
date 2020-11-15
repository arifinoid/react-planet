import { IPlanet } from "../../typings/api";

export enum PlanetDetailActionTypes {
  FETCH_PLANET_DETAIL = "@@planet_detail/FETCH_PLANET_DETAIL",
  FETCH_PLANET_DETAIL_SUCCESS = "@@planet_detail/FETCH_PLANET_DETAIL_SUCCESS",
  FETCH_PLANET_DETAIL_ERROR = "@@planet_detail/FETCH_PLANET_DETAIL_ERROR",
  RESET_PLANET_DETAIL_RESET = "@@planet_detail/RESET_PLANET_DETAIL_RESET",
  RESET_PLANET_DETAIL_RESET_SUCCESS = "@@planet_detail/RESET_PLANET_DETAIL_RESET_SUCCESS",
  RESET_PLANET_DETAIL_RESET_ERROR = "@@planet_detail/RESET_PLANET_DETAIL_RESET_ERROR",
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface PlanetDetailState {
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string;
  readonly data: IPlanet;
}
