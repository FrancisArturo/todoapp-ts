import { ListOfTodos } from "../types"
import { mapTodos } from "./mapTodos"



const API_URL = 'https://dummyjson.com/todos?limit=5'





export const fetchTodos = async (): Promise<ListOfTodos> => {

    const res = await fetch(API_URL)
    if(!res.ok) {
        throw new Error ('Error fetching todos')
    }
    
    const {todos} = await res.json()
    const data = mapTodos(todos)
    return data
}