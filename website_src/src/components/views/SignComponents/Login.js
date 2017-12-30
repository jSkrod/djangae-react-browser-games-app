import React from "react";
import {Component} from "react";
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';

import { withStyles, } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import {
    loginUser, 
    loginIsNotValid, 
    passwordIsNotValid,
    passwordIsValid,
    loginIsValid} from "../../../actions/LoginActions";


const style = ({
    btnLogin: {
        backgroundColor: '#ffba49',
        width: "100%"
    },
    btnForgot: {
        height:'48px',
    },
    secondGrid: {
        marginTop: "2px"
    },
    textElement: {
        marginTop: "10px"
    }

})

@connect((store) => { return {
    login: store.loginReducer
}})
class Login extends Component {
    constructor(props) {
        super(props);
        this.loginButtonClicked = this.loginButtonClicked.bind(this);
        this.handleChangeRememberMe = this.handleChangeRememberMe.bind(this);
        
        this.state = {
            username: "",
            password: "",
            rememberMe: false
        };
    }

    handleChangeRememberMe(event) {
        this.setState({ rememberMe: event.target.checked });
    }

    loginButtonClicked(){
        let isError = false;

        if (this.state.username.length === 0) {
            this.props.dispatch(loginIsNotValid());
            isError = true;
        } else {
            this.props.dispatch(loginIsValid());
        }

        if (this.state.password.length === 0) {
            this.props.dispatch(passwordIsNotValid());
            isError = true;
        } else {
            this.props.dispatch(passwordIsValid());
        }

        if (!isError) {
            this.props.dispatch(loginUser(this.state.username, this.state.password, this.state.rememberMe));
        }
    }

    render() {
        return (
                <div>
                    <TextField
                        error={this.props.login.get('usernameError')}
                        helperText={this.props.login.get('usernameErrorMessage')}
                        onChange={event => this.setState({username: event.target.value})}
                        label="Username"
                        placeholder="Username"
                        fullWidth
                        className={this.props.classes.textElement}
                    />
                    <TextField
                        error={this.props.login.get('passwordError')}
                        helperText={this.props.login.get('passwordErrorMessage')}
                        onChange={event => this.setState({password: event.target.value})}
                        label="Password"
                        placeholder="Password"
                        fullWidth
                        type="password"
                        className={this.props.classes.textElement}
                    />
                    <Grid container className={this.props.classes.secondGrid} >
                        <Grid item xs={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.rememberMe}
                                        onChange={this.handleChangeRememberMe}
                                    />
                                }
                                label="Remember me"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={this.props.classes.btnForgot}>
                                Reset password
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button raised className={this.props.classes.btnLogin} onClick={this.loginButtonClicked} disabled={this.props.login.get('whileLogging')}>
                                {this.props.login.get('loginButtonText')}
                            </Button>
                            <LinearProgress hidden={!this.props.login.get('whileLogging')}/>
                        </Grid>
                    </Grid>

                </div>
        );
    }
}

export default withStyles(style)(Login);