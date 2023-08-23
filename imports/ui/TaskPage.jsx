import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import Task from './Components/Task';
import { TaskForm } from './Components/TaskForm';

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

const toggleChecked = ({ _id, isChecked }) =>
    Meteor.call('tasks.setIsChecked', _id, !isChecked);

const editClick = ({ _id, needEdit }) => {
    Meteor.call('tasks.editClick', _id, !needEdit);
}

const TaskPage = () => {
    
    const tasks = useTracker(() =>
        TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
    );

    return (
        <div className='taskMain'>
            <TaskForm />
            <ul>

                {tasks.map(task => (
                    <Task
                        key={task._id}
                        task={task}
                        onCheckboxClick={toggleChecked}
                        onDeleteClick={deleteTask}
                        onEditClick={editClick}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskPage;