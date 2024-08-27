import { useTodosReducer } from "../hook/useTodosReducer"
import { TodoContext } from "./TodoContext";



export const TodoProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const {
        activeCount,
        completedCount,
        todos: filteredTodos,
        filterSelected,
        handleClearCompleted,
        handleCompleted,
        handleRemove,
        handleFilterChange,
        handleAddTodo,
        handleUpdateTitle
    } = useTodosReducer()

    return (
        <TodoContext.Provider value={{
            activeCount,
            completedCount,
            todos: filteredTodos,
            filterSelected,
            handleClearCompleted,
            handleCompleted,
            handleRemove,
            handleFilterChange,
            handleAddTodo,
            handleUpdateTitle
        }}>
            {children}
        </TodoContext.Provider>
    )
}