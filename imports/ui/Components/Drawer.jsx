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

const data = [
    {
        name: "Tarefas",
        icon: <HomeOutlined />,
    },
    { name: "Perfil", icon: <InboxOutlined /> },

];

function DrawerComponent() {
    const [open, setOpen] = useState(false);

    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)}>
            {data.map((item, index) => (
                <ListItem button key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
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