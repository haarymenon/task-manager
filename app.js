const express = require("express");
const morgan = require("morgan");

const app = new express;



app.use(morgan('dev'));
app.use(express.json());

let tasks = [];
//route to get all tasks
app.get('/',(req,res)=>{
    res.json(tasks);
})
//route to create a new task
app.post('/tasks',(req,res)=>{
    const task = req.body;
    tasks.push(task);
    res.send({message:"Task added",tasks})
})

//route to get a id
app.get('/tasks/:id',(req,res)=>{
 const id=req.params.id;
 const task=tasks.find(task=>task.id===id)
 if(!task)
 {
    res.send("Task not found");
 }
 else
 {
    res.json(task);
 }
})
app.put('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    const updatedTasks= req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1,updatedTasks);
        //tasks[index]= updatedtask
        res.json(tasks)
    }
})

app.delete('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    const index = tasks.findIndex(task=>task.id===id);
    if(index===-1){
        res.send("specified item not found");
    }else{
        tasks.splice(index,1);
        //tasks[index]= updatedtask
        res.send({messege:'specified item is deleted',tasks});
    }
})





app.listen(3005,(req,res)=>{
    console.log("port is up")
})
