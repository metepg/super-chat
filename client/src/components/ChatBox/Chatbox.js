import MessageFeed from '../MessageFeed/MessageFeed';
import css from './ChatBox.module.css';
import React, { useEffect } from 'react';
import socket from '../../soketti';

const ChatBox = () => {
  const [list, setList] = React.useState([]);

  useEffect(() => {
    socket.on('message', function (messages) {
      // TODO: Tämä mappaussetti vois olla omassa tiedostossaan
      const je = messages.map((message) => {
        const time = new Date(message.messageTime)
          .toLocaleString('en-GB')
          .split(',');
        const today = new Date(Date.now()).toLocaleString('en-GB').split(',');
        let msgTime;
        if (time[0] === today[0]) msgTime = `Today at ${time[1]}`;
        return {
          ...message,
          messageTime: msgTime ?? `${time[0]} at ${time[1]}`,
        };
      });
      console.log(je);
      setList(je);
    });
  }, []);

  function handleRemove(id) {
    //Vanha frontend-ratkaisu, ei enää tarpeellinen.
    /* const newList = list.filter((item) => item.id !== id);
    setList(newList);*/
    socket.emit('delete-message', id);
  }

  return (
    <section className={css.controller}>
      <section className={css.superController}>
        <ul>
          {list.map((item) => (
            <li className={css.liMessage} key={item.id}>
              <p className={css.name}>
                {item.userName}{' '}
                <span className={css.msgTime}>{item.messageTime}</span>
              </p>
              <div className={css.flexController}>
                <p className={css.teksti}>{item.message}</p>
                <button
                  className={css.removeButton}
                  type="button"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <div className={css.toppaneleft}>
        <div className={css.inputsUsernameSignUp}></div>
      </div>
      <div className={css.toppaneright}>
        <h1 className={css.usersText}>users</h1>
      </div>

      <aside className={css.aside}>
        <ul className={css.usersList}>
          <li>user_1</li>
        </ul>
      </aside>
      <div className={css.feed}>
        <MessageFeed />
      </div>
    </section>
  );
};
export default ChatBox;
