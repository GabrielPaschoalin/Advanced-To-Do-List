import {Routes, Route, useNavigate} from 'react-router-dom';

const navigate = useNavigate();

const goToCadastro = () => {
    navigate('/cadastro');
}

const goToLogin = () => {
    navigate('/login');
}

export  {goToCadastro, goToLogin};