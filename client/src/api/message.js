import axios from 'axios';

const URL = '/api/message';

export const createMessage = (data) => axios.post(URL, data);
