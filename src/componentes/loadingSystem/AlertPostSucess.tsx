import { Check } from "@mui/icons-material";
import { Alert } from "@mui/material";

const AlertPostSucess = () => {
  return (
    <Alert icon={<Check fontSize="inherit" />} severity="success">
       Success!
    </Alert>
  );
};

export default AlertPostSucess;
