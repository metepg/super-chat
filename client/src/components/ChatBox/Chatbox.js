import MessageFeed from '../MessageFeed/MessageFeed';
import css from './ChatBox.module.css';
import React from 'react';

const initialList = [
  {
    id: 'msg-1',
    username: 'user_1',
    message: 'This is my message 1',
  },
  {
    id: 'msg-2',
    username: 'user_2',
    message: 'This is my message 2',
  },
];

const ChatBox = () => {

  const [list, setList] = React.useState(initialList);

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  return (
      <section className={css.controller}>


        <div className={css.chatMessages} data-chat-id={'416814'}>
          <div className={css.message} id={'msg-1'}>
            <div className="msg msg-from-1756884" title="11/25/2021 - 9:15:10 AM">
              <ul className={css.messagesList}>
                {list.map((item) => (
                    <li className={css.liMessage} key={item.id}>
                      <span className={css.name}>{item.username}</span>
                      <span  className={css.teksti}>{item.message}</span>
                      <button className={css.removeButton} type="button" onClick={() => handleRemove(item.id)}>
                        Remove
                      </button>
                    </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
        <div className={css.toppaneleft}>
          <div className={css.inputsUsernameSignUp}>
            <input
                placeholder="Username"
                className={css.inputUsername}
                type="text"
                name="username"
            />
            <button className={css.signUpButton}>Sign Up</button>
          </div>

          <div className={css.inputsLoginPassword}>
            <input
                placeholder="Password"
                className={css.inputPassword}
                type="text"
                name="password"
            />
            <button className={css.loginButton}>Login</button>
          </div>
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
