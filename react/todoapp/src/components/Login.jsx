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
    
}