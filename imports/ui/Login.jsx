import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@material-ui/core";
import { TextField } from '@material-ui/core';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submit = () => {

    Meteor.loginWithPassword(username, password, function (error) {
      if (Meteor.user()) {
        navigate("/tasks");
        console.log(Meteor.userId());
      } else {
        console.log("ERROR: " + error.reason);
      }
    });
  }

  return (
    <div className='login'>
      <h1>Bem vindo ao To Do List!</h1>
      <div className='login-form'>
        <TextField  variant="outlined" onChange={e => setUsername(e.target.value)} label="Email" value={username} name="loginUsername" />
        <TextField  variant="outlined" onChange={e => setPassword(e.target.value)} label="Password" value={password} name="loginPassword" />
        <div className='submit'>
          <Button size="large" variant="contained" color="primary" onClick={submit}>Login</Button>
        </div>
        <div className='link-Login'>
          <Link to="/cadastro">CADASTRE-SE</Link>
        </div>
      </div>

    </div>
  );
};

export default Login;