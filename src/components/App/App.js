import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import MovieView from "../MovieView/MovieView";
import FormAddNew from "../FormPopup/FormAddNew";

function App() {
  return (
    <div className="App">
      <h1 className="title-saga">The Movies Saga!</h1>
      <Router>
        <Route path="/" exact>
          <FormAddNew />
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/movieView/:id">
          <MovieView />
        </Route>
        {/* Add Movie page */}
      </Router>
    </div>
  );
}

export default App;
