import React, { Component } from 'react';
import './App.css';
import { QuestionList } from './components/QuestionList';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <QuestionList /> */}
          {/* <Route path="/" component={Home} /> */}
          {/* <Route path="/signin" component={SignIn} /> */}
          {/* <Route path="/register" component={Register} /> */}
          <Route path="/questions/:videoId" component={QuestionList} />
        </div>
      </Router>
    );
  }
}

export default App;
