import React, { useState } from 'react';
import {Meteor} from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from "@material-ui/core";
import '/imports/api/userMethods';

const Cadastro = () => {
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();

    const registerData = {
      username: name,
      password: password,
      nome: '',
      dataNascimento: '', 
      sexo: '',
      empresa: '',
    
    }
    Meteor.call('user.register', registerData, (error) => {
      if (!error) {
        navigate("/login");
      } else {
        console.log("Error registering user:", error.reason);
      }
  
    });

  }


  return (
    <div className='login-form'>

      <h1>Bem vindo ao To Do List! Realize seu cadastro</h1>

      <TextField variant="outlined" onChange={(e) => setName(e.target.value)} label="Nome" value={name}/>
      <TextField variant="outlined" onChange={(e) => setPassword(e.target.value)} label="Password" value={password}  type="password"/>

      <Button size="large" color="primary" variant="contained" onClick={submit}> CADASTRAR </Button>

    </div>
  );
};

export default Cadastro;