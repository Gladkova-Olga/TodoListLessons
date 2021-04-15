import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    todoListID: string
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task called")
    const removeTask = () => {
        props.removeTask(props.task.id, props.todoListID)
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
    const changeTaskTitle = useCallback((newTitle: string) =>
        props.changeTaskTitle(props.task.id, newTitle, props.todoListID),
        [props.changeTaskTitle,props.task.id, props.todoListID])
    return (
        <li className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                color={"secondary"}
                checked={props.task.isDone}
                onChange={changeTaskStatus}/>

            <EditableSpan
                title={props.task.title}
                changeTitle={changeTaskTitle}
            />
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>

    )
})