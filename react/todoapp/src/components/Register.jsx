import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Register() {
    const[userInputs, setUserInputs] = useState({
        username:"",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const[jsonResponse, setJsonResponse] = useState([]);
    const navigate = useNavigate();

    document.title = 'Register';
    const HandleChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setUserInputs({
            ...userInputs,
            [key]: value
        });
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/register', {
            method:'POST',
            body: JSON.stringify({
                userInputs: userInputs,
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.status) {
                alert(result.message);
                navigate('/');
            } else {
                alert(result.message);
            }
            console.log(result)
        });
    };

    return (
      <div id="register">
        <Container fluid>
          <Row>
            <Col md={6}>
              <h3>Register</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    value={userInputs.username}
                    onChange={HandleChange}
                    placeholder="Define a username"
                    id='usernameArea'
                  />
                  <br />
                  <Form.Control
                    type="email"
                    name="email"
                    value={userInputs.email}
                    onChange={HandleChange}
                    placeholder="Write your e-mail"
                    id='emailArea'
                  />
                  <br />
                  <Form.Control
                    type="password"
                    name="password"
                    value={userInputs.password}
                    onChange={HandleChange}
                    placeholder="Define a password"
                    id='passwordArea'
                  />
                  <br />
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={userInputs.confirmPassword}
                    onChange={HandleChange}
                    placeholder="Confirm password"
                    id='confirmPasswordArea'
                  />
                  <br />
                  <Button variant="primary" type="submit" onClick={HandleSubmit}>
                    {" "}
                    Submit{" "}
                  </Button>
                </Form.Group>
              </Form>
              <p> You have an account?, please go to <strong style={{cursor: 'pointer'}} onClick={() => navigate('/login')}>Login</strong> </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
};

export default Register;