import React from 'react';
import axios from 'axios';
import { apiUrl } from '../config';
import '../static/css/register.css';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  inputValidation() {
    if (this.state.email.length < 4) return false;
    if (this.state.username.length < 1) return false;
    if (this.state.password !== this.state.passwordConfirm) return false;
    return true;
  }
  handleSubmit() {
    // check for valid inputs: email > 4 characters, passwords are the same, etc...
    if (this.inputValidation) {
      // alert(`${this.state.email} ${this.state.username}`);
      // do http request to sign in and get token
      const payload = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }
      axios
        .post(`${apiUrl}/register`, payload)
          .then(resp => {
            // make sure the username and email hasnt already been taken
            if (resp.status === 401) {
              // check for the failure
              alert("email already in use");
            }
            else {
              // set the token to localstorage
              localStorage.setItem("tubetestjwt", resp.data.token);

              // redirect to home page
              // this.history.push('/')
              this.props.history.push('/home');
            }
          })
          .catch(err => console.log(err));
    }
    else {
      alert('invalid input');
    }

  }

  render() {
    return (
      <div>
        <div>
          <h1>TubeTest Register</h1>
        </div>
        <div className='register'>
          <div className='block'>
            <label>email:</label>
            <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
          </div>
          <div className='block'>
            <label>username:</label>
            <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
          </div>
          <div className='block'>
            <label>password:</label>
            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
          </div>
          <div className='block'>
            <label>password confirm:</label>
            <input name="passwordConfirm" type="password" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
          </div>
          <button onClick={this.handleSubmit} >Register</button>
        </div>
      </div>
    )
  }
}