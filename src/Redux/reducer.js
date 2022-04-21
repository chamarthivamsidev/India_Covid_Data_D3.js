import { SETSTATE, DATA } from "./actionTypes";

let init = {
  data: [],
  state: "",
  confirmedCases: 0,
  discharged: 0,
  deaths: 0,
};

export const covidReducer = (state = init, { type, payload }) => {
  switch (type) {
    case DATA: {
      return { ...state, data: payload };
    }
    case SETSTATE: {
      let IndiaCovidData = state.data;
      let getOneStateData = IndiaCovidData.find((e) => e.loc === payload);
      let newState = {
        ...state,
        state: getOneStateData.loc,
        confirmedCases: getOneStateData.confirmedCasesIndian,
        discharged: getOneStateData.discharged,
        deaths: getOneStateData.deaths,
      };
      return newState;
    }
    default:
      return state;
  }
};
