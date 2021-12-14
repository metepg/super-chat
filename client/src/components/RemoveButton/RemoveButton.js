import socket from '../../soketti';
import css from './RemoveButton.module.css';
/**
 * Poistonappula, mikä näkyy vain viestin lähettäjälle.
 * Poistaa viestin sekä tietokannasta että frontista.
 * @author Nicklas Sundell, Mete Güneysel, Erik Holopainen
 * @param item viestin id
 * @returns Viestin poistonappula
 */
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
