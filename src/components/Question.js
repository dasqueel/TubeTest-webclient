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

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      selected: event.target.value
    });
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
        <form onSubmit={this.handleSubmit}>
          <p className="title">{this.props.text}</p>
          <div className="vertical-radio-buttons">
            {this.props.choices.map((choice, i) => {
              return (
                <div>
                    <input
                      key={i}
                      type="radio"
                      value={choice}
                      id={choice}
                      checked={this.state.selected === choice}
                      onChange={this.handleChange}
                    />
                    <label htmlFor={choice}>{choice}</label>
                </div>
              );
            })}

            <button type="submit" className="submit-button">Select Answer</button>
          </div>
        </form>
    );
  }
};

export default Question;