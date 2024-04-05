// WinnerModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const WinnerModal = ({ isOpen, winner, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Game Over!</DialogTitle>
      <DialogContent>
        <p>{winner} is the winner!</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WinnerModal;
