import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef, useContext } from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../App';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';


function EditDeletTodo(props) {
    const [show, setShow] = useState(false); // modal window status
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const [todoItem, setTodoItem] = useState({
        username: "",
        todoTag: "",
        todoUniqueId: 0,
        todoBody: "",
        todoIsChecked: false,
        todoImage: null,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://127.0.0.1:8000/editItem', {
            method: 'POST',
            body: JSON.stringify({
                username: props.username,
                todoId: props.todoId,
                mode: "getItem"
                })
            })
            .then(response => response.json())
            .then(result => {
                setTodoItem(result.item);
            });
    }, []);

    const HandleChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setTodoItem({
        ...todoItem,
        [key]: value
        });
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/editItem', {
            method: 'POST',
            body: JSON.stringify({
                todoItem: todoItem,
                mode: "editItem"
                })
            })
            .then(response => response.json())
            .then(result => {
                if(result.message == "itemEdited") {
                    alert(result.message);
                    setTodoItem(result.item);
                    setIsLoggedIn({
                        ...isLoggedIn,
                        'username': result.item.username
                    })
                };
            });
        handleClose();
    };

    return (
        <>
        <Button variant="primary" onClick={handleShow} id="addTransaction">
            Edit
        </Button>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Edit or Delete your Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Todo Tag*</Form.Label>
                        <Form.Control type='text' name='todoTag' value={todoItem.todoTag} onChange={HandleChange} />
                        <br />
                        <Form.Label>Todo*</Form.Label>
                        <Form.Control type='text' name='todoBody' value={todoItem.todoBody} onChange={HandleChange} />
                        <br />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={HandleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default EditDeletTodo;