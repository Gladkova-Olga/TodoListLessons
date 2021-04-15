import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./task";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todoListID: string
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTasks: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    removeTodoList: (todoList: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}


export const TodoList = React.memo((props: TodolistPropsType) => {


    const addTask = useCallback((title: string) => {
        props.addTasks(title, props.todoListID);
    }, [props.addTasks, props.todoListID])

    const removeTodoList =useCallback( () => props.removeTodoList(props.todoListID),
        [props.removeTodoList, props.todoListID]);
    const setAllFilter = useCallback(() =>
            props.changeTodoListFilter("all", props.todoListID),
        [props.changeTodoListFilter, props.todoListID])

    const setActiveFilter = useCallback(() =>
            props.changeTodoListFilter("active", props.todoListID),
        [props.changeTodoListFilter, props.todoListID])

    const setACompletedFilter = useCallback(() =>
            props.changeTodoListFilter("completed", props.todoListID),
        [props.changeTodoListFilter, props.todoListID])


    let allTasksForTodoList = props.tasks;
    let tasksForTodoList = allTasksForTodoList;
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
    }
    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.todoListID), [props.changeTodoListTitle, props.todoListID]);

    const tasks = tasksForTodoList.map(t => {


        return (
            <Task key={t.id}
                task={t}
                  todoListID={props.todoListID}
                  changeTaskStatus={props.changeTaskStatus}
                  changeTaskTitle={props.changeTaskTitle}
                  removeTask={props.removeTask}
            />
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>

            </h3>

            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={"contained"}
                    color={props.filter === 'all' ? 'secondary' : "primary"}
                    size={"small"}
                    onClick={setAllFilter}
                >All</Button>
                <Button
                    variant={"contained"}
                    color={props.filter === 'active' ? 'secondary' : "primary"}
                    size={"small"}
                    onClick={setActiveFilter}
                >Active</Button>
                <Button
                    variant={"contained"}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    size={"small"}
                    onClick={setACompletedFilter}
                >Completed
                </Button>
            </div>
        </div>

    )
})

export default TodoList;