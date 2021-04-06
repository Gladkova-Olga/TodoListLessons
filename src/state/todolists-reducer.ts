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

export const todoListReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id);
        case  "ADD-TODOLIST":
            const newTodoListID = action.todoListID;
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all',
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            const todoList = todoLists.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
                return [...todoLists];
            }
            return todoLists;
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = todoLists.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
                return [...todoLists];
            }
            return todoLists;
        }
        default:
            return todoLists;
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