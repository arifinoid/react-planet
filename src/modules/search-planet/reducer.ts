import { Reducer } from "react";

import { ISearchPlanet } from "../../typings/state";
import { SearchPlanetsActionTypes, PlanetState } from "./types";

const initialState: ISearchPlanet = {
  isSearching: false,
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

const reducer: Reducer<ISearchPlanet, PlanetState> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case SearchPlanetsActionTypes.SEARCH_PLANET: {
      return {
        ...state,
        isSearching: true,
        isLoading: true,
        hasError: false,
      };
    }

    case SearchPlanetsActionTypes.SEARCH_PLANET_SUCCESS: {
      return {
        ...state,
        isSearching: true,
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

    case SearchPlanetsActionTypes.SEARCH_PLANET_ERROR: {
      return {
        ...state,
        isSearching: true,
        isLoading: false,
        hasError: action.payload.hasError,
        errorMessage: action.payload.errorMessage,
      };
    }

    case SearchPlanetsActionTypes.CLEAN_UP_SEARCH_PLANET: {
      return {
        ...state,
        isSearching: false,
        isLoading: true,
      };
    }

    case SearchPlanetsActionTypes.CLEAN_UP_SEARCH_PLANET_SUCCESS: {
      return {
        ...state,
        isSearching: false,
        isLoading: false,
        data: [],
      };
    }

    case SearchPlanetsActionTypes.CLEAN_UP_SEARCH_PLANET_ERROR: {
      return {
        ...state,
        isSearching: false,
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

export { reducer as searchPlanetReducer };
