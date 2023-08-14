import React from 'react';
import Tasks from './Tasks';
import Login from './Login';
import "../../client/main.css";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const App = () => {

  const user = useTracker(() => Meteor.user());

  return (  
    <div className='app'>
      {user ? <Tasks/> : <Login/>}    
    </div>
  );
};
