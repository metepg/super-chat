import React, { useEffect, useState } from 'react';
import { createMessage } from '../../api/message';
import css from './MessageForm.module.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const MessageForm = () => {
  // message = inputin sen hetkinen arvo
  // setMessage = asettaa inputille arvon kun kenttään kirjoitetaan
  const [message, setMessage] = useState('');
  socket.on('message', function (msg) {
    console.log('message' + JSON.stringify(msg));
  });
  function validate(e) {
    // e.preventDefault estää sivun päivittymisen (default toiminto 90 luvulta kun lomakkeilla lähetettiin dataa)
    e.preventDefault();

    // Jos viestikenttä on tyhjä älä tee mitään
    if (!message) {
      return;
    }
    const userName = JSON.parse(localStorage.getItem('user'));

    createMessage({ message, userName: userName.userName });
    socket.emit('message', { message });
    // Tyhjennä tekstikenttä lähettämisen jälkeen
    e.target.reset();
    setMessage('');
  }

  return (
    <form onSubmit={(e) => validate(e)}>
      <input
        pattern="^\w{1,80}$"
        title="Max 80 characters."
        maxLength="80"
        required="required"
        className={css.inputChat}
        placeholder="Type something"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={css.sendButton} type="submit">
        SEND
      </button>
    </form>
  );
};

export default MessageForm;
