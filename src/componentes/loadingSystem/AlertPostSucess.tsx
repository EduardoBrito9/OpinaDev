import { Check } from "@mui/icons-material";
import { Alert } from "@mui/material";

const AlertPostSucess = () => {
  return (
    <Alert icon={<Check fontSize="inherit" />} severity="success">
      Here is a gentle confirmation that your action was successful.
    </Alert>
  );
};

export default AlertPostSucess;
