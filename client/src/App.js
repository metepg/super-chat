/* eslint-disable no-restricted-globals */
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
/**
 * Web-applikaatio superchat
 * @author Mete Güneysel, Nicklas Sundell, Erik Holopainen
 * @returns Web-applikaation frontin
 */
function App() {
  function resetTimer() {
    localStorage.setItem('expireTime', Date.now() + 100000);
  }
  //Kirjaa käyttäjän ulos 100000 millisekunnin epäaktiivisuuden jälkeen.
  setInterval(() => {
    timedLogout();
  }, 100000);
  //Lähettää backendille tiedot käyttäjän online-statuksesta 10000 ms välein.
  setInterval(() => {
    if (localStorage.getItem('user')) {
      try {
        const { userName } = JSON.parse(localStorage.getItem('user'));
        socket.emit('online', userName);
      } catch (err) {
        alert(err);
      }
    }
  }, 10000);
  /**
   * Katsoo, liikutteleeko käyttäjä hiirtä applikaation päällä
   * Jos liikuttelee, ajaa resetTimerin
   * @author Nicklas Sundell
   */
  const handleMouseMove = () => {
    resetTimer();
  };
  /**
   * Logouttaa käyttäjän, jos expiretime on kulunut.
   * @author Nicklas Sundell
   */
  function timedLogout() {
    if (localStorage.getItem('user')) {
      if (parseInt(localStorage.getItem('expireTime')) <= Date.now()) {
        alert('logout');
        logout();
      }
    }
  }
  /**
   * Käyttäjän logout-funktio, tyhjentää localstoragen yms.
   * @author Nicklas Sundell
   */
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
  /**
   * Käyttäjän kirjautumisfunktio, ajaa refreshPagen onnistuneen
   * kirjautumisen jälkeen.
   * @author Nicklas Sundell, Mete Güneysel
   * @param {*} name
   * @param {*} password
   * @returns
   */
  async function loginUser(name, password) {
    const userData = await validateLogin(name, password);
    if (!userData) return;
    await refreshPage(name, userData);
  }
  /**
   * Käyttäjän luomisfuntkio, ajaa refreshPagen
   * @author Nicklas Sundell, Mete Güneysel
   * @param {*} name
   * @param {*} password
   * @returns
   */
  async function signupUser(name, password) {
    const userData = await validateSignup(name, password);
    if (!userData) return;
    alert(`Created user ${userData.name}`);
    await refreshPage(name, userData);
  }
  /**
   * Reloadaa sivun, lähettää käyttäjän
   * tiedot backendille ja lisää käyttäjän tiedot localstorageen
   * @author Nicklas Sundell, Mete Güneysel
   * @param {*} name
   * @param {*} userData
   */
  async function refreshPage(name, userData) {
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
