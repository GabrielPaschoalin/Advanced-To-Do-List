import React, { Children } from 'react';
import { Meteor } from 'meteor/meteor';
import './main.css'

import Login from '../imports/ui/Login';
import Cadastro from '../imports/ui/Cadastro';
import TaskPage from '../imports/ui/TaskPage';
import Welcome from '../imports/ui/Welcome';
import EditTask from '../imports/ui/EditTask';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from '../imports/ui/App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/cadastro",
        element: <Cadastro />
      },
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
      }
    ]
  }
]);

Meteor.startup(() => {

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

});
