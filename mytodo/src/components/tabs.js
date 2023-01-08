
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card'
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md"
import ListGroup from 'react-bootstrap/ListGroup';
// import TodoCard from './card';
// import Pagination from 'react-bootstrap/Pagination';

function UncontrolledExample(props) {

    const [contentEdit, toggleContentEditable] = useState (false)
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
            <div style={{ display: 'block', width: 700, padding: 30 }}>
                <h4>React-Bootstrap Tab Component</h4>
                <Tabs defaultActiveKey="first" fill>
                    <Tab key="active" eventKey="first" title="Active">
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Text>
                                    {props.todoItems.filter(activeItem => !activeItem.completed).map(i => (
                                        <Card>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <div contentEditable={contentEdit} onBlur={listOnChangeHandler} id={i.id}>{i.title.trim()}</div>
                                                    <TiEdit onClick={enableEdit} />
                                                    <MdDeleteForever onClick={onDelete} />
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    ))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Tab>

                    <Tab key="completed" eventKey="second" title="Completed">
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Text>
                                    {props.todoItems.filter(activeItem => activeItem.completed).map(i => (
                                        <Card>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <div id={i.id}>{i.title}</div> 
                                                    <MdDeleteForever onClickCapture={onDelete} />
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    ))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        );
    }

    export default UncontrolledExample;