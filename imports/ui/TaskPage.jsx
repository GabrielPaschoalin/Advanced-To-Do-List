import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import Task from './Components/Task';
import { TaskForm } from './Components/TaskForm';
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

const toggleChecked = ({ _id, isChecked }) =>
    Meteor.call('tasks.setIsChecked', _id, !isChecked);

const editClick = ({ _id, needEdit }) => {
    Meteor.call('tasks.editClick', _id, !needEdit);
}

const TaskPage = () => {

    const [hideCompleted, setHideCompleted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const tasksQuery = hideCompleted
        ? { situacao: { $nin: [30] } }
        : {};

    const tasks = useTracker(() => {
        Meteor.subscribe('tasks');
        return TasksCollection.find(tasksQuery).fetch();
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(tasks.length / 4);

    // Calculate the tasks to display on the current page
    const indexOfLastTask = currentPage * 4;
    const indexOfFirstTask = indexOfLastTask - 4;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    useEffect(() => {
        // Ensure that the current page is within valid bounds
        if (currentPage < 1) {
            setCurrentPage(1);
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);


    return (
        <div className='taskMain'>
            <TaskForm />
            <div className="filter">
                <Button size="large" color="primary" variant="contained" onClick={() => setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? 'Ver Todas' : 'Esconder Completas'}
                </Button>
            </div>

            <ul>
                {currentTasks.map(task => (
                    <Task
                        key={task._id}
                        task={task}
                        onCheckboxClick={toggleChecked}
                        onDeleteClick={deleteTask}
                        onEditClick={editClick}
                    />
                ))}
            </ul>

            <div className="pagination">
                <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    <ArrowBackIosIcon/>
                </Button>
                <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    <ArrowForwardIosIcon/>
                </Button>
            </div>
        </div>
    );
};

export default TaskPage;