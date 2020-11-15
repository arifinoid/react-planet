import Redux from "redux";

import { PlanetsActionTypes } from "./types";

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
    | typeof PlanetsActionTypes.FETCH_PLANET
    | typeof PlanetsActionTypes.FETCH_PLANET_SUCCESS
    | typeof PlanetsActionTypes.FETCH_PLANET_ERROR;
  payload: IPayload;
}

export type PlanetActionTypes = IFetchPlanet;

export const fetchPlanetList = (page: number = 1) => async (
  dispatch: Redux.Dispatch
) => {
  dispatch({
    type: PlanetsActionTypes.FETCH_PLANET,
  });

  try {
    const data: IPlanetData = await callApi(
      "get",
      API_BASEURL,
      `/planets/?page=${page}`
    );

    dispatch({
      type: PlanetsActionTypes.FETCH_PLANET_SUCCESS,
      payload: {
        total: data.count,
        hasNext: !!data.next,
        hasPrev: !!data.previous,
        data: data.results,
        page,
      },
    });
  } catch (e) {
    dispatch({
      type: PlanetsActionTypes.FETCH_PLANET_ERROR,
      payload: {
        hasError: true,
        errorMessage: e.message,
      },
    });
    return e;
  }
};
