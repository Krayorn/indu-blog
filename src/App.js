import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={Register} />
        </Switch>
      </Router>
    )
  }
}

export default App
