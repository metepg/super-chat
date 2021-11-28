import { useState } from 'react';
import css from './Signup.module.css';

const Signup = ({ signupUser }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function validateForm(e) {
    e.preventDefault();
    if (!(name.trim() && password.trim())) return;
    signupUser(name, password);
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
        placeholder="salasana"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">SIGN UP</button>
    </form>
  );
};

export default Signup;
