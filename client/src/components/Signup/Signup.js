import { useState } from 'react';
import { signup } from '../../api/authentication';
import css from './Signup.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function validateForm(e) {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
      alert('syötä tiedot');
      return;
    }
    try {
      signup({ name, password });
      console.log('jeps');
    } catch (error) {
      console.log(error);
      console.log('jpes');
    }
    e.target.reset();
    setName('');
    setPassword('');
  }
  return (
    <form onSubmit={(e) => validateForm(e)} className={css.form}>
      <input
        required
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required
        placeholder="salasana"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">SIGN UP</button>
    </form>
  );
};

export default Signup;
