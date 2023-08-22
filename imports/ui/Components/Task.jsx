import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

import { generatePath, useNavigate } from 'react-router';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Checkbox } from "@material-ui/core";
import { pink } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (task.needEdit) {
            navigate(generatePath("/editTask/:id", { id: task._id }));
        }
    }, [task.needEdit, task._id, navigate]);

    return (
        <div>
            {!task.needEdit ? (
                <FormGroup className='task'>
                    <div className='task-left'>
                    <Checkbox
                        checked={!!task.isChecked}
                        onClick={() => onCheckboxClick(task)}

                    />
                    {task.text}
                    </div>
                    <Button
                        onClick={() => onEditClick(task)}
                        variant="contained"
                        className="listButtons"
                    >EDIT</Button>
                    <Button
                        onClick={() => onDeleteClick(task)}
                        color="secondary"
                        variant="contained"
                        className="listButtons"
                    >
                        DELETE
                    </Button>
                </FormGroup>
            ) : null}
            </div>
    );
};

export default Task;