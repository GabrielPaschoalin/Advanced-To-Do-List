import React, { useState, useEffect } from 'react';

import { generatePath, useNavigate } from 'react-router';
import FormGroup from '@mui/material/FormGroup';
import { Button, Checkbox } from "@material-ui/core";
import Popup from '../Components/Popup'
import { useTracker } from 'meteor/react-meteor-data';


const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick }) => {

    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

    useEffect(() => {
        if (task.needEdit) {
            navigate(generatePath("/editTask/:id", { id: task._id }));
        }
    }, [task.needEdit, task._id, navigate]);

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


    return (
        <div>
            {!task.needEdit ? (
                <FormGroup className='task'>
                    <div className='task-left'>
                        <Checkbox
                            checked={!!task.isChecked}
                            onClick={() => onCheckboxClick(task)}

                        />
                        {task.text}({task.userId})

                    </div>
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
            ) : null}
            
        </div>
    );
};

export default Task;