import React, { useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'; // Corrected import
import { useTracker } from 'meteor/react-meteor-data';

export const TaskForm = () => {
  const [text, setText] = useState("");
  const [publico, setPublico] = useState(true);

  const user = useTracker(() => Meteor.user());

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text, publico, user.username);

    setText("");
  };

  return (
    <div className='task-form-main'>
      <div className='task-form'>
        <div className='type-task-form'>
          <TextField
            variant="outlined"
            onChange={(e) => setText(e.target.value)}
            label="type your task"
            fullWidth
            value={text}
          />
        </div>

        <FormControl >
          <InputLabel id="demo-simple-select-label">Restrição</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={publico}
            label="Restrição"
            onChange={(event) => setPublico(event.target.value)}
          >
            <MenuItem value={true}>Público</MenuItem>
            <MenuItem value={false}>Privado</MenuItem>
          </Select>
        </FormControl>

        <Button size="large" color="primary" variant="contained" onClick={handleSubmit}>Enviar</Button>
      </div>
    </div>
  );
};