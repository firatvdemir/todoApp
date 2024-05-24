import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function MainPage() {
    const {isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const[usersItems, setUsersItems] = useState([]);
    const [imageSrc, setImageSrc] = useState(null);
    const navigate = useNavigate();
    const tableHeaders = ["Done?", "Tag", "Description"];

    useEffect(() => {
        if(!isLoggedIn.status) navigate('/login');
    }, [isLoggedIn])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/getUserItems',{
            method: 'POST',
            body: JSON.stringify({
                username: isLoggedIn.username
            })
        })
        .then(response => response.json())
        .then(result => {
            setUsersItems(result.usersTodoList)
        });
    }, [])

    const renderTableHeader = () => (
        <tr>
            {tableHeaders.map( key => <th style={{ fontSize: "large", padding: "4px", color: "#f4b400", fontWeight: "200", textAlign: "center"}} key={key} >{key.toUpperCase()}</th> )}
        </tr>
    );

    const renderTableBody = () => {

        const body = usersItems.map( item => {

            const handleCheckboxChange = (event) => {
                const todoId = event.target.id;
                const todoIsChecked = event.target.checked;
              };

            return (
                <tr style={{ color: "white", textAlign: "center"}} key={item.todoUniqueId} >
                    <td key={item.todoIsChecked}> 
                    <Form.Check
                        type="checkbox"
                        id={item.todoUniqueId}
                        checked={item.todoIsChecked}
                        onChange={handleCheckboxChange}
                    />
                    </td>
                    <td key={item.todoTag}> {item.todoTag} </td>
                    <td key={item.todoBody}> {item.todoBody} </td>
                </tr>
            )
        });
        return body
    };

    return (
        <div id="portfolio">
            <p> Hello {isLoggedIn.username}! </p>
            <Table  responsive="sm" striped borderless hover>
                <thead>{ renderTableHeader() }</thead>
                <tbody>{ renderTableBody() }</tbody>
            </Table>
        </div>
    );
};

export default MainPage;