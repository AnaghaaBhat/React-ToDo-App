
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card'
import TodoCard from './card';

function UncontrolledExample(props) {
        return (
            <div style={{ display: 'block', width: 700, padding: 30 }}>
                <Tabs defaultActiveKey="first" fill>
                    <Tab key="active" eventKey="first" title="Active">
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title>
                                    {props.todoItems.filter(activeItem => !activeItem.completed).map(i => (
                                        <TodoCard key={i.id} id={i.id} title={i.title} />
                                    ))}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Tab>

                    <Tab key="completed" eventKey="second" title="Completed">
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title>
                                    {props.todoItems.filter(completeItem => completeItem.completed).map(i => (
                                        <TodoCard key={i.id} id={i.id} title={i.title} />
                                    ))}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        );
    }

    export default UncontrolledExample;