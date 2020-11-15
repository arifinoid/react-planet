import Redux from "redux";

import { API_BASEURL } from "../../utils";
import { callApi } from "../../utils/callApi";
import { PlanetDetailActionTypes } from "./types";

interface IPayload {
  id: number;
}

export interface IFetchPlanetDetail {
  type:
    | typeof PlanetDetailActionTypes.FETCH_PLANET_DETAIL
    | typeof PlanetDetailActionTypes.FETCH_PLANET_DETAIL_SUCCESS
    | typeof PlanetDetailActionTypes.FETCH_PLANET_DETAIL_ERROR
    | typeof PlanetDetailActionTypes.RESET_PLANET_DETAIL_RESET
    | typeof PlanetDetailActionTypes.RESET_PLANET_DETAIL_RESET_SUCCESS
    | typeof PlanetDetailActionTypes.RESET_PLANET_DETAIL_RESET_ERROR;
  payload: IPayload;
}

export type PlanetDetailActionsType = IFetchPlanetDetail;

export const fetchPlanetDetail = (id: number) => async (
  dispacth: Redux.Dispatch
) => {
  dispacth({
    type: PlanetDetailActionTypes.FETCH_PLANET_DETAIL,
  });

  try {
    const data: any = await callApi("get", API_BASEURL, `/planets/${id}`);

    dispacth({
      type: PlanetDetailActionTypes.FETCH_PLANET_DETAIL_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    dispacth({
      type: PlanetDetailActionTypes.FETCH_PLANET_DETAIL_ERROR,
      payload: {
        hasError: true,
        message: error.message,
      },
    });
    return error;
  }
};

export const resetPlanetDetail = () => async (dispacth: Redux.Dispatch) => {
  dispacth({
    type: PlanetDetailActionTypes.RESET_PLANET_DETAIL_RESET,
  });

  try {
    dispacth({
      type: PlanetDetailActionTypes.RESET_PLANET_DETAIL_RESET_SUCCESS,
    });
  } catch (error) {
    dispacth({
      type: PlanetDetailActionTypes.RESET_PLANET_DETAIL_RESET_ERROR,
      payload: {
        hasError: true,
        message: error.meesage,
      },
    });
    return error;
  }
};
