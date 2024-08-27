import { ListOfTodos } from '../types';

interface Todos {
    id: number,
    todo: string,
    completed: boolean,
    userId: number
}


export const mapTodos = (todos: Todos[]): ListOfTodos => {
    const mappedTodos = todos.map( todo => {
        const newTodo = {
            id: todo.id.toString(),
            title: todo.todo,
            completed: todo.completed

        }
        return newTodo
    })
    return mappedTodos
}