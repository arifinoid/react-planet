import { Reducer } from "react";

import { IPlanetState } from "../../typings/state";
import { PlanetsActionTypes, PlanetState } from "./types";

export const initialState: IPlanetState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  data: [],
  pagination: {
    currentPage: 1,
    hasPrev: false,
    hasNext: false,
    total: 0,
  },
};

const reducer: Reducer<IPlanetState, PlanetState> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case PlanetsActionTypes.FETCH_PLANET: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case PlanetsActionTypes.FETCH_PLANET_AND_RESET: {
      return {
        ...state,
        data: [],
        isLoading: true,
        hasError: false,
      };
    }
    case PlanetsActionTypes.FETCH_PLANET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data:
          state.data.length <= 0 ||
          state.pagination.currentPage < action.payload.page
            ? state.data.concat(action.payload.data)
            : state.data,
        pagination: {
          ...state.pagination,
          hasPrev: action.payload.hasPrev,
          hasNext: action.payload.hasNext,
          currentPage: action.payload.page,
          total: action.payload.total,
        },
      };
    }
    case PlanetsActionTypes.FETCH_ERROR: {
      return { ...state, isLoading: false, hasError: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as planetsReducer };
