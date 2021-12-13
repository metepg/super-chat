import css from './MessageForm.module.css';
import React from 'react';

const MessageForm2 = () => {
  return (
      <form>
        <input
            placeholder="Write something..."
            className={css.inputChat}
            type="text"
            name="fname"
        />
        <button className={css.sendButton}>Send</button>
      </form>
  );
};

export default MessageForm2;
