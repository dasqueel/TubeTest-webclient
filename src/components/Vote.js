import React from 'react';
import axios from 'axios';
import { apiUrl } from '../config';
import '../static/css/vote.css';

class Vote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: props.usersVote,
      score: props.upvotes - props.downvotes
    }
  }

  // Method to change the state of the component, which the UI reflects "live".
  // might have to do logic of the 6 special cases
  vote(voteType) {
    // calculate new score
    let curVoteType = this.state.vote;
    let curScore = this.state.score;
    let newScore;
    if (voteType === 1 && curVoteType === 1) newScore = curScore - 1;
    if (voteType === -1 && curVoteType === -1) newScore = curScore + 1;
    if (voteType === 1 && curVoteType === -1) newScore = curScore + 2;
    if (voteType === -1 && curVoteType === 1) newScore = curScore - 2;
    if (voteType === -1 && curVoteType === 0) newScore = curScore - 1;
    if (voteType === 1 && curVoteType === 0) newScore = curScore + 1;
    this.setState(state => ({ score: newScore }));

    this.setState(state => ({
      vote: state.vote === voteType ? 0 : voteType
    }));

    // do post request to server to update user model
    let jwt = localStorage.getItem('tubetestjwt');
    axios.defaults.headers.common['Authorization'] = jwt;

    // TODO: make sure <voteType> is always equal to [-1, 0, 1]
    axios.post(`${apiUrl}/question/vote/${this.props._id.toString()}`, {
      "voteType" : voteType
    });

  }

  render() {
    const { vote, score } = this.state;
    return (
      <div className='vote'>
        <button
          id="upvote"
          className={vote === 1 ? 'active' : undefined}
          onClick={() => this.vote(1)}
        >
          Upvote
        </button>
        <h3>{score}</h3>
        <button
          id="downvote"
          className={vote === -1 ? 'active' : undefined}
          onClick={() => this.vote(-1)}
        >
          Downvote
        </button>
      </div>
    );
  }
}


export default Vote;