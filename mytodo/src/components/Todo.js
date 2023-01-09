import { useRef, useEffect, useReducer } from 'react';
import React from 'react';
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
        state = [...state, action.payload]
        return state
    } 
    return action.payload
}

export const todoContext = React.createContext()

function Todo() {

    let initialState = []
    const [items, dispatch] = useReducer(reducerFunc, initialState)
    
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
        .then(res => {
            dispatch({payload: res.data})
        })
    }, [])


    const curValue = useRef('')

    const addItems = (e) => {
        e.preventDefault()

        reducerFunc(items, {type: 'add',
            payload: {
                id: items[items.length-1].id + 1,
                title: e.target.todo.value,
                completed: false
            }
        })
        curValue.current.value = ''
    }

    return (
        <todoContext.Provider value={{contextVar: items, contextDispatch: dispatch}}>
        <div>
            <form onSubmit={addItems}>
            Add todo: <input ref={curValue} name="todo" type="text"></input>
            <button type="submit"> Submit</button>
            </form>
            {(items && items.length > 0) && <UncontrolledExample  todoItems={items} />}
        </div>
        </todoContext.Provider>
     );
}

export default Todo;