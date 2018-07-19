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
import '../static/css/home.css';
import Header from './Header';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null
    };

    // this.state = {
    //   props
    // }

    // this.logout = this.logout.bind(this);
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

  logout() {
    localStorage.removeItem('tubetestjwt');
    this.props.history.push('/login');
  }

  render() {
    let username = this.state.username;
    return(
      <div>
        <Header {...this.props} />
        <div className='homeDiv'>
          <p>{ username } info would be displayed here</p>
        </div>
        <div className='infoList'>
          <ul>
            <li>Users weekly / monthly activity</li>
            <li>A github style calendar of activity</li>
            <li>feed of last questions answered</li>
            <li>metric of answers done in certain domains (computer science, math, biology, etc...)</li>
            <li>other appropriate metrics to convey a users history of doing smart stuff</li>
          </ul>
        </div>
      </div>
    )
  }
}