import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from './store';

import App from './App';
import Login from './components/login/login';
import Signup from './components/signup/signup';

import './index.css'
import '../node_modules/toastr/build/toastr.min.css'

//import 'web3'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="register" component={Signup} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))

// ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
