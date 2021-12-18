import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit, item, message}) {
  const {id,newMsg}=data

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleFormSubmit(item);
    }
  };

  return (
      <div>
        <Dialog
            data={data}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{id?"Update user":"Edit your message"}</DialogTitle>
          <DialogContent>
            <form>
              <TextField id="newMessage" value={newMsg}
                         defaultValue={item.activeItemMessage}
                         onKeyUp={handleKeypress} onChange={e=>onChange(e)}
                         variant="outlined" margin="dense" fullWidth />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button  color="primary" onClick={()=>handleFormSubmit(item)} variant="contained">
              {id?"Update":"Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}