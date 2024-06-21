import React from "react";
import { Modal, Box, Typography, Button, Fade } from "@mui/material";

const ConfirmationModal = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: 24,
            padding: 3,
            maxWidth: 400,
            margin: "auto",
            marginTop: "20vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {message}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              color="error"
              onClick={onConfirm}
              sx={{ mr: 2 }}
            >
              delete
            </Button>
            <Button color="primary" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmationModal;
