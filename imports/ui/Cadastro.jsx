import React, { useState } from 'react';
import {Meteor} from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();

    var registerData = {
      username: e.target.registerUsername.value,
      password: e.target.registerPassword.value
    }

    Accounts.createUser(registerData, function(error){
      if (Meteor.user()){
        navigate("/login");
        console.log(Meteor.userId());
        
      }else{
        console.log("ERROR: " + error.reason);
      }
    })

  }
  console.log('cadastro');

  return (
    <div className='login-form'>
      <form onSubmit={submit}>
        <h1>Bem vindo ao To Do List! Realize seu cadastro</h1>
        <input type="text" placeholder="Username" name="registerUsername" required onChange={e => setUsername(e.target.value)}/>
        <input type="text" placeholder="Password" name="registerPassword" required onChange={e => setPassword(e.target.value)}/>
        <button type="submit">CADASTRAR</button>
      </form>
    </div>
  );
};

export default Cadastro;