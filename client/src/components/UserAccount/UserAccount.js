import Axios from 'axios';
import React, { useEffect, useState  } from 'react';
import {Table, Card, Button, Form, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




function UserAccount(props) {

        const initialUserState = {
        name: "", 
        surname: "", 
        email: "", 
        phone: 0, 
        role: 1, 
        image: "",

        };
        const [modalShow, setModalShow] = useState(false);
        const [currentUser, setcurrentUser] = useState(initialUserState);
        const id = props.match.params.id;
        // const [User, setUser] = useState([]);
        const [message, setMessage] = useState("");

        

//Get current User by Id details on the Table
        useEffect(() => {
                Axios.get(`/api/users/${id}`)
                .then(response => {
                    setcurrentUser(response.data) 
                      console.log(response.data);
                }).catch(err => {
                        console.log(err);
                    });
            }, [id])


//Show Modal
        const openModal = () => {
            setModalShow(true)
          }
        
          
// Update User Details
             const handleInputChange = event => {
            const{name, value} = event.target;
            setcurrentUser({...currentUser, [name]: value});
            };

          const FetchUserToUpdate = (id, data) => {
              return Axios.put(`/api/users/${id}`, data);
          };

          const UpdateUser = () => {
              FetchUserToUpdate(currentUser._id, currentUser)
              .then(response => {
                  console.log(response.data);
                  setMessage("User Details Updated Successfully")
              }).catch (err => {
                  console.log(err);
              });
          };


    return (
        
          
        <div style={{ width: '75%', margin: '2rem auto' }}>
                { modalShow && 
                <div style={{ display: 'flex',  justifyContent:'center', textAlign:'center' }}>
                <Card style={{ width: '30rem' }}> 
                <Form>
                
                        <Form.Group as={Col} md="24"  controlId="validationCustom00"> 
                            <h1 class="h3 mb-3 font-weight-normal">Edit User Account</h1>                             
                        </Form.Group>

                        <Form.Group as={Col} md="24" controlId="validationCustom001">

                        <Card.Img variant="top" src={currentUser.image}  style={{ width: '10rem', height: '10rem' }}/>

                            <label for="inputEmail" className="sr-only">Image</label>
                            <Form.File id="exampleFormControlFile1" label="Profile Picture" />
                        </Form.Group>

                        <Form.Group as={Col} md="24" controlId="validationCustom01">
                            <label for="inputEmail"  className="sr-only">Email address</label>
                             <input type="email" name="email" id="inputEmail" 
                             class="form-control"  placeholder="Email address" 
                             value={currentUser.email} 
                            onChange={handleInputChange}
                             />
                        </Form.Group>

                        <Form.Group as={Col} md="24" controlId="validationCustom02">
                            <label for="inputName"  className="sr-only">Name</label>
                            <input type="text" name="name" id="inputName" 
                            class="form-control" placeholder="Name" 
                            value={currentUser.name}
                            onChange={handleInputChange}   
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="24" controlId="validationCustom03">
                            <label for="inputSurname" className="sr-only">Surname</label>
                            <input type="text" name="surname" id="inputSurname" 
                            class="form-control" placeholder="Surname"
                             value={currentUser.surname} 
                             onChange={handleInputChange}
                             />
                         </Form.Group>

                        <Form.Group as={Col} md="24" controlId="validationCustom04">
                            <label for="inputPhone" className="sr-only">Phone Number</label>
                             <input type="tel" name="phone" id="inputPhone" 
                              class="form-control" placeholder="Phone Number(+27)" 
                              value={currentUser.phone}
                              onChange={handleInputChange}
                              />
                         </Form.Group>
                         <Button type="submit"
                         onClick={UpdateUser} >
                         Save
                         </Button>
                         <p>{message}</p>
                         {' '}
                         <Button type="submit" onClick={() => setModalShow(false)}>Close</Button>{' '}
               </Form>
               
               </Card>
              </div>
            }
                










            <h2>My Account : {currentUser.name}, {currentUser.surname}</h2>
                 <br></br>

                <Card style={{ width: '10rem', height: '10rem' }}>
                    <img src={currentUser.image} alt="User Pic" style={{ width: '10rem', height: '10rem' }}/>
                </Card>
                    <br></br>
            
            <Table striped bordered hover  variant="dark">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{currentUser.name}</td>
                        <td>{currentUser.surname}  </td>
                        <td>{currentUser.email} </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>Phone Number</th>
                        <th>User Role  </th>
                        <th>Customer ID </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{currentUser.phone}</td>
                        <td>{currentUser.role}</td>
                        <td>{currentUser._id}</td>
                    </tr>
                </tbody>
            </Table>
                <Button type="submit" onClick={() => openModal({})}>Edit</Button>{' '}
                <Button type="submit">Delete Account</Button>{' '}
        </div>
    )
}

export default UserAccount









// useEffect(() => {
//     Axios.get(`/api/users/users_by_id?id=${userId}&type=single`)
//     .then(response => {
//         setUser(response.data[0])  
//     })
// }, [userId])



// //Show current User details on the Modal
// useEffect(() => {
//     Axios.get(`/api/users/users_by_id?id=${userId}&type=single`)
//     .then(response => {
//         setcurrentUser(response.data[0]) 
      
        
//     })
// }, [userId])