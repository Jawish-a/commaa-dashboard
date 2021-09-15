import { createStore } from "redux";

const initialState = {
  sidebarShow: "responsive",
  locale: localStorage.getItem("locale") || "en",
  user: {},
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
