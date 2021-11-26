import axios from 'axios';

const URL = 'http://localhost:3001/api/messages';

export const createMessage = (data) => {
  console.log(data);
  axios.post(URL, data);
};
