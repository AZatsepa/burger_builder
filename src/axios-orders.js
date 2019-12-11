import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-25885.firebaseio.com/',
});

export default instance;
