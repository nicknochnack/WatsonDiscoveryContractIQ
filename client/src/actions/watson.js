import { WATSON_QUERY } from "./types";
import api from "../utils/api";

export const sendQuery = (query) => async (dispatch) => {
  const result = await api.post("/watson/query", { query });
  const payload = result.data.results;
  console.log(payload);
  const type = WATSON_QUERY;
  const action = { type, payload };
  dispatch(action);
};
