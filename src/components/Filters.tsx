import { useContext } from "react";
import { FILTERS_BUTTONS } from "../consts"
import { filterValue, TodoContextType } from '../types';
import { TodoContext } from "../context/TodoContext";





export const Filters: React.FC = () => {


    const { filterSelected, handleFilterChange } = useContext(TodoContext) as TodoContextType

    const handleClick = (filter : filterValue) => (e: React.MouseEvent<HTMLAnchorElement>) => { 
        e.preventDefault();
        handleFilterChange(filter)
    }

    return (
        <ul className="filters">
            {
                Object.entries(FILTERS_BUTTONS).map(([key, {href, literal}]) => {
                    const isSelected = filterSelected === key
                    const className = isSelected? 'selected' : ''
                    return (
                        <li key={key}>
                            <a
                                href={href}
                                className={className}
                                onClick={handleClick(key as filterValue)}
                            >
                                {literal}
                            </a>
                            
                        </li>
                    )
                })
            }
        </ul>
    )
}