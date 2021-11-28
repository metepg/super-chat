import { login, signup } from '../../api/auth';

export const validateLogin = async (name, password) => {
  try {
    const { data } = await login({ name, password });
    return data;
  } catch (error) {
    alert(error.response.data.message);
    return null;
  }
};

export const validateSignup = async (name, password) => {
  try {
    const { data } = await signup({ name, password });
    return data;
  } catch (error) {
    alert(error.response.data.message);
    return null;
  }
};
