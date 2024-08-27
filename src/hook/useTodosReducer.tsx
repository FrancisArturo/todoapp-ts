import { useEffect, useReducer } from "react"
import { filterValue, ListOfTodos } from '../types';
import { initialState, todosReducer } from "../reducers/todosReducer"
import { TODO_FILTERS } from "../consts"
import { fetchTodos } from "../services/todos"




export const useTodosReducer = (): {
    activeCount: number
    completedCount: number
    todos: ListOfTodos
    filterSelected: filterValue
    handleClearCompleted: () => void
    handleCompleted: (id: string, completed: boolean) => void
    handleFilterChange: (filter: filterValue) => void
    handleRemove: (id: string) => void
    handleAddTodo: (title: string) => void
    handleUpdateTitle: ( id: string, title: string ) => void
} => {

    const [{ todos, filterSelected }, dispatch] = useReducer(todosReducer, initialState)

    const handleInitTodos = async () => {
        const todosReceived = await fetchTodos()
        dispatch({ type: 'INIT_TODOS', payload: {todos: todosReceived}})
    }

    const handleCompleted = (id: string, completed: boolean) => {
        dispatch({ type: 'COMPLETED', payload: { id, completed } })
    }
    const handleRemove = (id: string) => {
        dispatch({ type: 'REMOVE', payload: { id } })
    }
    const handleUpdateTitle = (id: string, title: string) => {
        dispatch({ type: 'UPDATE_TITLE', payload: { id, title }})
    }

    const handleAddTodo = (title: string) => {
        dispatch({ type: 'SAVE', payload: {title}})
    }
    const handleClearCompleted = () => {
        dispatch({ type: 'CLEAR_COMPLETED'})
    }

    const handleFilterChange = (filter: filterValue) => {
        dispatch({ type: "FILTER_CHANGE", payload: { filter }})
    }

    const filteredTodos = todos.filter( todo => {
        if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
        if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
        return todo
    })

    const activeCount = todos.filter(todo => !todo.completed).length;
    
    const completedCount = todos.length - activeCount;

    useEffect(() => {
        handleInitTodos()
    }, [])


    return {
        handleCompleted,
        handleRemove,
        handleUpdateTitle,
        handleAddTodo,
        handleClearCompleted,
        handleFilterChange,
        activeCount,
        completedCount,
        filterSelected,
        todos: filteredTodos
    }
}