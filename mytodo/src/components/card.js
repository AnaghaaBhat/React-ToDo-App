import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md"
import { useContext, useState } from 'react';
import { todoContext } from './Todo'

function TodoCard(props) {

    const [contentEdit, toggleContentEditable] = useState(false)
    const enableEdit = () => {
        toggleContentEditable(true)
    }

    const onComplete = (e) => {
        e.target.disabled = true
        props.onComplete(parseInt(e.target.parentElement.childNodes[0].id))
    }

    const onDelete = (e) => {
        if (e.target.nodeName !== 'svg') {
           return todoCardContext.contextDispatch({type: 'delete', payload: { itemId: parseInt(e.target.parentElement.parentElement.childNodes[0].id)}})
        }
        todoCardContext.contextDispatch({type: 'delete', payload: { itemId: parseInt(e.target.parentElement.childNodes[0].id), itemValue: e.target.innerHTML.trim() }})
    }

    const listOnChangeHandler = (e) => {
        toggleContentEditable(false)
        if (e.target.innerHTML.trim().length !== 0) {
            todoCardContext.contextDispatch({type: 'edit', payload: { itemId: parseInt(e.target.id), itemValue: e.target.innerHTML.trim() }})
        }
    }

    const todoCardContext = useContext (todoContext)
    return (
        <Card>
            <ListGroup key={props.id} variant="flush">
                <ListGroup.Item key={props.id}>
                    <div contentEditable={contentEdit} onBlur={listOnChangeHandler} id={props.id}>{props.title.trim()}</div>
                    <TiEdit onClick={enableEdit} />
                    <MdDeleteForever onClick={onDelete} />
                </ListGroup.Item>
            </ListGroup>
        </Card>);
}

export default TodoCard;