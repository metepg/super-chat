import Header from './components/Header/Header';
import ChatBox from './components/ChatBox/Chatbox';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import { useState } from 'react';
// import MessageForm from './components/MessageForm/MessageForm';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function auth(token) {
    setIsAuthenticated(true);
    localStorage.setItem('jwt', token);
  }
  return (
    <div>
      {isAuthenticated ? (
        <>
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
          <Signup />
          <Login auth={auth} />
        </section>
      )}
    </div>
  );
}

export default App;
