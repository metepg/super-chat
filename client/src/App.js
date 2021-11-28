import Header from './components/Header/Header';
import ChatBox from './components/ChatBox/Chatbox';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import {
  validateLogin,
  validateSignup,
} from './components/utils/authentication';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Katsoo aina sivun latautuessa löytyykö token jo localstoragesta
  // TODO:
  // Tokenin voimassaolon tarkistaminen
  useEffect(() => {
    const loginToken = localStorage.getItem('jwt');
    if (!loginToken) return;
    setIsAuthenticated(true);
  }, []);

  async function loginUser(name, password) {
    const userData = await validateLogin(name, password);
    if (!userData) return;
    localStorage.setItem('jwt', userData.token);
    setIsAuthenticated(true);
  }

  async function signupUser(name, password) {
    const userData = await validateSignup(name, password);
    if (!userData) return;
    alert(`Created user ${userData.name}`);
    setIsAuthenticated(true);
  }

  return (
    <main>
      {isAuthenticated ? (
        <>
          <button
            onClick={() => {
              localStorage.clear();
              setIsAuthenticated(false);
            }}
          >
            LOGOUT
          </button>
          <Header />
          <ChatBox />
        </>
      ) : (
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Signup signupUser={signupUser} />
          <Login loginUser={loginUser} />
        </section>
      )}
    </main>
  );
}

export default App;
