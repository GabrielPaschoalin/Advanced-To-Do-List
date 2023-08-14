import React from 'react';
import { Meteor } from 'meteor/meteor';
import "../../client/main.css";
import { useNavigate } from 'react-router-dom';


const Tasks = () => {
  
    const navigate = useNavigate();

    const submit = () => {
        Meteor.logout(function (error) {
            if (!error) {
                navigate("/login");
            }else{
                console.log("ERROR: " + error.reason);
            }
        });
        
    };

    return (
        <div className='app'>
            <button className="logout" onClick={submit}>Logout</button>
        </div>
    );
};

export default Tasks;