import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const ConfirmDialog = ({
  show,
  title,
  body,
  postiveAction,
  negativeAction,
}) => {
  return (
    <Dialog open={show} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={negativeAction}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{body}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={negativeAction} color="primary" variant="contained">
          Cancel
        </Button>
        <Button onClick={postiveAction} color="secondary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
