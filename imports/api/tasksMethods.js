import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from './TasksCollection';

const date = new Date();

let currentDate = `${date.getFullYear()}-0${date.getMonth()}-${date.getDate()}`;


Meteor.methods({

  'tasks.insert'(text, publico, username) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }


    TasksCollection.insert({
      text,
      createdAt: currentDate,
      userId: this.userId,
      username,
      needEdit: false,
      isChecked: false,
      description: 'Type a description here',
      situacao: 10,
      publico
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    
    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked
      }
    });
  },

  'tasks.editClick'(taskId, needEdit) {
    check(taskId, String);
    check(needEdit, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.update(taskId, {
      $set: {
        needEdit
      }
    })
  },

  'tasks.updateTask'(taskId, updatedTask) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.update(taskId, {
      $set: updatedTask
  });
  }
});