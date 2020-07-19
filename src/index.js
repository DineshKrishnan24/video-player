import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import Search from "./components/Search";
import VedioDisplay from "./components/VideoDisplay";
import reducers from "./store/reducers";

function App() {
  const localValue = localStorage.getItem("vedios");
  const initialState = localValue ? JSON.parse(localValue) : [];
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <>
      <Search state={state} dispatch={dispatch} />
      <VedioDisplay state={state} dispatch={dispatch}></VedioDisplay>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
