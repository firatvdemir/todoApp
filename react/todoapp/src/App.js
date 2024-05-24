import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';

import MainPage from './components/MainPage';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import AddItem from './components/AddItem';

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
      <UserContext.Provider value={value} >
        <Container fluid>

          <Row className="justify-content-md-center">
            <Col md={8}>
              <Navbar className='navBar' bg="dark" variant="dark">
                <Col>
                  <Nav className="me-auto">
                      <Link to='/'>
                        <Button className='navButton' variant="outline-secondary">Home</Button>
                      </Link>

                      {!(isLoggedIn.status) && <Link to='/login'>
                        <Button className='navButton' variant="outline-secondary">Login</Button>
                      </Link> }

                      {!(isLoggedIn.status) && <Link to='/register'>
                        <Button className='navButton' variant="outline-secondary">Register</Button>
                      </Link>}

                      {isLoggedIn.status && <Link to='/add-item'>
                        <Button className='navButton' variant="outline-secondary">Add Todo</Button>
                      </Link>}

                      {isLoggedIn.status && <Link to='/logout'>
                        <Button className='navButton' variant="outline-secondary">Logout</Button>
                      </Link>}
                    </Nav>
                </Col>
              </Navbar>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col md={8} >
              <Routes>
                  <Route path='/' element={ <MainPage /> } />
                  <Route path='/login' element={ <Login />} />
                  <Route path='/register' element={ <Register /> } />
                  <Route path='/logout' element={ <Logout /> } />
                  <Route path='/add-item' element={ <AddItem /> } />
                </Routes>
            </Col>
          </Row>
        </Container>
      </UserContext.Provider>
    </div>
  );
}

export default App;
