import RestTemplate from '../common/RestTemplate';
import axios from 'axios';
import Task from '../types/Task';

const getAll = ()=>{
    return RestTemplate.get<Array<Task>>("/task");
}

const create =(task:Task)=>{
    return RestTemplate.post<Task>("/task",task);
}

const TaskService = {getAll,create};

export default TaskService;