import { memo } from "react";
import { Alert, Snackbar } from "@mui/material";

const Notification = ({
  openErrorMsg,
  setOpenErrorMsg,
  type,
  title,
  autoHideDuration = 6000,
}) => {
  return (
    <Snackbar open={openErrorMsg} autoHideDuration={autoHideDuration}>
      <Alert onClose={setOpenErrorMsg} severity={type} sx={{ width: "100%" }}>
        {title}
      </Alert>
    </Snackbar>
  );
};

export default memo(Notification);
