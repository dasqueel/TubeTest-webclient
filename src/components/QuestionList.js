/*

display the title

choices

submit button

where to handle different type of problems?
multiple choice w/ one answers
multiple choice w/ multiple answers

the problem should have a uid or a key

methods:
checkAnswer()
  which checks if answer is correct
  and does a post request to server to archive the questionInteraction

getQuestions()
  get question to get top 20 problems

*/

import React from 'react';
import axios from 'axios';
import { apiUrl } from '../config';
import Question from './Question';
import '../static/css/questionList.css';

export class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions : [],
      props
    };

  }

  componentWillMount() {
    const jwt = localStorage.getItem('tubetestjwt');
    if (jwt === null) {
      this.props.history.push('/login');
    }
  }

  async componentDidMount() {
    await this.getQuestions();
  }

  getQuestions() {
    axios.get(`${apiUrl}/question/${ this.props.match.params.videoId }`)
      .then(res => {
        this.setState({ questions: res.data.questions });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {/* {console.log('inside render return',this.state)} */}
        {this.state.questions.map(q => {
          return(
              // <p key={q._id}>{q.text}</p>
            <div class='questionBox'>
              <Question {...q} />
            </div>
          );
        })}
      </div>
    );
  }
};