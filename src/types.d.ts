import { TODO_FILTERS } from "./consts";

export interface Todo {
    id: string,
    title: string,
    completed: boolean
}

export type TodoTitle = Pick<Todo, 'title'>
export type TodoId = Pick<Todo, 'id'>
export type TodoCompleted = Pick<Todo, 'completed'>


export type ListOfTodos = Todo[];

export type filterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]

export type TodoContextType = {
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
}