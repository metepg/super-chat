import Header from './components/Header/Header';
import ChatBox from './components/ChatBox/Chatbox';
import LoginSignup from './components/LoginSignup/LoginSignup';
import css from './App.module.css';
import { useEffect, useState } from 'react';
import {
  validateLogin,
  validateSignup,
} from './components/utils/authentication';
import socket from './soketti';
function App() {
  function resetTimer() {
    localStorage.setItem('expireTime', Date.now() + 10000);
  }

  setInterval(() => {
    timedLogout();
  }, 10000);

  setInterval(() => {
    if (localStorage.getItem('user')) {
      try {
        const { userName } = JSON.parse(localStorage.getItem('user'));
        socket.emit('online', userName);
      } catch (err) {
        alert(err);
      }
    }
  }, 5000);

  const handleMouseMove = () => {
    resetTimer();
  };

  function timedLogout() {
    if (localStorage.getItem('user')) {
      if (parseInt(localStorage.getItem('expireTime')) <= Date.now()) {
        alert('logout');
        logout();
      }
    }
  }

  function logout() {
    try {
      const { userName } = JSON.parse(localStorage.getItem('user'));
      socket.emit('user-disconnect', userName);
    } catch (err) {
      alert(err);
    }
    localStorage.clear();
    setIsAuthenticated(false);
    window.location.reload();
  }

  window.addEventListener('mousemove', resetTimer());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Katsoo aina sivun latautuessa löytyykö token jo localstoragesta
  // TODO:
  // Tokenin voimassaolon tarkistaminen
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      setIsAuthenticated(true);
    }
  }, []);

  async function loginUser(name, password) {
    const userData = await validateLogin(name, password);
    if (!userData) return;
    await refreshPage(name, userData);
  }

  async function signupUser(name, password) {
    const userData = await validateSignup(name, password);
    if (!userData) return;
    alert(`Created user ${userData.name}`);
    await refreshPage(name, userData);
  }

  async function refreshPage(name, userData) {
    console.log(name);
    const obg = { userName: name, token: userData.token };
    localStorage.setItem('user', JSON.stringify(obg));
    socket.emit('user-connection', name);
    resetTimer();
    setIsAuthenticated(true);
    window.location.reload();
  }

  return (
    <main onMouseMove={handleMouseMove}>
      {isAuthenticated ? (
        <>
          <button
            style={{
              backgroundColor: 'whitesmoke',
              marginLeft: '10%',
            }}
            onClick={logout}
          >
            LOGOUT
          </button>
          <Header />
          <ChatBox />
        </>
      ) : (
        <section className={css.section}>
          <LoginSignup action={loginUser} type={'login'} />
          <LoginSignup action={signupUser} type={'signup'} />
        </section>
      )}
    </main>
  );
}

export default App;
