import { Reducer } from "react";

import { IPlanetDetailState } from "../../typings/state";
import { PlanetDetailActionTypes, PlanetDetailState } from "./types";

const initialState: IPlanetDetailState = {
  data: {
    name: "",
    diameter: "",
    rotation_period: "",
    orbital_period: "",
    gravity: "",
    population: "",
    climate: "",
    terrain: "",
    surface_water: "",
    residents: [],
    films: [],
    url: "",
    created: "",
    edited: "",
  },
  errorMessage: "",
  hasError: false,
  isLoading: false,
};

const reducer: Reducer<IPlanetDetailState, PlanetDetailState> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case PlanetDetailActionTypes.FETCH_PLANET_DETAIL: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }

    case PlanetDetailActionTypes.FETCH_PLANET_DETAIL_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        hasError: false,
      };
    }

    case PlanetDetailActionTypes.FETCH_PLANET_DETAIL_ERROR: {
      return {
        ...state,
        hasError: action.payload.data,
        isLoading: false,
      };
    }

    case PlanetDetailActionTypes.RESET_PLANET_DETAIL_RESET: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }

    case PlanetDetailActionTypes.RESET_PLANET_DETAIL_RESET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: initialState.data,
      };
    }

    case PlanetDetailActionTypes.RESET_PLANET_DETAIL_RESET_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: action.payload.hasError,
        errorMessage: action.payload.errorMessage,
      };
    }

    default: {
      return state;
    }
  }
};

export { reducer as planetDetailReducer };
