import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { generatePath, useNavigate } from 'react-router';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Checkbox } from "@material-ui/core";
import { pink } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick }) => {

    const navigate = useNavigate();
    return (
        <div>
            {!task.needEdit ? (
                <FormGroup className='task'>
                    <Checkbox
                        checked={!!task.isChecked}
                        onClick={() => onCheckboxClick(task)}
                    />
                    {task.text}
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
            ) : (
                <div>
                    {navigate(generatePath("/editTask/:id", { id: task._id }))}
                </div>
            )}
        </div>
    );
};

export default Task;