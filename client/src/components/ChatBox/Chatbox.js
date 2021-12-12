import MessageFeed from '../MessageFeed/MessageFeed';
import RemoveButton from '../RemoveButton/RemoveButton';
import css from './ChatBox.module.css';
import React, { useEffect } from 'react';
import socket from '../../soketti';
import mapMessageTime from '../../api/mapMessageTime';
const ChatBox = () => {
  const [list, setList] = React.useState([]);
  const [users, setUsers] = React.useState();
  useEffect(() => {
    socket.on('message', async function (messages) {
      setList(mapMessageTime(messages));
    });
    socket.on('usersList', async function (userCount) {
      setUsers(userCount.length);
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
        <h1 className={css.usersText}>Users online</h1>
      </div>
      <aside className={css.aside}>
        <ul className={css.usersList}>
          <li>{users}</li>
        </ul>
      </aside>
      <div className={css.feed}>
        <MessageFeed />
      </div>
    </section>
  );
};
export default ChatBox;
