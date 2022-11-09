import { WATSON_QUERY } from "../actions/types";

const initialState = [];

const watson = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case WATSON_QUERY:
      return payload;
    default:
      return state;
  }
};

export default watson;
