import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {makeStyles}  from '@mui/styles'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Button, Grid, Typography } from '@mui/material';
import Crop32Icon from '@mui/icons-material/Crop32';
import NewTask from './NewTask';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TaskService from '../service/Taskservice';
import Task from '../types/Task';

const useStyles = makeStyles({
  root: {
    width:"590px",
   
  }, 
  dateContent:{
    paddingTop:"10px"
  },
  iconStyle:{
    display: 'inline-block',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all .05s ease-in-out',
    '&:hover': {
      transform: 'scale(1.5)',
    },
  }
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const TaskManagement:React.FC=()=>{
  
    const [open, setOpen] = React.useState(false);
    const [spin, setSpin] = React.useState(false);
    const[taskList,setTaskList] = React.useState<Task[]>([]);
    const [taskName,setTaskName]=React.useState('');
    const [useEffectRun,setUseEffectRun]=React.useState(false);
    const [editmode,setEditmode]=React.useState(false);
    const [task,setTask]= React.useState<Task>({name:''});
    const classes = useStyles();
    const showDialog =()=>{
      setOpen(true);
      
    }
    const showNewTaskDialog = ()=>{
      setEditmode(false);
      setTaskName('');
      showDialog();
    }
    const createNewTask=()=>{
      closeDialog();
      handleSpin();
      (async()=>{
        try {
       const task = {name:taskName};
          const response = await TaskService.create(task);
          stopSpin();
          setUseEffectRun(!useEffectRun);
        } catch (error) {
          
        }
      })();

    }
    const closeDialog = () => {
      setOpen(false);
      
    };
    const stopSpin = () => {
      setSpin(false);
    };
    const handleSpin = () => {
      setSpin(!spin);
    };
    useEffect(()=>{
      (async()=>{
        try {
          const response = await TaskService.getAll();
          setTaskList(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
     
    },[useEffectRun]);

    const onChangeName=(e:any)=>{
      
      setTaskName(e.target.value);

    }
   const editTask=(e:any,task:Task)=>{
      console.log(task);
      setEditmode(true);
      setTaskName(task.name);
      setTask(task);
      showDialog();
   }
  const updateTask=()=>{
    closeDialog();
    handleSpin();
    (async()=>{
      try {
        const t = task;
        t.name=taskName;
        const response = await TaskService.update(t);
        stopSpin();
        setUseEffectRun(!useEffectRun);
      } catch (error) {
        console.log(error);
      }
    })();
  closeDialog();
  }

  const deleteTask=()=>{
    closeDialog();
    handleSpin();
    (async()=>{
      try {
        const response = await TaskService.remove(task.id==undefined?0:task.id);
        stopSpin();
        setUseEffectRun(!useEffectRun);
      } catch (error) {
        console.log(error);
      }
    })();
  closeDialog();
  }
    return(
     <>
        <Card className={classes.root}>
                <CardHeader
                      title="Tasker"
                      action={
                        <Button variant="outlined" onClick={showNewTaskDialog}>New
                        </Button>}
                />
                <CardContent >
                    <Grid container
                        spacing={2}
                      >
                          {taskList.map((task,index)=>{
                            return (<Grid item xs={12} key={index}>
                                      <Card>
                                            <CardHeader
                                                  action={
                                                      <IconButton aria-label="edit" onClick={(e)=>editTask(e,task)}>
                                                        <Crop32Icon  className={classes.iconStyle} />
                                                      </IconButton>
                                                    }
                                                  title={task.name}
                                                  subheader={<IconButton disableRipple className={classes.dateContent} size="small"><CalendarTodayIcon/>&nbsp;{task.created}</IconButton>}
                                            />
                                        </Card>
                                      </Grid>)
                          })}
                    </Grid>
                </CardContent>
        </Card>

        <BootstrapDialog
          onClose={closeDialog}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
        <NewTask id="customized-dialog-title" 
            onClose={closeDialog}
            onChangeName={onChangeName}
            taskName={taskName}
            editmode={editmode}
            updateTask={updateTask}
            createNewTask={createNewTask}
            deleteTask={deleteTask}
        >
          {editmode ?'Edit Task':'New Task'}
        </NewTask>
       
        </BootstrapDialog>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={spin}
        onClick={stopSpin}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
        </>
    );
}

export default TaskManagement;