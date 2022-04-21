import { DATA, SETSTATE } from "./actionTypes";
import axios from "axios";

export const addData = () => (dispatch) => {
  axios
    .get("https://api.rootnet.in/covid19-in/stats/latest")
    .then((res) => dispatch(addDataSucess(res.data.data.regional)));
};

export const addDataSucess = (load) => ({
  type: DATA,
  payload: load,
});

export const setStateData = (payload) => ({
  type: SETSTATE,
  payload,
});
