import { TODO_FILTERS } from "../consts"
import { filterValue, ListOfTodos } from "../types"

export const initialState = {
    todos: [],
    filterSelected: (() => {
        const filterSaved = window.localStorage.getItem('filter')
        if(filterSaved === null) {
            return TODO_FILTERS.ALL
        }
        return JSON.parse(filterSaved)
    })()
}

export const updateLocalStorage = (filter: filterValue) => {
    window.localStorage.setItem('filter', JSON.stringify(filter))
}


type Action = 
    | { type: 'INIT_TODOS', payload: { todos: ListOfTodos } }
    | { type: 'CLEAR_COMPLETED' }
    | { type: 'COMPLETED', payload: { id: string, completed: boolean } }
    | { type: 'FILTER_CHANGE', payload: { filter: filterValue } }
    | { type: 'REMOVE', payload: { id: string } }
    | { type: 'SAVE', payload: { title: string } }
    | { type: 'UPDATE_TITLE', payload: { id: string, title: string } }


interface State {
    todos: ListOfTodos,
    filterSelected: filterValue
}



export const todosReducer = (state: State, action: Action): State => {

    if(action.type === 'INIT_TODOS') {
        const {todos} = action.payload;
        return {
            ...state,
            todos
        }
    }

    if(action.type === 'CLEAR_COMPLETED') {
        return {
            ...state,
            todos: state.todos.filter(todo => !todo.completed)
        }
    }

    if(action.type === 'COMPLETED') {
        const {id, completed} = action.payload
        return {
            ...state,
            todos: state.todos.map( todo => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        completed: completed
                    }
                }
                return todo
            })
        }
    }

    if(action.type === 'FILTER_CHANGE') {
        const { filter } = action.payload
        updateLocalStorage(filter)
        return {
            ...state,
            filterSelected: filter
        }
    }

    if(action.type === 'REMOVE') {
        const { id } = action.payload
        return {
            ...state,
            todos: state.todos.filter( todo => todo.id !== id)
        }
    }
    if(action.type === 'SAVE') {
        const {title} = action.payload
        const newTodo = {
            id: crypto.randomUUID(),
            title,
            completed: false
        }
        return {
            ...state,
            todos: [
                ...state.todos,
                newTodo
            ]
        }
    }

    if(action.type === 'UPDATE_TITLE') {
        const { id, title } = action.payload;
        return {
            ...state,
            todos: state.todos.map( todo => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        title
                    }
                }
                return todo
            })
        }
    }

    return state
}