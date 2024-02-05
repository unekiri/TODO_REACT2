import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const AlertDialog= ({ open, onClose, onDelete, deletingItem }) => {
  const handleConfirm = () => {
    onDelete(deletingItem.id)
    onClose();
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"以下のアイテムを削除しますか?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${deletingItem.name}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>いいえ</Button>
          <Button onClick={handleConfirm}>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};