import React, { useState } from 'react';


function TodoList(props) {

    const [contentEdit, toggleContentEditable] = useState(false)
    const enableEdit = () => {
        toggleContentEditable(true)
    }

    const onComplete = (e) => {
        e.target.disabled = true
        props.onComplete(parseInt(e.target.parentElement.childNodes[1].id))
    }

    const onDelete = (e) => {
        props.onDelete(parseInt(e.target.parentElement.childNodes[1].id))
    }

    const listOnChangeHandler = (e) => {
        toggleContentEditable(false)
        props.onEdit(parseInt(e.target.id), e.target.innerHTML)
    }

    return (<div>
        {props.todoItems.map(i => (
                <div className="card" key={i.id}>
                    {i.completed ? <input type="checkbox" disabled checked onClick={onComplete} /> : <input type="checkbox" onClick={onComplete} />}
                    <div className="card-body" contentEditable={contentEdit} onBlur={listOnChangeHandler} key={i.id} id={i.id}>
                        {i.title}
                    </div>
                    <button onClick={enableEdit}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>         
        ))}
    </div>);
}

export default TodoList;