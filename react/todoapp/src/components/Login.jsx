import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
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
            setIsLoggedIn({
                ...isLoggedIn,
                'status': result.status,
                'username': result.username
            })
            result.status ? navigate('/') : setPasswordCheck(true)
        });
    };

    return(
        <div id='login'>
            <h2>login</h2>

            {passwordCheck &&
            <h3>Wrong Password or Username!</h3>}

            <Form>
                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                    <Form.Control type='text' name='username' value={loginInputs.username} onChange={HandleChange} placeholder='username' />
                    <br />
                    <Form.Control type='password' name='password' value={loginInputs.password} onChange={HandleChange} placeholder='password' />
                    <br />
                    <Button variant="primary" type="submit" onClick={HandleSubmit}> Submit </Button>
                </Form.Group>
            </Form>
            <div style={{height: "400px"}}/>
        </div>
    );
};

export default Login;