require('dotenv').config();

const apiUrl = process.env['REACT_APP_API_URL_REMOTE'];
// const apiUrl = process.env['REACT_APP_API_URL_LOCAL'];
// const baseUrl = 'http://localhost:3001';
const baseUrl = 'https://tubetest-react.herokuapp.com';

module.exports = {
  apiUrl,
  baseUrl
};