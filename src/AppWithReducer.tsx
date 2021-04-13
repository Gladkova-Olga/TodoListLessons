import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./Todolist";
import {stringify} from "querystring";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    changeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";


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


function AppWithReducers() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Butter", isDone: true},
        ],
    })


    function removeTask(taskID: string, todoListID: string) {
        let action = RemoveTaskAC(taskID, todoListID);
        dispatchTasks(action);
    }

    function addTask(title: string, todoListID: string) {
        let action = addTaskAC(title, todoListID)
        dispatchTasks(action);
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        let action = changeTaskStatusAC (taskID, isDone, todoListID)
        dispatchTasks(action);
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        let action = changeTaskTitleAC(taskID, title, todoListID)
        dispatchTasks(action);
    }

    function changeTodoListFilter(filter: FilterValuesType, id: string) {
        let action = changeTodoListFilterAC(id, filter)
        dispatchTodoLists(action);
    }

    function changeTodoListTitle(title: string, id: string) {
        let action = ChangeTodoListTitleAC(id, title)
        dispatchTodoLists(action);
    }


    function removeTodoList(id: string) {
        let action = RemoveTodoListAC(id)
        dispatchTodoLists(action);
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchTodoLists(action);
        dispatchTasks(action);
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id];
        if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
        }
        if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
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

export default AppWithReducers;

