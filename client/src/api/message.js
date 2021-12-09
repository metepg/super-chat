import axios from 'axios';
import { socket } from '../soketti';

const URL = 'http://localhost:3001/api/message';

export const createMessage = (data) => {
  socket.on('message', (ss) => {
    console.log(ss);
  });
  axios.post(URL, data);
};
