import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Delete",
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
