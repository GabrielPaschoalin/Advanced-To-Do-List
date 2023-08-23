import React, { Children } from 'react';
import { Meteor } from 'meteor/meteor';
import './main.css'

import Login from '../imports/ui/Login';
import Cadastro from '../imports/ui/Cadastro';
import TaskPage from '../imports/ui/TaskPage';
import Welcome from '../imports/ui/Welcome';
import EditTask from '../imports/ui/EditTask';

import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../imports/ui/App';
import UserProfile from '../imports/ui/UserProfile'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/tasks",
        element: <TaskPage />
      },
      {
        path: "/welcome",
        element: <Welcome />
      },
      {
        path: "/editTask/:id",
        element: <EditTask />
      },
      {
        path: "/userProfile/:id",
        element: <UserProfile />
      }
    ]
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/login",
    element: <Login />
  },

]);

Meteor.startup(() => {

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

  // <Router>
  //   <Routes>
  //     <Route path='/' element={<App />} />
  //     <Route path='/login' element={<Login />} />
  //     <Route path='/cadastro' element={<Cadastro />} />
  //     <Route path='/tasks' element={<TaskPage/>} />

  //   </Routes>
  // </Router>

});
