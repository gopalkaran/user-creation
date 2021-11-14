import React from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import VerifyToken from "./components/VerifyToken";

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/verifytoken" exact component={VerifyToken} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />

          </Switch>
      </div>
    </Router>
  );
}

export default App;