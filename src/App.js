import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UsersCards from "./pages/UserCards";

import './styles/App.scss';

function App() {
  return (
      <Router>
        <Switch>
          <Route path='/users' component={UsersCards} />
          <Route path='/' to='/users' />
        </Switch>
      </Router>
  );
}

export default App;