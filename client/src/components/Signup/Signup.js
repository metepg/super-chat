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
        pattern="^[A-Za-z0-9]{3,10}$"
        title="Minimum: 3 characters. Maximum: 10 characters."
        placeholder="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required
        pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$"
        title="At least one digit [0-9], one lowercase character [a-z], one uppercase character [A-Z]. Minimum: 6 characters. Maximum: 20 characters."
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
