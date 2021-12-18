import MessageFeed from '../MessageFeed/MessageFeed';
import RemoveButton from '../RemoveButton/RemoveButton';
import css from './ChatBox.module.css';
import React, { useRef, useState, useEffect } from 'react';
import socket from '../../soketti';
import mapMessageTime from '../../api/mapMessageTime';
import Linkify from 'linkify-react';
import FormDialog from '../Dialog/Dialog'

const ChatBox = () => {
  const [list, setList] = React.useState([]);
  const [usercount, setUsercount] = React.useState();
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState([]);
  const [stateEditButton, setStateEditButton] = React.useState();
  const util = require('util')

  useEffect(() => {
    socket.on('message', async function (messages) {
      setList(mapMessageTime(messages));
    });
    socket.on('usersList', async function (userCount) {
      //console.log(userCount);
      setUsers(userCount);
      setUsercount(userCount.length);
    });
  }, []);

  const handleClickEdit = (item) => {
    setOpen(true);
    setStateEditButton({
      activeItemName: item.userName,
      activeItemId: item.id
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (item) => {
    //console.log(util.inspect(formData, {showHidden: false, depth: null, colors: true}))
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.userName === item.activeItemName) {  //updating username
      socket.emit('edit-message', { id: item.activeItemId, message: formData.newMessage })
      handleClose()
    } else {
        handleClose()
    }
  }

  const onChange = (e) => {
    const { value, id } = e.target
    console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }

  function hasRight(item) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.userName === item.userName) {
      return true;
    }
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
                <Linkify><p className={css.teksti}>
                  {item.message}</p></Linkify>
                <RemoveButton item={item} />
                {hasRight(item) ? (
                        <button className={css.editButton} data-toggle="modal" data-target="#exampleModal"
                        onClick={() => handleClickEdit(item)}>Edit</button>
                ) : ('')}
                <FormDialog open={open} handleClose={handleClose}
                            item={stateEditButton} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
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
        <h3 className={css.usersText}>{usercount}</h3>
      </div>
      <aside className={css.aside}>
        <ul className={css.usersList}>
          {users.map((user) => (
            <li key={user.id}>{user.userName}</li>
          ))}
        </ul>
      </aside>
      <div className={css.feed}>
        <MessageFeed />
      </div>
    </section>
  );
};
export default ChatBox;