import React, { useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'; // Corrected import

export const TaskForm = () => {
  const [text, setText] = useState("");
  const [publico, setPublico] = useState(10);

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text, publico);

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

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Privado/Público</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={publico}
          label="Privado/Público"
          onChange={(event) => setPublico(event.target.value)}
        >
          <MenuItem value={true}>Público</MenuItem>
          <MenuItem value={false}>Privado</MenuItem>
        </Select>
      </FormControl>

      <Button size="large" color="primary" variant="contained" onClick={handleSubmit}>Enviar</Button>
    </div>
  );
};
