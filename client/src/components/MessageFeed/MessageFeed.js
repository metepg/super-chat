import css from './MessageFeed.module.css';
import React from 'react';
import MessageForm from '../MessageForm/MessageForm';

const MessageFeed = () => {
  return (
    <div className={css.box}>
      <MessageForm />
    </div>
  );
};

export default MessageFeed;
