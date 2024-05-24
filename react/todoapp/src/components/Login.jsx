import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Login() {
    const[loginInputs, setLoginInputs] = useState({
        username: "",
        password: "",
    });
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const[passwordCheck, setPasswordCheck] = useState(false);
    const navigate = useNavigate();

    document.title = 'Login';

    const HandleChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setLoginInputs({
            ...loginInputs,
            [key]: value
        });
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            body: JSON.stringify({
                loginInputs: loginInputs,
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.status) {
              alert(result.message)
            }
            setIsLoggedIn({
                ...isLoggedIn,
                'status': result.status,
                'username': result.username
            })
            result.status ? navigate('/') : setPasswordCheck(true)
        });
    };

    return (
      <div id="login">


        {passwordCheck && <h3>Wrong Password or Username!</h3>}
        <Container fluid>
          <Row>
            <Col md={6}>
            <h3>login</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    value={loginInputs.username}
                    onChange={HandleChange}
                    placeholder="username"
                    id='usernameFormElement'
                  />
                  <br />
                  <Form.Control
                    type="password"
                    name="password"
                    value={loginInputs.password}
                    onChange={HandleChange}
                    placeholder="password"
                    id='passwordFormElement'
                  />
                  <br />
                  <Button variant="primary" type="submit" onClick={HandleSubmit}>
                    {" "}
                    Submit{" "}
                  </Button>
                </Form.Group>
              </Form>
              <p> If you don't have an account, please go to <strong style={{cursor: 'pointer'}} onClick={() => navigate('/register')}>Register</strong> </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
};

export default Login;