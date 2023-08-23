import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from 'react-router';


const UserProfile = () => {

    const user = useTracker(() => Meteor.user());

    const [username, setUsername] = useState(user.username);
    const [nome, setNome] = useState(user.profile.nome);
    const [dataNascimento, setDataNascimento] = useState(user.profile.dataNascimento);
    const [sexo, setSexo] = useState(user.profile.sexo);
    const [empresa, setEmpresa] = useState(user.profile.empresa);

    const navigate = useNavigate();

    const updateUserProfile = () => {
        // Assuming you have a Meteor method to update user profile
        Meteor.call('updateUserProfile', user._id, {
            username,
            profile: {
                nome,
                dataNascimento,
                sexo,
                empresa
            }
        }, (error) => {
            if (!error) {
                console.log('User profile updated successfully.');
                navigate("/tasks");
            } else {
                console.error('Error updating user profile:', error);
            }
        });
    };

    const cancelUpdate = () => {
        navigate('/tasks');
    }

    return (
        <div className='userProfile'>

            {/* USER PROFILE: {user._id} */}
            <div className='userProfile-fields'>
                <TextField className='userField' variant="outlined" onChange={(e) => setNome(e.target.value)} label="Nome" value={nome} />
                <TextField className='userField' variant="outlined" onChange={(e) => setEmail(e.target.value)} label="Email" value={username} />
                <TextField className='userField' variant="outlined" onChange={(e) => setDataNascimento(e.target.value)} label="Data de Nascimento" value={dataNascimento} />
                <TextField className='userField' variant="outlined" onChange={(e) => setEmpresa(e.target.value)} label="Empresa" value={empresa} />

            </div>
            <Button size="large" color="primary" onClick={updateUserProfile}>
                ATUALIZAR PERFIL
            </Button>
            <Button size="large" color="primary" onClick={cancelUpdate}>
                CANCELAR
            </Button>

        </div>
    );
};

export default UserProfile;