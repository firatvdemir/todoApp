import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';

export const UserContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

function App() {
  const[isLoggedIn, setIsLoggedIn] = useState({
    'status': false,
    'username': "unknown",
  })
  const value = { isLoggedIn, setIsLoggedIn }

  return (
    <div className="App">
      <UserContext.Provider value={false} >
        <Container fluid>
          <Row className='justify-content-md-center'>
            <Col md={8}>
              
            </Col>
          </Row>
        </Container>
      </UserContext.Provider>
    </div>
  );
}

export default App;
