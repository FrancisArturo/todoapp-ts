import { useContext } from "react";
import { TodoContextType } from "../types";
import { Filters } from "./Filters";
import { TodoContext } from "../context/TodoContext";




export const Footer: React.FC = () => {

    const { activeCount, completedCount, handleClearCompleted } = useContext(TodoContext) as TodoContextType

    return (
        <footer className="footer">
            <span className="todo-count">{activeCount}
                <strong> Tareas Pendientes</strong>
            </span>
            <Filters />
            {
                completedCount > 0 && (
                    <button
                        className="clear-completed"
                        onClick={handleClearCompleted}
                    >
                        Borrar Completadas
                    </button>
                )
            }

        </footer>
    )
}