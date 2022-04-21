import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { covidReducer } from "./reducer";

export const store = createStore(covidReducer, applyMiddleware(thunk));
