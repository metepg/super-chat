import MessageFeed from '../MessageFeed/MessageFeed';
import css from './ChatBox.module.css';

const ChatBox = () => {
  return (
    <section className={css.controller}>
      <aside className={css.aside}></aside>
      <div className={css.feed}>
        <MessageFeed />
      </div>
    </section>
  );
};
export default ChatBox;
