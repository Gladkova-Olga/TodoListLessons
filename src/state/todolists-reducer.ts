import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | changeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}

export type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type changeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType

}
let initialState: Array<TodoListType> = [];

export const todoListReducer = (state= initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case  "ADD-TODOLIST":
            const newTodoListID = action.todoListID;
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all',
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(todo => {
                if(todo.id === action.id) {
                    return{...todo, title: action.title}
                } else {
                    return todo
                }
            })

            // const todoList = todoLists.find(tl => tl.id === action.id);
            // if (todoList) {
            //     todoList.title = action.title;
            //     return [...todoLists];
            // }
            // return todoLists;
        case "CHANGE-TODOLIST-FILTER": {

            return state.map(todo => {
                if(todo.id === action.id) {
                    return{...todo, filter: action.filter}
                } else {
                    return todo
                }
            })
            // const todoList = todoLists.find(tl => tl.id === action.id);
            // if (todoList) {
            //     todoList.filter = action.filter;
            //     return [...todoLists];
            // }
            // return todoLists;
        }
        default:
            return state;
    }


}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todoListID: v1()};
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title };
}

export  const changeTodoListFilterAC = (id: string, filter: FilterValuesType): changeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}