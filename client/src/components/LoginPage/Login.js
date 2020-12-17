import React, { useState } from 'react'


import { Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUser } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import Axios from 'axios';

function Login(props) {

    const { register, handleSubmit, errors } = useForm();
    const [errorsFromSubmit, setErrorsFromSubmit] = useState("")
    const [loading, setLoading] = useState(false)
  

const onSubmit = async (data) => {
    const body = {
        email: data.email,
        password: data.password
    }
    try {
        setLoading(true)
        await Axios.post(`/api/users/login`, body) 
        props.history.push("/dashboard");
        setLoading(false)
    } catch (error) {
        setErrorsFromSubmit(error.message)
        setLoading(false)
        setTimeout(() => {
            setErrorsFromSubmit("")
        }, 5000);
    } 
}






    return (
        <div style={{ display: 'flex',  justifyContent:'center', textAlign:'center' }}>

            <Form className ="form-sign" onSubmit={handleSubmit(onSubmit)}>

            <Form.Group as={Col} md="24"  controlId="validationCustom00"> 
                <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                <FontAwesomeIcon icon={faUser} style={{fontSize:'3rem', color: '#1890ff'}}/> 
            </Form.Group>
            

             <Form.Group as={Col} md="24" controlId="validationCustom01">
                  <label for="inputEmail" className="sr-only">Email address</label>
                     <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" 
                        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>Username/Email field is required</p>}
             </Form.Group>

            <Form.Group as={Col} md="24" controlId="validationCustom02">
               <label for="inputPassword" class="sr-only">Password</label>
               <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" 
               ref={register({ required: true, minLength: 8 })}

               />
            </Form.Group>
            {errorsFromSubmit &&
            <p>{errorsFromSubmit}</p>
          }
            <Form.Group as={Col} md="24" controlId="validationCustom03">
                <button class="btn btn-lg btn-primary btn-block" type="submit" disabled={loading}> Sign in</button>
            </Form.Group>  

            
            <Form.Group as={Col} md="24" controlId="validationCustom08">
                <a href="/resetpassword"> Forgot Password?</a>
            </Form.Group> 

            <Form.Group as={Col} md="24" controlId="validationCustom04">
                <div class="card-body">
                    <a class="btn btn-block" href="http://localhost:5000/auth/google" role="button">
                    <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" alt="signWithGoogle" />
                    Sign In with Google
                 </a>
                </div>
            </Form.Group>  
            
             
              

              
            </Form>
        </div>
    )
}

export default Login
