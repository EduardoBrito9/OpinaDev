import { Alert } from "@mui/material";
import { VscLoading } from "react-icons/vsc";

const AlertPostLoading = () => {
  return (
      <Alert icon={<VscLoading fontSize="inherit" />} severity="info">
        loading...
      </Alert>
  );
};

export default AlertPostLoading;
