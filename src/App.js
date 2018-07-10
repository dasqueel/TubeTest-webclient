import React, { Component } from 'react';
import './App.css';
import { QuestionList } from './components/QuestionList';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <QuestionList /> */}
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/questions/:videoId" component={QuestionList} />
        </div>
      </Router>
    );
  }
}

export default App;
