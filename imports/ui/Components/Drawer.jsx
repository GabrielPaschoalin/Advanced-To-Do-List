import React from 'react';
import {
    Drawer,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
} from "@material-ui/core";
import {
    HomeOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { generatePath, useNavigate } from 'react-router';
import { ListItemButton } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import TaskIcon from '@mui/icons-material/Task';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function DrawerComponent({ user }) {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (condition) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setOpen(condition);
      };
        

    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)}>

            <ListItemButton key={0} onClick={() => navigate('/welcome')}>
                <ListItemIcon><HomeOutlined /></ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton key={1} onClick={() => navigate('/tasks')}>
                <ListItemIcon><TaskIcon /></ListItemIcon>
                <ListItemText primary="Tarefas" />
            </ListItemButton>

            <ListItemButton key={2} onClick={() => navigate(generatePath("/userProfile/:id", { id: user._id }))}>
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Perfil" />
            </ListItemButton>


        </div>
    );
    return (
        <div>
            <ListItemIcon onClick={toggleDrawer(true)}><DehazeIcon /></ListItemIcon>
            <Drawer open={open} anchor={"left"} onClose={toggleDrawer(false)}>
                {getList()}
            </Drawer>
        </div>
    );

}

export default DrawerComponent;