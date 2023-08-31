import React, { Fragment } from 'react';
import Login from './Login';
import "../../client/main.css";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import DrawerComponent from './Components/Drawer';
import { Button } from "@material-ui/core";

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
  return (

    <div className='app'>
      {user && ( //Renderiza se a condição for verdadeira
        <>
          <div className='Header'>
            <div className='DrawerPosition'>
              <DrawerComponent user={user} />
            </div>
            <div className='logoutPosition'>
              <div className='logoutContainer'>
                <div className='ola'>
                  Olá, {user.username}
                </div>

                <Button
                  onClick={submit}
                  color="secondary"
                  variant="contained"
                >
                  LOGOUT
                </Button>
              </div>
            </div>
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