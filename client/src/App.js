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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Katsoo aina sivun latautuessa löytyykö token jo localstoragesta
  // TODO:
  // Tokenin voimassaolon tarkistaminen
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      setIsAuthenticated(true);
      socket.emit('send-user', user?.userName);
    }
  }, []);

  async function loginUser(name, password) {
    const userData = await validateLogin(name, password);
    console.log(userData);
    if (!userData) return;
    const obg = { userName: name, token: userData.token };
    localStorage.setItem('user', JSON.stringify(obg));
    setIsAuthenticated(true);
    socket.emit('send-user', name);
  }

  async function signupUser(name, password) {
    const userData = await validateSignup(name, password);
    if (!userData) return;
    alert(`Created user ${userData.name}`);
    setIsAuthenticated(true);
    socket.emit('send-user', name);
  }

  return (
    <main>
      {isAuthenticated ? (
        <>
          <button
            style={{
              backgroundColor: 'whitesmoke',
              marginLeft: '10%',
            }}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              const logout = confirm('Want to logout?');
              if (logout) {
                localStorage.clear();
                setIsAuthenticated(false);
              }
            }}
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
