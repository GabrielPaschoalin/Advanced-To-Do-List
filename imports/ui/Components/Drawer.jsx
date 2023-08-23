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
    InboxOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { generatePath, useNavigate } from 'react-router';
import { ListItemButton } from '@mui/material';

const data = [
    {
        name: "Tarefas",
        icon: <HomeOutlined />,
        link: '/tasks'
    },
    {
        name: "Perfil",
        icon: <InboxOutlined />,
        link: '/userProfile'

    },

];

function DrawerComponent({ user }) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)}>

            <ListItemButton key={0} onClick={() => navigate('/tasks')}>
                <ListItemIcon><HomeOutlined /></ListItemIcon>
                <ListItemText primary="Tarefas" />
            </ListItemButton>

            <ListItemButton key={1} onClick={() => navigate(generatePath("/userProfile/:id", { id: user._id }))}>
                <ListItemIcon><InboxOutlined /></ListItemIcon>
                <ListItemText primary="Perfil" />
            </ListItemButton>
            
        </div>
    );
    return (
        <div>
            <Button onClick={() => setOpen(true)}>Click me</Button>
            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
                {getList()}
            </Drawer>
        </div>
    );

}

export default DrawerComponent;