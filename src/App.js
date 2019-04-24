import React, { Component, Fragment } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import {reducers, middlewares} from './redux/index'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/auth/Profile'

import Home from './components/blog/Home'
import Create from './components/blog/Create'
import Edit from './components/blog/Edit'
import Article from './components/blog/Article'

import Notification from './components/commons/Notification'

import AdminArticles from './components/admin/Articles'
import AdminUsers from './components/admin/Users'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
  middlewares
))

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Fragment>
          <Notification />
          <Router>
            <Switch>
              <Route path={'/login'} component={Login} />
              <Route path={'/register'} component={Register} />
              <Route path={'/profile'} component={Profile} />

              <Route path={'/create'} component={Create} />
              <Route path={'/edit/:id'} component={Edit} />
              <Route path={'/article/:id'} component={Article} />

              <Route path={'/admin/articles'} component={AdminArticles} />
              <Route path={'/admin/users'} component={AdminUsers} />

              <Route paht={'/'} component={Home} />
            </Switch>
          </Router>
        </Fragment>
      </Provider>
    )
  }
}

export default App
