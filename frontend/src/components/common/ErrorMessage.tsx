import { Alert } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <Alert severity="error">{message}</Alert>;
};

export default ErrorMessage;
