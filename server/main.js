import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/userMethods';
import '/imports/api/tasksPublications';



const insertTask = taskText => TasksCollection.insert({ text: taskText });



Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
    ].forEach(insertTask)
  }
});