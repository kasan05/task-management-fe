import RestTemplate from '../common/RestTemplate';
import axios from 'axios';
import Task from '../types/Task';

const getAll = ()=>{
    return RestTemplate.get<Array<Task>>("/task");
}

const create =(task:Task)=>{
    return RestTemplate.post<Task>("/task",task);
}

const update =(task:Task)=>{
    return RestTemplate.put<Task>("/task",task);
}

const remove =(id:number)=>{
    return  RestTemplate.delete<number>("/task/"+id);
}

const TaskService = {getAll,create,update,remove};

export default TaskService;