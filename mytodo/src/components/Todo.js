import { useState, useRef, useEffect } from 'react';
import React from 'react';
import TodoList from './TodoList';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import UncontrolledExample from './tabs';
import Form from 'react-bootstrap/Form';

function Todo() {

    // let initialItems = useRef()
    const [items, setTodoItems] = useState([])

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
        .then(res => {
            // initialItems.current = res.data
            setTodoItems(res.data)
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
        <div>
            <form onSubmit={addItems}>
            Add todo: <input ref={curValue} name="todo" type="text"></input>
            <button type="submit"> Submit</button>
            </form>
             <UncontrolledExample onEdit={editItem} onComplete={completeItem} onDelete={deleteItem} todoItems={items} />
        </div>
     );
}
// {items.length > 0 && <TodoList onEdit={editItem} onComplete={completeItem} onDelete={deleteItem} todoItems={items} />}

export default Todo;