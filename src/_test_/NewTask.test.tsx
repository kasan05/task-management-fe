import * as React from 'react';
import { render} from "@testing-library/react";
import NewTask,{DialogTitleProps} from '../components/NewTask';


function renderNewTask(props:Partial<DialogTitleProps>){
    const defaultProps:DialogTitleProps ={
        id: "testId",
        onClose: () => {return;},
        onChangeName:(e)=> {},
        taskName:"testTaskName",
        editmode:true,
        updateTask:()=>{},
        createNewTask:()=>{},
        deleteTask:()=>{}

    }
return render (<NewTask {...defaultProps}{...props}/>);
}

describe("<NewTask />",()=>{
    test("When editmode True New Task UI should contains Update and delete Button", async ()=>{
        const {findByTestId} = renderNewTask({editmode:true});
        const button1 = await findByTestId("updateOrCreateButton");
        const button2 = await findByTestId("deleteButton");
        expect(button1).toHaveTextContent("Update");
        expect(button2).toBeInTheDocument();
    });
    test("When editmode False New Task UI should contains Create and No delete Button", async ()=>{
        const {findByTestId} = renderNewTask({editmode:false});
        const button1 = await findByTestId("updateOrCreateButton");
        expect(button1).toHaveTextContent("Create");
      
    });

});