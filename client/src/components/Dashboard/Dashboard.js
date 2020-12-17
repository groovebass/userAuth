import React,{ useState,useEffect } from 'react';
import {Nav, Tab, Row, Col, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEye } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';







function Dashboard() {

    const [Users, setUsers] = useState([]);


    useEffect(() => {
            listUsers();  
           
    }, [])

        const listUsers = () => {
            Axios.get("/api/users/allUsers")
            .then(response => {
                setUsers(response.data);
            }).catch (err => {
                console.log(err);
            });
        };

     

    return (
        <div style={{ width: '95%', margin: '2rem auto' }}>
            <h1 style={{textAlign: 'center' }}>DASHBOARD </h1>
            <br/>
            <Tab.Container>
                <Row>
                    <Col sm={3} >
                        <Nav variant="pills"  className="flex-column" >
                            <Nav.Item>
                            <Nav.Link href="/home">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="products">Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="customers">Customers</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="users">User Management</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content >
                            <Tab.Pane eventKey="products">
                            <p> One 2 Test</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="customers">
                            <p> Three Twoo</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="users">
                            {Users.map((user, index) => ( 
                            <Table responsive="sm" variant="dark" >
                            
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Surname </th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>View</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.role}</td>
                                        <td> <a href={`/useraccount/${user._id}`}>
                                        <FontAwesomeIcon icon={faEye} style={{fontSize:'2rem', color: '#1890ff'}}/>
                                        </a>
                                        </td>
                                        
                                    </tr>
                                    </tbody>
                           
                                </Table>
                                ))}
                            </Tab.Pane>
                         </Tab.Content>
                    </Col>
                
                </Row>
            

            </Tab.Container>
            
        </div>
    )
}

export default Dashboard
