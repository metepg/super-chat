import axios from 'axios';

const URL = 'http://localhost:3001/api/message';

export const createMessage = (data) => axios.post(URL, data);
