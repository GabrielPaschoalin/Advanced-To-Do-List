import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();

    const myUsername = e.target.loginUsername.value;
    const myPassword = e.target.loginPassword.value;

    Meteor.loginWithPassword(myUsername, myPassword, function(error){
      if(Meteor.user()){
        navigate("/tasks");
        console.log(Meteor.userId());
      }else{
        console.log("ERROR: " + error.reason);
      }
    });
  }

  return (
    <div className='login-form'>
      <form onSubmit={submit}>
        <h1>Bem vindo ao To Do List!</h1>
        <input type="text" placeholder="Username" name="loginUsername" required onChange={e => setUsername(e.target.value)} />
        <input type="text" placeholder="Password" name="loginPassword" required onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      <Link to="/cadastro">CADASTRE-SE</Link>
    </div>
  );
};

export default Login;