import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { FormGroup, TextField, Button, MuiThemeProvider } from "@material-ui/core";
import { useParams, useNavigate } from 'react-router';

const EditTask = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    const task = useTracker(() =>
        TasksCollection.find({ _id: id }).fetch()
    );

    const selectedTask = task[0] || {};

    const [text, setText] = useState(selectedTask.text);
    const [description, setDescription] = useState(selectedTask.description);
    const [data, setData] = useState(selectedTask.data);


    const returnToTaskList = () => {
        const updatedTask = { ...selectedTask, text, data, description, needEdit: false };
        TasksCollection.update(selectedTask._id, { $set: updatedTask });
        navigate('/tasks');
    }

    const handleCancel = () => {
        const updatedTask = { ...selectedTask, needEdit: false };
        TasksCollection.update(selectedTask._id, { $set: updatedTask });
        navigate('/tasks');
    }

    return (

        <div >
            EDITAR TAREFA: {selectedTask.text}
            <FormGroup className='Edit'>
                <TextField
                    className='textField'
                    sx={{ input: { color: 'red' } }}
                    variant="filled"
                    color="seconadry"
                    margin="dense"
                    onChange={(e) => setText(e.target.value)}
                    label="Nome"
                    value={text}
                />

                <TextField
                    className='textField'
                    variant="outlined"
                    color="secondary"
                    margin="dense"
                    onChange={(e) => setDescription(e.target.value)}
                    label="Descrição"
                    value={description}
                />

                <TextField
                    className='textField'
                    variant="outlined"
                    color="secondary"
                    margin="dense"
                    onChange={(e) => setData(e.target.value)}
                    label="Data"
                    value={data}
                />

                <Button
                    onClick={returnToTaskList}
                    variant="contained"
                    className="editButton"
                >CONFIRMAR</Button>
                <Button
                    onClick={handleCancel}
                    variant="contained"
                    className="editButton"
                >CANCELAR</Button>
            </FormGroup>

        </div>

    );
};

export default EditTask;