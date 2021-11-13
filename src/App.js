import React from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
            {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
            {/* <Route path="/reset" component={Reset} /> */}
          </Switch>
      </div>
    </Router>
  );
}

export default App;