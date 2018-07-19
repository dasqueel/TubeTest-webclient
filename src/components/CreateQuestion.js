/*

only creates multiple choice questions for now
for future tho it could create multiple answer answer questions, open ended via text or audio or video

text inputs for
  questionText

add an option for multiple choice
  which then you can add text

a marking for which choice is correct

also display youtube video


*/
import React from 'react';
import axios from 'axios';
import QuestionChoice from './QuestionChoice';
import Header from './Header';
import { apiUrl } from '../config';
import '../static/css/createQuestion.css';

export class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionText: '',
      choices: [{text:'', answer: false}],
      choiceNum: 1
    };

    this.submitQuestion = this.submitQuestion.bind(this);
    this.handleChoiceTextChange = this.handleChoiceTextChange.bind(this);
    this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.addChoice = this.addChoice.bind(this);
  }

  checkValidInput() {
    // make sure the given choices dont have blank spaces
    // or have no profanitiy etc...
    // repeated values
    // TODO: pass along reason why input was invalid [bool, <reason as a str>]

    let choicesSet = new Set();
    let profanitiySet = new Set(["shit","ass","fuck","bitch"]);

    let choices = this.state.choices;

    if (choices.length < 3) return false;

    for (let i=0; i < choices.length; i++) {
      let choice = choices[i].text;
      if (choice === '') return false;
      if (choicesSet.has(choice)) return false;

      choicesSet.add(choice);

      // also iterate through the words of choice and check for profanity
    }

    // check that one of the choices was a correct answer
    let hasAnswer = false;
    choices.forEach(choice => {
      if (choice.answer === true) hasAnswer = true;
    })

    // return true;
    return hasAnswer;
  }

  addChoice(event) {
    if (this.state.choices.length < 4) {
      let choices = this.state.choices;
      choices.push({ text: '', answer: false });
      this.setState({ choices });
    }
    else {
      alert("there is a 4 choice limit")
    }

  }

  removeChoice(event) {
    let choices = this.state.choices;
    choices.pop();
    this.setState({ choices });
  }

  submitQuestion(event) {
    event.preventDefault();

    // check that the inpute is valid
    if (this.checkValidInput()) {
      // get the answer text from choice objects
      let answer;

      this.state.choices.forEach(choice => {
        if (choice.answer === true) answer = choice.text;
      });

      let payload = {
        text: this.state.questionText,
        answer,
        choices: this.state.choices.map(choice => choice.text),
        videoId: this.props.match.params.videoId
      };

      // do back end post request to create new question
      axios
        .post(`${apiUrl}/question`, payload)
        .then(resp => {
          console.log(resp);

          // alert that question was added and redirect to question home page
          alert('Added question!')
          this.props.history.push(`/questions/${this.props.match.params.videoId}`);
        })
        .catch(err => console.log(err));
    }
    else {
      // alert the invalid input error
      alert('invalid input');
    }

  }

  handleQuestionTextChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChoiceTextChange(event) {
    const choiceNum = event.name;
    const choiceText = event.value;
    let choices = this.state.choices;
    choices[choiceNum].text = choiceText;
    this.setState({ choices });
  }

  handleAnswerChange(radioNum) {
    // need to change the last selected radio button to false
    this.state.choices.forEach(choice => {
      if (choice.answer === true) choice.answer = false;
    })

    // update the new correct choice
    let choices = this.state.choices;
    choices[radioNum].answer = true;
    this.setState({ choices });
  }

  render() {
    return(
      <div>
        <Header {...this.props} />
        <div className="createQuestion">
          <div id="videoDiv">
            <h1>Create a Question</h1>
            <iframe width="420" height="345" src={`https://www.youtube.com/embed/${this.props.match.params.videoId}`} />
          </div>

          <div>
            <input
              type="text"
              name="questionText"
              id="questionText"
              placeholder="Question sentence..."
              value={this.state.questionText}
              onChange={this.handleQuestionTextChange}
            />
          </div>
          <div>
            <button id="addChoiceBtn" onClick={this.addChoice} >add choice</button>
            <button id="removeChoiceBtn" onClick={this.removeChoice} >remove choice</button>
          </div>
          <div className="options">
            {this.state.choices.map((choice, i) => {
              return (
                <QuestionChoice
                  key={i}
                  choiceNum={i}
                  onChoiceTextChange={this.handleChoiceTextChange}
                  onAnswerChange={this.handleAnswerChange}
                  answer={choice.answer}
                />
              )
            })}
          </div>

          <div>
            <button id="submitQuestion" onClick={this.submitQuestion}>Submit Question</button>
          </div>
        </div>
      </div>
    );
  }
};