import { useContext, useEffect, useRef, useState } from "react"
import { TodoContextType, Todo as TodoType } from "../types"
import { TodoContext } from "../context/TodoContext"

interface Props extends TodoType {
    isEditing: string
    setIsEditing: (completed: string) => void
}


export const Todo: React.FC<Props> = ({id, completed, title, isEditing, setIsEditing}) => {

    const { handleRemove, handleCompleted, handleUpdateTitle } = useContext(TodoContext) as TodoContextType
    const [ editedTitle, setEditedTitle] = useState(title);
    const inputEditTitle = useRef<HTMLInputElement>(null)

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter') {
            setEditedTitle(editedTitle.trim())

            if(editedTitle !== title ) {
                handleUpdateTitle(id, editedTitle)
            }
            if(editedTitle === '') {
                handleRemove(id)
            }
            setIsEditing('')
        }

        if(e.key === 'Escape') {
            setEditedTitle(title)
            setIsEditing('')
        }
    }

    useEffect(() => {
        inputEditTitle.current?.focus()
    }, [isEditing])

    return (
        <>
            <div className="view">
                <input 
                    className="toggle"
                    checked={completed}
                    type="checkbox"
                    onChange={(e) => {handleCompleted(id, e.target.checked)}}
                />
                <label>{title}</label>
                <button 
                    className="destroy"
                    onClick={() => handleRemove(id)}
                />
            </div>

            <input
                className='edit'
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setIsEditing('') }}
                ref={inputEditTitle}
            />
        </>
    )
}