import axios from 'axios';

const URL = 'http://localhost:3001/api';

export const signup = async (data) => {
  try {
    await axios.post(`${URL}/signup`, data);
  } catch (error) {
    const response = error.response.data.message;
    alert(response);
  }
};

export const login = async (data) => {
  try {
    const res = await axios.post(`${URL}/login`, data);
    return res.data;
  } catch (error) {
    const response = error.response.data.message;
    alert(response);
  }
};
