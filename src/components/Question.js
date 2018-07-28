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

  triggers proper UI feedback if the answer was correct or wrong

*/
import React from 'react';
import axios from 'axios';
import { apiUrl } from '../config';
import '../static/css/question.css';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Vote from './Vote';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ selected: e });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.selected === this.props.answer) {
      alert('correct');
    }
    else alert('incorrect');

    // do back end updating with the questionInteraction
    let jwt = localStorage.getItem('tubetestjwt');
    axios.defaults.headers.common['Authorization'] = jwt;
    axios
      .post(`${apiUrl}/questionInteraction`, {
        questionId: this.props._id,
        choice: this.state.selected
      })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
  }

  render() {
    return (
        <div className='questionContainer'>
        <div className='votingBox'>
          <Vote {...this.props} />
        </div>
        <div className='questionBox'>
          <p className="title">{this.props.text}</p>
          <ToggleButtonGroup
            name='choices'
            type="radio"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.props.choices.map((choice, i) => {
              return (
                  <ToggleButton
                    key={i}
                    value={choice}
                    checked={this.state.selected === choice}
                  >
                    {choice}
                  </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
            <span>
              <button onClick={this.handleSubmit} className="submit-button">Select Answer</button>
            </span>
        </div>
        </div>
    );
  }
};

export default Question;