import React, { useState } from 'react';
import { createMessage } from '../../api/messages';

const MessageForm = () => {
  // message = inputin sen hetkinen arvo
  // setMessage = asettaa inputille arvon kun kenttään kirjoitetaan
  const [message, setMessage] = useState('');
  function validate(e) {
    // e.preventDefault estää sivun päivittymisen (default toiminto 90 luvulta kun lomakkeilla lähetettiin dataa)
    e.preventDefault();

    // Jos viestikenttä on tyhjä älä tee mitään
    if (!message) {
      return;
    }
    createMessage({ message });
    // Tyhjennä tekstikenttä lähettämisen jälkeen
    e.target.reset();
    setMessage('');
  }

  return (
    <form onSubmit={(e) => validate(e)}>
      <input
        placeholder="Type something"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">SEND</button>
    </form>
  );
};

export default MessageForm;
