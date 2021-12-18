import socket from '../../soketti';
import css from './RemoveButton.module.css';
//const util = require('util')

const RemoveButton = (item) => {
  const user = JSON.parse(localStorage.getItem('user'));
  //console.log(util.inspect(user, {showHidden: false, depth: null, colors: true}))
  //console.log(util.inspect(item, {showHidden: false, depth: null, colors: true}))

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
