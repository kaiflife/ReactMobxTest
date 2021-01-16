import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
} from "react-router-dom";
import UsersCards from "./pages/UserCards";
import './styles/App.scss';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/users' component={UsersCards} />
                <Redirect from='/' to='/users' />
            </Switch>
        </Router>
    );
};

export default App;