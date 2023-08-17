import React, { Fragment } from 'react';
import TaskPage from './TaskPage';
import Login from './Login';
import "../../client/main.css";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useNavigate, Outlet } from 'react-router-dom';

export const App = () => {

  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const submit = () => {
    Meteor.logout(function (error) {
      if (!error) {
        navigate("/login");
      } else {
        console.log("ERROR: " + error.reason);
      }
    });

  };

  return (

    <div className='app'>
      {user ? (
        <Fragment>
          <button className="logout" onClick={submit}>Logout</button>
          <Outlet />
        </Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
};
