import MessageFeed from '../MessageFeed/MessageFeed';
import RemoveButton from '../RemoveButton/RemoveButton';
import css from './ChatBox.module.css';
import React, { useEffect } from 'react';
import socket from '../../soketti';
import mapMessageTime from '../../api/mapMessageTime';
const ChatBox = () => {
  const [list, setList] = React.useState([]);

  useEffect(() => {
    socket.on('message', function (messages) {
      setList(mapMessageTime(messages));
    });
  }, []);

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
                <RemoveButton item={item} />
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
