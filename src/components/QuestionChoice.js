import React from 'react';
import '../static/css/questionChoice.css';

class QuestionChoice extends React.Component {
  constructor(props) {
    super(props);

    this.handleChoiceTextChange = this.handleChoiceTextChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  handleChoiceTextChange(event) {
    this.props.onChoiceTextChange(event.target);
  }

  handleAnswerChange(event) {
    this.props.onAnswerChange(event.target.name);
  }

  render() {
    return (
      <div>
        <span>
          <input
            className='choiceInput'
            type="text"
            name={this.props.choiceNum}
            placeholder="new choice..."
            onChange={this.handleChoiceTextChange}
          />
          <input
            type="radio"
            name={this.props.choiceNum}
            checked={this.props.answer}
            onChange={this.handleAnswerChange}
          />
        </span>
      </div>
    );
  }
};

export default QuestionChoice;