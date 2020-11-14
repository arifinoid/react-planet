import { combineReducers } from "redux";

import { planetsReducer } from "./planets/reducer";

const rootReducers = combineReducers({
  planet: planetsReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
