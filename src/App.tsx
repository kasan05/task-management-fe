import React from 'react';
import './App.css';
import TaskManagement from './components/TaskManagement';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
  >
    <Grid item xs={12}>
     <TaskManagement/>
     </Grid>
    </Grid>
  );
}

export default App;
