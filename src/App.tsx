import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import TopNav from "./core/TopNav";

const App = () => {

  return <Router>
    <TopNav/>
  </Router>;
};

export default App;
