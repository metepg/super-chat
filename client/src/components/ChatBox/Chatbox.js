import MessageFeed from '../MessageFeed/MessageFeed';
import css from './ChatBox.module.css';

const ChatBox = () => {
  return (
      <section className={css.controller}>
        <div className={css.chatMessages} data-chat-id={'416814'}>
          <div className={css.message} id={'msg-1'}>
            <div className="msg msg-from-1756884" title="11/25/2021 - 9:15:10 AM">
              <span className={css.name}>user_1</span>
              <span className={css.teksti}>This is my message</span>
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
