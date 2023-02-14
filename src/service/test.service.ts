import axios from 'axios';

export const TestApi = async () => {
  return await axios.get('https://api-nodejs-todolist.herokuapp.com/task');
};
