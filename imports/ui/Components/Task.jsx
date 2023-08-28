import React, { useState, useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router';
import FormGroup from '@mui/material/FormGroup';
import { Button, Checkbox } from "@material-ui/core";
import { useTracker } from 'meteor/react-meteor-data';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Meteor } from 'meteor/meteor';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick }) => {

    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();

    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false); // Disable initial render after the first render
            return;
        }

        if (task.needEdit) {
            navigate(generatePath("/editTask/:id", { id: task._id }));
        }
    }, [task.needEdit]);

    const clickOnEdit = () => {
        if (user._id === task.userId) {
            onEditClick(task);
        } else {
            console.log("SEM PERMISSÃO");
        }
    };
    const clickOnDelete = () => {
        if (user._id === task.userId) {
            onDeleteClick(task);
        } else {
            console.log("SEM PERMISSÃO");
        }
    };

    const [situacao, setSituacao] = useState(task.situacao);

    const onSituacaoChange = (event) => {
        if (user._id === task.userId) {
            const newSituacao = event.target.value;
            setSituacao(newSituacao);

            const updatedTask = { ...task, situacao: newSituacao };
            Meteor.call('tasks.updateTask', task._id, updatedTask);
        }else {
            console.log("SEM PERMISSÃO");
        }
    };

    return (
        <div>
            {!task.needEdit && (
                <FormGroup className='task'>
                    <div className='task-left'>
                        <Checkbox
                            checked={!!task.isChecked}
                            onClick={() => onCheckboxClick(task)}

                        />
                        {task.text}

                    </div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Situação</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={situacao}
                            label="Estado"
                            onChange={onSituacaoChange}
                        >
                            {situacao === 10 && (

                                [<MenuItem key={1} value={10}>Cadastrada</MenuItem>,
                                <MenuItem key={2} value={20}>Em Andamento</MenuItem>]

                            )}
                            {situacao === 20 && (
                                [<MenuItem key={1} value={10}>Cadastrada</MenuItem>,
                                <MenuItem key={2} value={20}>Em Andamento</MenuItem>,
                                <MenuItem key={3} value={30}>Concluída</MenuItem>]

                            )}
                            {situacao === 30 && (

                                [<MenuItem key={1} value={10}>Cadastrada</MenuItem>,
                                <MenuItem key={2} value={20}>Em Andamento</MenuItem>,
                                <MenuItem key={3} value={30}>Concluída</MenuItem>]


                            )}
                        </Select>
                    </FormControl>
                    <Button
                        onClick={() => clickOnEdit()}
                        variant="contained"
                        className="listButtons"
                    >EDIT</Button>
                    <Button
                        onClick={() => clickOnDelete()}
                        color="secondary"
                        variant="contained"
                        className="listButtons"
                    >
                        DELETE
                    </Button>
                </FormGroup>
            )}

        </div>
    );
};

export default Task;