import { Backdrop, CircularProgress } from "@mui/material";

interface SpinnerProps {
  isOpen?: boolean;
}

const Spinner = ({isOpen = false}: SpinnerProps) => {
  return (<>
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </>);
};

export default Spinner;