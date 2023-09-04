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

    const user = useTracker(() => Meteor.user());

    const [hideCompleted, setHideCompleted] = useState(false);
    const [hideOthers, setHideOthers] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // const completedFilter = hideCompleted
    //     ? { situacao: { $nin: [30] } }
    //     : {};

    // const publicFilter = hideOthers
    //     ? { isPublic: true, userId: user._id }
    //     : {};

    const filterTask = () => {
        if (hideOthers && hideCompleted) {
            return {
                situacao: { $nin: [30] },
                userId: user._id
            };
        } else if (hideOthers && !hideCompleted) {
            return { userId: user._id };
        } else if (!hideOthers && hideCompleted) {
            return { situacao: { $nin: [30] } };
        } else {
            return {};
        }
    }

    const tasks = useTracker(() => {
        Meteor.subscribe('tasks');
        return TasksCollection.find(filterTask()).fetch();
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
                <Button size="small" color="primary" variant="contained" onClick={() => setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? 'Mostrar Concluidas' : 'Esconder Concluidas'}
                </Button>
                <Button size="small" color="primary" variant="contained" onClick={() => setHideOthers(!hideOthers)}>
                    {hideOthers ? 'Mostrar outros Usuários' : 'Esconder outros Usuários'}
                </Button>
            </div>
            

            <ul>
                {(tasks.length > 0) ? currentTasks.map(task => (
                    <Task
                        key={task._id}
                        task={task}
                        onCheckboxClick={toggleChecked}
                        onDeleteClick={deleteTask}
                        onEditClick={editClick}
                    />
                )) : (
                    <h2>
                        Nenhuma tarefa com essas condições
                    </h2>
                )}
            </ul>

            <div className="pagination">

                {(tasks.length > 0) && (
                    <>
                        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            <ArrowBackIosIcon />
                        </Button>
                        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            <ArrowForwardIosIcon />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskPage;