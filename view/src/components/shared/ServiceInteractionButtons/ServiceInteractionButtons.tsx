import { Box, IconButton } from "@mui/material";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import styles from './ServiceInteractionButtons.module.css'

interface Props {
  toEdit?: boolean;
  handleReturn?: () => void;
  handleSubmit?: () => void;
  handleDelete?: () => void;
}

const ServiceInteractionButtons = ({handleReturn, handleSubmit, handleDelete, toEdit = false}: Props) => {
  return (<>
    <Box className={`${styles.container} ${styles.edit}`}>
    {toEdit ?
        <IconButton onClick={handleReturn}>
          <ReplyOutlinedIcon />
        </IconButton>
      :
        <Box>
          <IconButton onClick={handleDelete}>
            <DeleteOutlinedIcon color='error' />
          </IconButton>
        </Box>
    }
    </Box>
    <Box className={`${styles.container} ${styles.create}`}>
      <IconButton onClick={handleReturn}>
        <CloseIcon color='error' />
      </IconButton>
      <IconButton onClick={handleSubmit}>
        <CheckIcon color='primary' />
      </IconButton>
    </Box>
  </>);
};

export default ServiceInteractionButtons;