import axios from 'axios';

const URL = 'http://localhost:3001/auth';

export const signup = (userData) => axios.post(`${URL}/signup`, userData);
export const login = (userData) => axios.post(`${URL}/login`, userData);
