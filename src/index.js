import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("SET_PAGE_VIEW", fetchPageData);
  yield takeEvery("ADD_MOVIE", addMovie);
  yield takeEvery("FETCH_GENRES", fetchGenres);
}

function* fetchGenres() {
  try {
    const genres = yield axios.get("/api/genre");
    yield put({ type: "SET_GENRES", payload: genres.data });
    console.log(genres.data);
  } catch (err) {
    console.log("error in fetchGenres");
  }
}

function* fetchPageData(action) {
  // get individual page data
  try {
    const pageData = yield axios.get(`/api/movie/movieView/${action.payload}`);
    yield put({ type: "SET_DETAILS_VIEW", payload: pageData.data });
  } catch (err) {
    console.log("error in fetchPageData", err);
  }
}

function* addMovie(action) {
  try {
    yield axios.post("/api/movie", action.payload);
    yield put({ type: "FETCH_MOVIES" });
  } catch (err) {
    console.log("error in addMovie", err);
  }
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get("/api/movie");
    console.log("get all:", movies.data);
    yield put({ type: "SET_MOVIES", payload: movies.data });
  } catch {
    console.log("get all error");
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

const setPageData = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS_VIEW":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    setPageData,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
