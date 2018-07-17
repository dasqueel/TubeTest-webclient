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

  async componentWillMount() {
    // check if jwt is in local storage
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
          {this.state.questions.map((q, i) => {
            return (
              <div className="questionBox">
                <Question key={i} {...q} />
              </div>
            )
          })}
      </div>
    );
  }
};