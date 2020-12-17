import React, { Suspense } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from '../src/components/RegisterPage/Register';
import Login from './components/LoginPage/Login';
import Home from './components/HomePage/Home';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UserAccount from './components/UserAccount/UserAccount';




function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
    <NavBar/>
    <div  style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
      <BrowserRouter> 
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/resetpassword" component={ResetPassword} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/useraccount/:id" component={UserAccount} />
      </Switch>
      </BrowserRouter>
    </div>
    <Footer/>
    </Suspense>
  );
}

export default App;
