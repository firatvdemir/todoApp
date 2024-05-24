import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
            setJsonResponse(result)
            console.log(result)
        });
    };

    return(
        <div id="register">
            <h2>Register</h2>
                <Form>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Control type='text' name='username' value={userInputs.username} onChange={HandleChange} placeholder='Define a username' />
                        <br />
                        <Form.Control type='email' name='email' value={userInputs.email} onChange={HandleChange} placeholder='Write your e-mail' />
                        <br />
                        <Form.Control type='password' name='password' value={userInputs.password} onChange={HandleChange} placeholder='Define a password' />
                        <br />
                        <Form.Control type='password' name='confirmPassword' value={userInputs.confirmPassword} onChange={HandleChange} placeholder='Confirm password' />
                        <br />
                        <Button variant="primary" type="submit" onClick={HandleSubmit}> Submit </Button>
                    </Form.Group>
                </Form>
            <div style={{height: "400px"}}/>
        </div>
    );
};

export default Register;