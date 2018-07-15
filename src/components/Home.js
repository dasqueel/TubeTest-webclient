/*

display
  username
  number of questions answered
  last five questions answered

  have button for creating a question

*/
import React from 'react';
import axios from 'axios';
import { apiUrl } from '../config';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  componentWillMount() {
    const jwt = localStorage.getItem('tubetestjwt');
    if (!jwt) {
      this.props.history.push('/login');
    }
  }

  async componentDidMount() {
    await this.getUserInfo();
  }

  getUserInfo() {
    let jwt = localStorage.getItem('tubetestjwt');
    axios.defaults.headers.common['Authorization'] = jwt;

    axios.get(`${apiUrl}/user`)
      .then(resp => {
        this.setState({ username: resp.data.username });
      })
      .catch(err => console.log(err));
  }

  render() {
    let username = this.state.username;
    return(
      <div>
        <p>{ username } info would be displayed here</p>
      </div>
    )
  }
}