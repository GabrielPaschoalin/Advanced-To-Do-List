import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Popup = ({text, handleOpen}) => {
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Dialog open={handleOpen} onClose={handleClose}>
        <DialogTitle>ALERTA</DialogTitle>
        <DialogContent>
            <p>{text}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Popup;
