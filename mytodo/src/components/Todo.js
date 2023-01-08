import { useState, useRef, useEffect, useReducer } from 'react';
import React from 'react';
import TodoList from './TodoList';
import axios from 'axios'
import UncontrolledExample from './tabs';

const reducerFunc = (state, action) => {
    if (action.type === 'edit') {
        state.find(i => i.id === action.payload.itemId).title = action.payload.itemValue
        return state
    } 
    if (action.type === 'delete') {
        return state.filter(i => i.id !== action.payload.itemId)
    }
    if (action.type === 'complete') {

    }
    if (action.type === 'add') {

    } 
    return action.payload
}

export const todoContext = React.createContext()

function Todo() {

    // let initialItems = useRef()
    let initialState = []
    const [itemsFromApi, setTodoItems] = useState([])
    const [items, dispatch] = useReducer(reducerFunc, initialState)
    
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
        .then(res => {
            // initialItems.current = res.data
            // setTodoItems(res.data)
            dispatch({payload: res.data})
            // setItems(res.data)
        })
    }, [])


    const curValue = useRef('')

    const addItems = (e) => {
        e.preventDefault()
        setTodoItems([...items, {
            id: items[items.length-1].id + 1,
            title: e.target.todo.value,
            completed: false,
            userId: '1000'
        }])
        curValue.current.value = ''
    }

    const editItem = (itemId, itemValue) => {
        items.find(i => i.id === itemId).title = itemValue
    }

    const completeItem = (itemId) => {
        items.find(i => i.id === itemId).completed = true
    }

    const deleteItem = (itemId) => {
        setTodoItems(items.filter(i => i.id !== itemId))
    }

    return (
        <todoContext.Provider value={{contextVar: items, contextDispatch: dispatch}}>
        <div>
            <form onSubmit={addItems}>
            Add todo: <input ref={curValue} name="todo" type="text"></input>
            <button type="submit"> Submit</button>
            </form>
            {(items && items.length > 0) && <UncontrolledExample onEdit={editItem} onComplete={completeItem} onDelete={deleteItem} todoItems={items} />}
        </div>
        </todoContext.Provider>
     );
}
// {items.length > 0 && <TodoList onEdit={editItem} onComplete={completeItem} onDelete={deleteItem} todoItems={items} />}

export default Todo;