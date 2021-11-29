import css from './MessageFeed.module.css';
import React from 'react';

const MessageFeed = () => {
  return (
      <div className={css.box}>
        <input
            placeholder="Write something..."
            className={css.inputChat}
            type="text"
            name="fname"
        />
        <button className={css.sendButton}>Send</button>
      </div>
  );
};

export default MessageFeed;
