import React, { useState } from 'react';
import {Meteor} from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from "@material-ui/core";
import '/imports/api/userMethods';

const Cadastro = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [empresa , setEmpresa] = useState('');
  
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();

    const registerData = {
      username: email,
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

    // Accounts.createUser(registerData, function(error){
    //   if (Meteor.user()){
    //     navigate("/login");
    //     console.log(Meteor.userId());
        
    //   }else{
    //     console.log("ERROR: " + error.reason);
    //   }
    // })

  }

  return (
    <div className='login-form'>

      <h1>Bem vindo ao To Do List! Realize seu cadastro</h1>

      <TextField variant="outlined" onChange={(e) => setEmail(e.target.value)} label="Email" value={email}/>
      <TextField variant="outlined" onChange={(e) => setPassword(e.target.value)} label="Password" value={password}/>

      <Button size="large" color="primary" onClick={submit}> CADASTRAR </Button>

    </div>
  );
};

export default Cadastro;