import React, { useState } from 'react';
import { TextField, Button } from "@material-ui/core";


export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText("");
  };

  return (
    <div>
      <TextField
        variant="outlined"
        onChange={(e) => setText(e.target.value)}
        label="type your task"
        value={text}
      />
      <Button
        size="large"
        //variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleSubmit}
        //disabled={text ? false : true}
      >
        Enviar 
      </Button>
    </div>
    
  );
};
