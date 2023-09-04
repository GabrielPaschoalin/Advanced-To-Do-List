import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from "@material-ui/core";
import '/imports/api/userMethods';
import Swal from 'sweetalert2'
import validator from 'validator';
import { Link } from 'react-router-dom';

const Cadastro = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();

    if (validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {

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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Erro ao registrar usuário: ${error.reason}`
          })
        }

      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Sua senha deve conter: No mínimo 8 caracteres,
        1 Letra maiúscula, 1 letra minúscula, 1 símbolo, 1 número`
      })
    }

  }

  return (
    <div className='login-form'>

      <h1>Bem vindo ao To Do List! Realize seu cadastro</h1>

      <TextField variant="outlined" onChange={(e) => setName(e.target.value)} label="Nome" value={name} />
      <TextField variant="outlined" onChange={(e) => setPassword(e.target.value)} label="Password" value={password} type="password" />

      <Button size="large" color="primary" variant="contained" onClick={submit}> CADASTRAR </Button>
      <div className='link-Login'>
          <Link to="/login">JÁ TENHO LOGIN</Link>
        </div>
    </div>
  );
};

export default Cadastro;