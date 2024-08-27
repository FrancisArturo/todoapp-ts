import { useContext, useState } from "react"
import { Todo } from "./Todo"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { TodoContext } from "../context/TodoContext";
import { TodoContextType } from "../types";




export const Todos: React.FC = () => {

    const  { todos } = useContext(TodoContext) as TodoContextType;
    const [isEditing, setIsEditing] = useState('');
    
    const [ parent ] = useAutoAnimate()

    return (
        <ul className="todo-list" ref={parent}>
            {
                todos.map( todo => (
                    <li key={todo.id}
                        onDoubleClick={() => setIsEditing(todo.id)}
                        className={`${todo.completed ? 'completed' : ''}${isEditing === todo.id? 'editing' : ''}`}>
                        <Todo   
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                    </li>
                ))
            }
        </ul>
    )
}
