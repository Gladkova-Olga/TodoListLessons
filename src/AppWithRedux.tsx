import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    changeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilterValuesType = "all" | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists);
let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

let dispatch = useDispatch()

    const removeTask =  useCallback((taskID: string, todoListID: string) => {
        let action = RemoveTaskAC(taskID, todoListID);
        dispatch(action);
    }, [dispatch])

    const addTask= useCallback((title: string, todoListID: string)  =>{
        let action = addTaskAC(title, todoListID)
        dispatch(action);
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        let action = changeTaskStatusAC (taskID, isDone, todoListID)
        dispatch(action);
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        let action = changeTaskTitleAC(taskID, title, todoListID)
        dispatch(action);
    }, [dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, id: string) => {
        let action = changeTodoListFilterAC(id, filter)
        dispatch(action);
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, id: string)  =>{
        let action = ChangeTodoListTitleAC(id, title)
        dispatch(action);
    }, [dispatch])

    const removeTodoList = useCallback((id: string) => {
        let action = RemoveTodoListAC(id)
        dispatch(action);
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action);

    }, [dispatch])

    const todoListComponents = todoLists.map(tl => {
        let allTasksForTodoList = tasks[tl.id];

        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={allTasksForTodoList}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTasks={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>


        </div>
    );
}

export default AppWithRedux;

