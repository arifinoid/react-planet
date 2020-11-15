import { IPlanet } from "../../typings/api";

export enum SearchPlanetsActionTypes {
  SEARCH_PLANET = "@@planets/SEARCH_PLANET",
  SEARCH_PLANET_SUCCESS = "@@planets/SEARCH_PLANET_SUCCESS",
  SEARCH_PLANET_ERROR = "@@planets/SEARCH_ERROR",
  CLEAN_UP_SEARCH_PLANET = "@@planets/CELAN_UP_SEARCH_PLANET",
  CLEAN_UP_SEARCH_PLANET_SUCCESS = "@@planets/CELAN_UP_SEARCH_PLANET_SUCCESS",
  CLEAN_UP_SEARCH_PLANET_ERROR = "@@planets/CELAN_UP_SEARCH_ERROR",
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
