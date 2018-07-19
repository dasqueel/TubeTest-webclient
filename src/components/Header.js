import React from 'react';
import '../static/css/header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem('tubetestjwt');
    this.props.history.push('/login');
  }

  render() {
    return(
      <div className="header">
        <a href="#default" class="logo">TestTube</a>
        <div className="header-right">
          <a onClick={this.logout} >Logout</a>
        </div>
      </div>
    );
  }
};

export default Header;