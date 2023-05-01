import { createStore } from "redux";
import Rootreducers from "./Rootreducers";

const store = createStore(
  Rootreducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
