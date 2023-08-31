import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from 'react-router';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'; // Corrected import
import ProfilePhoto from './Components/ProfilePhoto';

const UserProfile = () => {

    const user = useTracker(() => Meteor.user());

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.profile.email);
    const [dataNascimento, setDataNascimento] = useState(user.profile.dataNascimento);
    const [sexo, setSexo] = useState(user.profile.sexo);
    const [empresa, setEmpresa] = useState(user.profile.empresa);
    const [photo, setPhoto] = useState(user.profile.photo);
    const navigate = useNavigate();

    const updateUserProfile = () => {
        // Assuming you have a Meteor method to update user profile
        Meteor.call('updateUserProfile', user._id, {
            username,
            profile: {
                email,
                dataNascimento,
                sexo,
                empresa,
                photo
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

            <h2>USER PROFILE</h2>
            <div className='user-form-fields'>
                <div className='login-form'>
                    <TextField variant="filled" color="secondary" margin="dense" onChange={(e) => setNome(e.target.value)} label="Nome" value={username} />
                    <TextField variant="filled" color="secondary" margin="dense" onChange={(e) => setEmail(e.target.value)} label="Email" value={email} type="email"/>
                    <TextField fullWidth variant="filled" color="secondary" margin="dense" onChange={(e) => setDataNascimento(e.target.value)} label="Data de Nascimento" value={dataNascimento} type="date"/>
                    <TextField variant="filled" color="secondary" margin="dense" onChange={(e) => setEmpresa(e.target.value)} label="Empresa" value={empresa} />
                </div>

                <div className='profile-right'>
                    <ProfilePhoto photo={photo} setPhoto={setPhoto}/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sexo}
                            label="Sexo"
                            onChange={(event) => setSexo(event.target.value)}
                        >
                            <MenuItem value={'M'}>Masculino</MenuItem>
                            <MenuItem value={'F'}>Feminino</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="edit-button-container">
                <Button variant="contained" onClick={updateUserProfile}>
                    ATUALIZAR PERFIL
                </Button>
                <Button variant="contained" color="secondary" onClick={cancelUpdate}>
                    CANCELAR
                </Button>
            </div>

        </div>
    );
};

export default UserProfile;