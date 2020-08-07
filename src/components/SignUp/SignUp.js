import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UserContext } from "../../firebase/UserContext";
import { auth, db } from "../../firebase/firebase"

class SignUp extends Component {

  static contextType = UserContext;
  state = {
    userDeatils: {
      email: "",
      password: ""
    },
  }

  getuserDeatils = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      userDeatils: {
        ...this.state.userDeatils,
        [name]: value
      }
    });
  }

  createUser = () => {
    const { email } = this.state.userDeatils;
    const { password } = this.state.userDeatils;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      const account = {
        userUID: cred.user.uid,
        tasks: []
      }
      db.collection("users").doc(cred.user.uid).set(account);
    }).catch(error => {
      alert(error.message);
    });
  }

  render() {

    return (
      <div>
        <Dialog open={this.props.clickOpen} onClose={this.props.clickClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To make your own personalized To-Do list, please SIGN UP.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              name="email"
              onChange={this.getuserDeatils}
              fullWidth
            />
            <TextField
              margin="dense"
              id="pass"
              label="Password"
              type="password"
              name="password"
              onChange={this.getuserDeatils}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { this.createUser(); this.props.clickClose(); }} color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SignUp