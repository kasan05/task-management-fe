import * as React from 'react'; 
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
    onChangeName:(e:any)=> void;
    taskName:string;
    editmode:boolean;
    updateTask:()=>void;
    createNewTask:()=>void;
    deleteTask:()=>void;
  }


const NewTask = (props: DialogTitleProps) => {
    const { children, onClose,onChangeName,taskName,editmode,updateTask,createNewTask,deleteTask, ...other } = props;
  
    React.useEffect(()=>{

      console.log(props.editmode);
    },[props.editmode])
    return (
      <>
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
       <DialogContent dividers>
       <TextField id="outlined-basic" label="Name" variant="outlined" onChange={onChangeName} value={taskName} />
       </DialogContent>
       <DialogActions>
         <Button autoFocus onClick={editmode?updateTask:createNewTask}  data-testid="updateOrCreateButton">
           {editmode?"Update":"Create"}
         </Button>
        { editmode?(<Button autoFocus onClick={deleteTask} data-testid="deleteButton">
           Delete
        </Button>):""}
       </DialogActions></>
    );
  };
  export default NewTask;