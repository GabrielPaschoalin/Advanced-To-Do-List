import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import { Button } from '@mui/base';
import { useNavigate } from 'react-router';

export default function Welcome() {

  const navigate = useNavigate('');

  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  let cadastro = 0;
  let andamento = 0;
  let concluido = 0;

  tasks.forEach(task => {
    if (task.situacao == 10) {
      cadastro++;
    } else if (task.situacao == 20) {
      andamento++;
    } else {
      concluido++
    }
  });

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Total de Tarefas
          </Typography>
          <Typography variant="body2">
            {tasks.length}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Total de Tarefas Cadastradas
          </Typography>
          <Typography variant="body2">
            {cadastro}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Total de Tarefas em Andamento
          </Typography>
          <Typography variant="body2">
            {andamento}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Total de Tarefas Concluídas
          </Typography>
          <Typography variant="body2">
            {concluido}
          </Typography>
        </CardContent>
      </Card>
      <Button
        onClick={() => {navigate('/tasks')}}
        variant="contained"
        className="listButtons"
      >VER TAREFAS</Button>
    </>
  );
}