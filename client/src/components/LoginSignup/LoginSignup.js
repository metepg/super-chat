import { useState } from 'react';
import css from './LoginSignup.module.css';
const Input = ({ setValue, placeholder, type, value }) => {
  return (
    <input
      required
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
const LoginSignup = ({ action, type }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function validateForm(e) {
    e.preventDefault();
    if (!(name.trim() && password.trim())) return;
    action(name, password);
    setPassword('');
  }
  return (
    <form
      style={
        type === 'signup'
          ? { background: 'linear-gradient(to top, #00bfff, #94a0ff)' }
          : null
      }
      onSubmit={(e) => validateForm(e, name, password)}
      className={css.form}
    >
      <Input
        setValue={setName}
        placeholder={'name'}
        type={'text'}
        value={name}
      />

      <Input
        setValue={setPassword}
        placeholder={'password'}
        type={'password'}
        value={password}
      />
      <button
        style={type === 'signup' ? { background: '#94a0ff' } : null}
        type="submit"
      >
        {type}
      </button>
    </form>
  );
};
export default LoginSignup;
