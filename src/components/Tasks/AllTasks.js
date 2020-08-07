import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { db } from "../../firebase/firebase";
import { UserContext } from "../../firebase/UserContext";


class AllTasks extends Component {

  static contextType = UserContext;

  styles = {
    root: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
      flexDirection: "column"
    },
    card: {
      width: 345,
      margin: "30px",
    },
    media: {
      height: 140,
    },
    taskButton: {
      margin: "30px",
      height: "50px",
      width: "150px"
    }
  };

  state = {
    taskOpen: false,
    tasks: null,
    newTask: {
      title: "",
      details: ""
    },
    user: null
  };

  handleTaskOpen = () => {
    this.setState({ taskOpen: true });
  }

  handleTaskClose = () => {
    this.setState({ taskOpen: false });
  }

  addTask = () => {
    db.collection("users").doc(this.context.userUID).set({
      userUID: this.context.userUID,
      tasks: [
        ...this.context.tasks,
        {
          title: this.state.newTask.title,
          details: this.state.newTask.details,
        }
      ]
    }).then(this.handleTaskClose());
  }

  getNewTask = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      newTask: {
        ...this.state.newTask,
        [name]: value
      }
    });
  }

  clearTask = (id) => {
    db.collection("tasks").doc(id).delete();
  }

  render() {
    let tasksList
    let pleaseLogin = <h1>Please Login/SignUp To View Tasks</h1>;
    let newButton = null;
    if (this.context.userUID) {
      // console.log(this.context.tasks);
      pleaseLogin = null
      newButton = <Button variant="contained" color="primary" style={this.styles.taskButton} onClick={this.handleTaskOpen}>Add Task</Button>
      if (this.context.tasks) {
        tasksList = this.context.tasks.map((task, index) => {
          return (
            <Card style={this.styles.card} key={index}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {task.details}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => { this.clearTask(task.id) }}>
                  Clear Task
                  </Button>
              </CardActions>
            </Card>
          );
        })
      }
    }
    const dialog = <Dialog open={this.state.taskOpen} onClose={this.handleTaskClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter A New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="task-title"
          label="Task Title"
          type="text"
          fullWidth
          name="title"
          onChange={this.getNewTask}
        />
        <TextField
          margin="dense"
          id="task-details"
          label="Task Details"
          type="text"
          multiline
          rows={3}
          fullWidth
          name="details"
          onChange={this.getNewTask}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.addTask} color="primary">
          Submit
      </Button>
      </DialogActions>
    </Dialog>
    return (
      <div style={this.styles.root}>
        {tasksList}
        {pleaseLogin}
        {newButton}
        {dialog}
      </div>
    );
  }
}

export default AllTasks;