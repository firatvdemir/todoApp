import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Table from 'react-bootstrap/Table';

function MainPage() {
    const {isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn.status) navigate('/login');
    }, [isLoggedIn])

};

export default MainPage;