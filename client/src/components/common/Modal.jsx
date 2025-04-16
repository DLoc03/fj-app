import React from "react";
import {
  Modal,
  Box,
  Typography,
  Fade,
  Backdrop,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: "90%",
  maxWidth: 500,
};

function ReuseableModal({ open, onClose, title, children, disableClose }) {
  return (
    <Modal
      open={open}
      onClose={disableClose ? null : onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" textAlign={"center"}>
              {title}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}

export default ReuseableModal;
