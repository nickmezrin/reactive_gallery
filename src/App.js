import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Pages from './Pages';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Pages.SearchPage}/>
        <Route path='/photo/:id' component={Pages.PhotoPage}/>
      </Switch>
    );
  }

}

export default App;
