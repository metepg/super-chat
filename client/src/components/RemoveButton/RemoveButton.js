import socket from '../../soketti';
import css from './RemoveButton.module.css';

const RemoveButton = (item) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.userName === item.item.userName) {
    return (
      <button
        type="button"
        className={css.removeButton}
        onClick={() => socket.emit('delete-message', item.item.id)}
      >
        Remove
      </button>
    );
  }
  return null;
};
export default RemoveButton;
