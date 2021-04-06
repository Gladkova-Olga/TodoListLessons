import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";


export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string

}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}
export type changeTaskStatusActionType = {
    type: "CHANGE-STATUS-TASK"
    taskID: string
    isDone: boolean
    todoListID: string
}

export type changeTaskTitleActionType = {
    type: "CHANGE-TITLE-TASK"
    taskID: string
    title: string
    todoListID: string
}


export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state};
            copyState[action.todoListID] = copyState[action.todoListID].filter(task => task.id !== action.taskID)
            return copyState
        }

        case 'ADD-TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false,
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}

        }
        case "CHANGE-STATUS-TASK": {
            let copyState = {...state};
            const task = copyState[action.todoListID].find(t => t.id === action.taskID);
            if (task) {
                task.isDone = action.isDone

                // {...state,
                //     [action.todolistID]: [action.todolistID].map(task => {
                //         if (task.id === action.taskID) {
                //             return {...task, isDone: action.isDone}
                //         } else {
                //             return task
                //         }
                //     })
                // }
            }

            return copyState

        }
        case "CHANGE-TITLE-TASK": {
            let copyState = {...state};
            const task = copyState[action.todoListID].find(t => t.id === action.taskID);
            if (task) {
                task.title = action.title
                return copyState
            }
        }
        case "ADD-TODOLIST": {
            let todoListID = action.todoListID;
            return {...state, [todoListID]: []}
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state};
            delete copyState[action.id]
            return copyState
        }
        default:
            return state;
    }


}

export const RemoveTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todoListID}
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListID};
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): changeTaskStatusActionType => {
    return {type: "CHANGE-STATUS-TASK", taskID, isDone, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TITLE-TASK", taskID, title, todoListID}
}

