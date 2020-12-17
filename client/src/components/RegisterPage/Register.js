import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import md5 from "md5";
import Axios from "axios";

import { Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUser } from '@fortawesome/free-solid-svg-icons'



function Register(props) {

const { register, handleSubmit, watch, errors } = useForm();
const password = useRef();
password.current = watch("password", "");
const [errorsFromSubmit, setErrorsFromSubmit] = useState("")
const [loading, setLoading] = useState(false)


const onSubmit = async (data) => {
    const body = {
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        password: data.password,
        image: `http://gravatar.com/avatar/${md5(data.email)}?d=identicon`
    }
    try {
        setLoading(true)
        await Axios.post(`/api/users/register`, body)
        props.history.push("/");
        setLoading(false)
    } catch (error){
        setErrorsFromSubmit(error.message)
        setLoading(false)
        setTimeout(() => {
            setErrorsFromSubmit("")
        }, 5000);
    }
}



    return (
        <div style={{ display: 'flex',  justifyContent:'center', textAlign:'center' }}>

            <Form className ="form-sign" onSubmit={handleSubmit(onSubmit)} >

            <Form.Group as={Col} md="24"  controlId="validationCustom00"> 
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                  <FontAwesomeIcon icon={faUser} style={{fontSize:'3rem', color: '#1890ff'}}/> 
            </Form.Group>
            

             <Form.Group as={Col} md="24" controlId="validationCustom01">
                <label for="inputEmail" className="sr-only">Email address</label>
                  <input type="email" name="email" id="inputEmail" class="form-control"  placeholder="Email address" 
                     ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
                  {errors.email && <p>This email field is required</p>}
             </Form.Group>

             <Form.Group as={Col} md="24" controlId="validationCustom02">
                <label for="inputName" className="sr-only">Name</label>
                  <input type="text" name="name" id="inputName" class="form-control" placeholder="Name" 
                    ref={register({ required: true, maxLength: 50 })}
                />
                   {errors.name && errors.name.type === "required"
                     && <p> Name field is required</p>}
                      {errors.name && errors.name.type === "maxLength"
                         && <p> Your input exceed maximum length</p>}
             </Form.Group>

             <Form.Group as={Col} md="24" controlId="validationCustom03">
                <label for="inputSurname" className="sr-only">Surname</label>
                     <input type="text" name="surname" id="inputSurname" class="form-control" placeholder="Surname"
                          ref={register({ required: true, maxLength: 50 })}

                          />
                          {errors.name && errors.name.type === "required"
                               && <p> Surname  field is required</p>}
                                 {errors.name && errors.name.type === "maxLength"
                                     && <p> Your input exceed maximum length</p>}
             </Form.Group>

             <Form.Group as={Col} md="24" controlId="validationCustom04">
                <label for="inputPhone" className="sr-only">Phone Number</label>
                     <input type="tel" name="phone" id="inputPhone"  class="form-control" placeholder="Phone Number(+27)" 
                         ref={register({ required: true, minLength:11, maxLength: 12 })}

                />
                             {errors.name && errors.name.type === "required"
                                 && <p> Phone number is required. Type as "2781....." </p>}
                                     {errors.name && errors.name.type === "maxLength"
                                     && <p> Your input exceed maximum length</p>}
             </Form.Group>


            <Form.Group as={Col} md="24" controlId="validationCustom05">
               <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" 
                         ref={register({ required: true, minLength: 8 })}

               />
                         {errors.password && errors.password.type === "required"
                            && <p> Password field is required</p>}
                             {errors.password && errors.password.type === "minLength"
                                 && <p> Password must have at least 8 characters</p>}
            </Form.Group>

            <Form.Group as={Col} md="24" controlId="validationCustom06">
               <label for="inputPassword" class="sr-only"> Confirm Password</label>
                 <input type="password" name="password_confirm" id="inputPassword" class="form-control" placeholder="Confirm Password" 
                   ref={register({ required: true, 
                       validate: value => value === password.current || "The passwords do not match!"})}
                />
                      {errors.password_confirm && errors.password_confirm.type === "validate"
                        && <p>The passwords do not match</p>}
            </Form.Group>

              {errorsFromSubmit &&
              <p>{errorsFromSubmit}</p>
               }
            <Form.Group as={Col} md="24" controlId="validationCustom07">
                <button class="btn btn-lg btn-primary btn-block" type="submit"  disabled={loading} >Sign up</button>
            </Form.Group> 


            <Form.Group as={Col} md="24" controlId="validationCustom09">
                <div class="card-body">
                    <a class="btn btn-block" href="http://localhost:5000/auth/google" role="button">
                    <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" alt="signWithGoogle" />
                    Sign Up with Google
                 </a>
                </div>
            </Form.Group>  
            
             
              

              
            </Form>
        </div>
    )
}

export default Register
