import { IPlanet } from "./api";

export interface ApplicationState {
  planet: IPlanetState;
  planetDetail: IPlanetDetailState;
}

export interface IPlanetState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  data: IPlanet[];
  pagination: {
    currentPage: number;
    hasPrev: boolean;
    hasNext: boolean;
    total: number;
  };
}

export interface IPlanetDetailState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  data: IPlanet;
}
