import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import MovieView from "../MovieView/MovieView";

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Route path="/" exact>
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
