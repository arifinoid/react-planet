import { combineReducers } from "redux";

import { planetDetailReducer } from "./planet-detail/reducer";
import { planetsReducer } from "./planets/reducer";
import { searchPlanetReducer } from "./search-planet/reducer";

const rootReducers = combineReducers({
  planet: planetsReducer,
  planetDetail: planetDetailReducer,
  searchPlanet: searchPlanetReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
