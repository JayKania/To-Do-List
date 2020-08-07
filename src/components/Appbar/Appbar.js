import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import { UserContext } from "../../firebase/UserContext";
import { auth } from "../../firebase/firebase"


export default class ButtonAppBar extends Component {

    static contextType = UserContext;
    styles = {
        root: {
            display: "flex"
        },
        title: {
            flexGrow: 1,
        },
    };

    state = {
        login: false,
        signUp: false,
    }

    // handle Log in
    handleLoginOpen = () => {
        this.setState({ login: true });
    };
    handleLoginClose = () => {
        this.setState({ login: false });
    };

    // handle Sign Up
    handleSignUpOpen = () => {
        this.setState({ signUp: true });
    }
    handleSignUpClose = () => {
        this.setState({ signUp: false });
    }

    // handle Log out
    handleLogOut = () => {
        auth.signOut().then(() => {
            alert("User Logged Out");
        })
    }


    render() {
        let html = null;
        if (this.context.userUID) {
             html = <Button color="inherit" onClick={this.handleLogOut} >Log Out</Button>
        } else {
            html = <Fragment>
                <Button color="inherit" onClick={this.handleSignUpOpen} >Sign Up</Button>
                <Button color="inherit" onClick={this.handleLoginOpen} >Log in</Button>
            </Fragment>
        }
        return (
            <div style={this.styles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={this.styles.title}>
                            To Do List
                        </Typography>
                        {html}
                    </Toolbar>
                </AppBar>
                <SignUp clickOpen={this.state.signUp} clickClose={this.handleSignUpClose} />
                <Login clickOpen={this.state.login} clickClose={this.handleLoginClose} />
            </div>
        );
    }
}
