import { useState } from 'react';
import css from './Login.module.css';

const Login = ({ loginUser }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function validateForm(e) {
    e.preventDefault();
    if (!(name.trim() && password.trim())) return;
    loginUser(name, password);
    setPassword('');
  }

  return (
    <form
      onSubmit={(e) => validateForm(e, name, password)}
      className={css.form}
    >
      <input
        required
        placeholder="name"
        type="text"
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
