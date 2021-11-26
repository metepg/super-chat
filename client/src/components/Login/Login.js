import { useState } from 'react';
import { login } from '../../api/authentication';
import css from './Login.module.css';

const Login = ({ auth }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function validateForm(e) {
    e.preventDefault();
    try {
      const data = await login({ name, password });
      if (!data) return;
      auth(data.token);
    } catch (error) {
      console.log(error);
    }
    setName('');
    setPassword('');
  }
  return (
    <form onSubmit={(e) => validateForm(e)} className={css.form}>
      <input
        required
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default Login;
