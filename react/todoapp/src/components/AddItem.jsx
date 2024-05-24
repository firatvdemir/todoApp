import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function AddItem() {
    const{isLoggedIn, setIsLoggedIn} = useContext(UserContext);

    const[username, setUsername] = useState( "unkown"  );
    const[todoId, setTodoId] = useState(Date.now());
    const[todoBody, setTodoBody] = useState('');
    const[todoTag, setTodoTag] = useState('');
    const[todoIsChecked, setTodoIsChecked] = useState(false);
    const[todoImage, setTodoImage] = useState(undefined);

    const navigate = useNavigate();

    const HandleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('todoId', todoId);
        formData.append('todoBody', todoBody);
        formData.append('todoTag', todoTag);
        formData.append('todoIsChecked', todoIsChecked);
        formData.append('todoImage', todoImage);

        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        fetch('http://127.0.0.1:8000/addItem', {
            method:'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
        });
        navigate('/')
    }


    return (
      <Container fluid>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3" size="lg">
                <Form.Label className="addItemLabel"> Tag* </Form.Label>
                <Form.Control
                  type="text"
                  name="todoTag"
                  value={todoTag}
                  onChange={(e) => setTodoTag(e.target.value)}
                  required
                />
                <br />
                <Form.Label className="addItemLabel"> Todo* </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="todoBody"
                  value={todoBody}
                  onChange={(e) => setTodoBody(e.target.value)}
                  required
                />
                <br />
                <Form.Label className="addItemLabel">Image or File</Form.Label>
                <Form.Control
                  type="file"
                  name="imageUrl"
                  onChange={(e) => setTodoImage(e.target.files[0])}
                  accept="image/*,.pdf,.docx"
                />
                <br />

                <Button variant="primary" type="submit" onClick={HandleSubmit}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};

export default AddItem;