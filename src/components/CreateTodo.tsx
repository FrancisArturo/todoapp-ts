import { useContext, useState } from "react"
import { TodoContext } from "../context/TodoContext";
import { TodoContextType } from "../types";



export const CreateTodo: React.FC = () => {

    const { handleAddTodo } = useContext(TodoContext) as TodoContextType
    const [ inputValue, setInputValue ] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleAddTodo(inputValue);
        setInputValue('');
    }


    return (
        <form onSubmit={handleSubmit}>
            <input 
                className="new-todo"
                value={inputValue}
                onChange={(e) => {setInputValue(e.target.value)}}
                placeholder="¿Qué quieres hacer?"
                autoFocus
            />
        </form>
        
    )
}