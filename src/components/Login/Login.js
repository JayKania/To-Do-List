import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { auth } from "../../firebase/firebase";

class Login extends Component {

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

    handleLogin = () => {
        const { email } = this.state.userDeatils;
        const { password } = this.state.userDeatils;
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            console.log(error.message);
        })
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.clickOpen} onClose={this.props.clickClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Log In</DialogTitle>
                    <DialogContent>
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
                        <Button onClick={() => { this.handleLogin(); this.props.clickClose() }} color="primary">
                            Log in
                  </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Login;