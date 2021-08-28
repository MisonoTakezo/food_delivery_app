import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Restaurants } from "./containers/Restaurants.jsx";
import { Foods } from "./containers/Foods.jsx";
import { Orders } from "./containers/Orders.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        // 店舗ページ
        <Route
          exact
          path="/restaurants">
          <Restaurants />
        </Route>
        // フード一覧ページ
        <Route
          exact
          path="/foods">
          <Foods />
        </Route>
        // 注文ページ
        <Route
          exact
          path="/orders">
          <Orders />
        </Route>

        <Route
          exact
          path="/restaurants/:restaurantsId/foods"
          render={({ match }) => <Foods match={match} />
          } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
