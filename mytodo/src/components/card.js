import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md"
import { useState } from 'react';

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
            return props.onDelete(parseInt(e.target.parentElement.parentElement.childNodes[0].id))
        }
        props.onDelete(parseInt(e.target.parentElement.childNodes[0].id))
    }

    const listOnChangeHandler = (e) => {
        toggleContentEditable(false)
        if (e.target.innerHTML.trim().length !== 0) {
            props.onEdit(parseInt(e.target.id), e.target.innerHTML)
        }
    }

    return (
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <div contentEditable={contentEdit} onBlur={listOnChangeHandler} id={props.id}>{props.title.trim()}</div>
                    <TiEdit onClick={enableEdit} />
                    <MdDeleteForever onClick={onDelete} />
                </ListGroup.Item>
            </ListGroup>
        </Card>);
}

export default TodoCard;