import React, { Fragment } from 'react';
import Login from './Login';
import "../../client/main.css";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import DrawerComponent from './Components/Drawer';

const App = () => {

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
  console.log("teste-app")
  return (

    <div className='app'>
      {user && ( //Renderiza se a condição for verdadeira
        <>
          <div className='Header'>
            <DrawerComponent />
            <button className="logout" onClick={submit}>Logout</button>
          </div>
          <Outlet />
        </>
      )}
      {!user && (
        <Login />
      )}
    </div>

  );
};

export default App;