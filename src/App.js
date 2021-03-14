import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "antd/dist/antd.css";
import { Provider } from 'react-redux';
import PersistedStore from './redux/store/store';
import Login from './pages/Login';
import Home from './pages/Home';

export default (props) => {
  return (
    <Provider store={PersistedStore.getDefaultStore().store}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </Router>
    </Provider>
  );
}