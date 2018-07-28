import React from 'react';
import axios from 'axios';
import { apiUrl } from '../config';
import Question from './Question';
import Header from './Header';
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

    await this.getQuestions();
    await this.getUserVotes();
  }

  getQuestions() {
    let jwt = localStorage.getItem('tubetestjwt');
    axios.defaults.headers.common['Authorization'] = jwt;

    axios.get(`${apiUrl}/question/${ this.props.match.params.videoId }`)
      .then(res => {
        this.setState({ questions: res.data });
      })
      .catch(err => console.log(err));
  }

  getUserVotes() {
    // have a isSignedIn variable?
    let jwt = localStorage.getItem('tubetestjwt');
    axios.defaults.headers.common['Authorization'] = jwt;

    axios
      .get(`${apiUrl}/user/votedQuestions`)
      .then(response => {
        // console.log(response.data.votedQuestions);
        // console.log(response.data);
        this.setState({ usersVotes: response.data.votedQuestions });
        // this.props({ recentQuestions: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Header {...this.props} />
        <div id='addQuestionLink'>
          <a
            href={`https://tubetest-react.herokuapp.com/question/${this.props.match.params.videoId}`}
            target='_blank'
            >
            Add a Question
          </a>
        </div>
        <div>
            {this.state.questions.map((q, i) => {
              return (
                // pass along vote info for this question
                <Question key={i} {...q} />
              )
            })}
        </div>
      </div>
    );
  }
};