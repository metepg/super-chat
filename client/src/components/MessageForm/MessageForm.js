import React, { useEffect, useState } from 'react';
import { createMessage } from '../../api/message';
import css from './MessageForm.module.css';
import { socket } from '../../soketti';

const MessageForm = () => {
  // message = inputin sen hetkinen arvo
  // setMessage = asettaa inputille arvon kun kenttään kirjoitetaan
  const [message, setMessage] = useState('');

  socket.on('message', (messages) => {
    console.log(messages);
  });
  function validate(e) {
    // e.preventDefault estää sivun päivittymisen (default toiminto 90 luvulta kun lomakkeilla lähetettiin dataa)
    e.preventDefault();

    // Jos viestikenttä on tyhjä älä tee mitään
    if (!message) {
      return;
    }
    const userName = JSON.parse(localStorage.getItem('user'));
    const msg2 = { message, userName: userName.userName };
    createMessage({ message, userName: userName.userName });
    socket.emit('message', msg2);
    // socket.on('message', function (msg) {
    //   console.log('message' + JSON.stringify(msg));
    // });
    // Tyhjennä tekstikenttä lähettämisen jälkeen
    e.target.reset();
    setMessage('');
  }

  return (
    <form onSubmit={(e) => validate(e)}>
      <input
        pattern="^.{1,80}$"
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
