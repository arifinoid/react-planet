import { combineReducers } from "redux";

import { planetDetailReducer } from "./planet-detail/reducer";
import { planetsReducer } from "./planets/reducer";

const rootReducers = combineReducers({
  planet: planetsReducer,
  planetDetail: planetDetailReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
