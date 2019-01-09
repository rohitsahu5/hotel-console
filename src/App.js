import React, {
  Component
} from 'react';
import { Homepage } from "./components/Login/Homepage"
import { Dashboard } from "./components/Admin/dashboard"

import { Switch, Route } from "react-router-dom"
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
      </div>
    )
  }
}

export default App;