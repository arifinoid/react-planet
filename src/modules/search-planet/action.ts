import Redux from "redux";

import { SearchPlanetsActionTypes } from "./types";

import { API_BASEURL } from "../../utils";
import { IPlanetData, IPlanet } from "../../typings/api";
import { callApi } from "../../utils/callApi";

interface IPayload {
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
  data: IPlanet[];
  page: number;
}

interface IFetchPlanet {
  type:
    | typeof SearchPlanetsActionTypes.SEARCH_PLANET
    | typeof SearchPlanetsActionTypes.SEARCH_PLANET_SUCCESS
    | typeof SearchPlanetsActionTypes.SEARCH_PLANET_ERROR;
  payload: IPayload;
}

export type SearchPlanetActionTypes = IFetchPlanet;

export const searchPlanet = (keywords: string) => async (
  dispatch: Redux.Dispatch
) => {
  dispatch({
    type: SearchPlanetsActionTypes.SEARCH_PLANET,
  });

  try {
    const data: IPlanetData = await callApi(
      "get",
      API_BASEURL,
      `/planets/?search=${keywords}`
    );

    dispatch({
      type: SearchPlanetsActionTypes.SEARCH_PLANET_SUCCESS,
      payload: {
        total: data.count,
        hasNext: !!data.next,
        hasPrev: !!data.previous,
        data: data.results,
      },
    });
  } catch (e) {
    dispatch({
      type: SearchPlanetsActionTypes.SEARCH_PLANET_ERROR,
      payload: {
        hasError: true,
        errorMessage: e.message,
      },
    });
    return e;
  }
};

export const cleanUpSearch = () => async (dispatch: Redux.Dispatch) => {
  dispatch({
    type: SearchPlanetsActionTypes.CLEAN_UP_SEARCH_PLANET,
  });

  try {
    dispatch({
      type: SearchPlanetsActionTypes.CLEAN_UP_SEARCH_PLANET_SUCCESS,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: SearchPlanetsActionTypes.CLEAN_UP_SEARCH_PLANET_ERROR,
      payload: {
        hasError: true,
        errorMessage: e.message,
      },
    });
    return e;
  }
};
