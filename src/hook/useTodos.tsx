import { useEffect, useState } from "react";
import { TODO_FILTERS } from "../consts";
import { filterValue, ListOfTodos, Todo as TodoType, TodoId, TodoTitle } from '../types';
import { fetchTodos } from "../services/todos";

export const useTodos = (): {
    activeCount: number;
    completedCount: number;
    todos: ListOfTodos;
    filterSelected: filterValue;
    onClearCompleted: () => void;
    handleCompleted: ({ id, completed }: Pick<TodoType, "id" | "completed">) => void;
    handleRemove: ({ id }: TodoId) => void;
    handleFilterChange: (filter: filterValue) => void;
    handleAddTodo: ({ title }: TodoTitle) => void;
    handleUpdateTitle: ({ id }: TodoId, { title }: TodoTitle) => void;
} => {
    const [todos, setTodos] = useState<ListOfTodos>([] as ListOfTodos);

    const [filterSelected, setFilterSelected] = useState<filterValue>(
        TODO_FILTERS.ALL
    );

    const getTodos = async () => {
        const todosReceived = await fetchTodos()
        setTodos(todosReceived)
    }

    const handleRemove = ({id}: TodoId) => {
        const newTodos = todos.filter( todo => todo.id !== id);
        setTodos(newTodos);
    }

    const handleCompleted = ({
        id,
        completed,
    }: Pick<TodoType, "id" | "completed">): void => {
        const newTodos = todos.map((todo) => {
        if (todo.id === id) {
            return {
            ...todo,
            completed: completed,
            };
        }
        return todo;
        });
        setTodos(newTodos);
    };
    const handleFilterChange = (filter: filterValue) => {
        setFilterSelected(filter)
    }
    
    const onClearCompleted = () => {
        setTodos(todos.filter( todo => !todo.completed));
    }
    
    const activeCount = todos.filter(todo => !todo.completed).length;
    
    const completedCount = todos.length - activeCount;
    
    const filteredTodos = todos.filter( todo => {
        if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
        if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
        return todo
    })
    
    const handleAddTodo = ({title}: TodoTitle) => {
        const newTodo = {
            title,
            id: crypto.randomUUID(),
            completed: false
        }
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
    }
    
    const handleUpdateTitle = ({id} : TodoId, {title}: TodoTitle) => {
        const newTodos = todos.map( todo => {
            if(todo.id === id) {
                const newTodo = {
                ...todo,
                title: title
            }
                return newTodo
            }
            return todo
        })
        setTodos(newTodos)
    }


    useEffect(() => {
        getTodos()
    }, [])

    return {
        activeCount,
        completedCount,
        todos: filteredTodos,
        filterSelected,
        onClearCompleted,
        handleCompleted,
        handleRemove,
        handleFilterChange,
        handleAddTodo,
        handleUpdateTitle
    }
};
