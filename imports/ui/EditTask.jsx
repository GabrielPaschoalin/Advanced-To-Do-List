import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { FormGroup, TextField, Button, MuiThemeProvider } from "@material-ui/core";
import { useParams, useNavigate } from 'react-router';
import { Meteor } from 'meteor/meteor';

const EditTask = () => {

    const navigate = useNavigate();
    const { id } = useParams();


    const task = useTracker(() =>
        TasksCollection.find({ _id: id }).fetch()
    );

    const selectedTask = task[0] || {};

    const [text, setText] = useState(selectedTask.text);
    const [description, setDescription] = useState(selectedTask.description);
    const [data, setData] = useState(selectedTask.createdAt);


    const returnToTaskList = (e) => {
        e.preventDefault();

        const updatedTask = { ...selectedTask, text, createdAt: data, description, needEdit: false };

        Meteor.call('tasks.updateTask', selectedTask._id, updatedTask);
        navigate('/tasks');
    }

    const handleCancel = (e) => {
        e.preventDefault();

        const updatedTask = { ...selectedTask, needEdit: false };

        console.log(updatedTask);

        Meteor.call('tasks.updateTask', selectedTask._id, updatedTask);
        navigate('/tasks');
    }



    return (

        <div >

            <FormGroup className='Edit'>
                <h2>EDITAR TAREFA</h2>
                <TextField
                    className='textField'
                    variant="filled"
                    color="secondary"
                    margin="dense"
                    onChange={(e) => setText(e.target.value)}
                    label="Nome"
                    value={text}
                />

                <TextField
                    className='textField'
                    variant="filled"
                    color="secondary"
                    margin="dense"
                    onChange={(e) => setDescription(e.target.value)}
                    label="Descrição"
                    value={description}
                />

                <TextField
                    className='textField'
                    variant="filled"
                    color="secondary"
                    margin="dense"
                    onChange={(e) => setData(e.target.value)}
                    label="Data"
                    value={data}
                />
                <div className="edit-button-container">
                    <Button onClick={returnToTaskList} variant="contained" className='confirm-button'>CONFIRMAR</Button>
                    <Button onClick={handleCancel} variant="contained" color="secondary">CANCELAR</Button>
                </div>
            </FormGroup>

        </div>

    );
};

export default EditTask;