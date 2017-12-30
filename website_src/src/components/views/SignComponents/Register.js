import React from "react";
import {Component} from "react";
import {connect} from 'react-redux';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';

import {
    registerUser,
    differentPasswords,
    passwordsOk,
    shortPasswords,
    emailError,
    emailOk,
    usernameOk,
    shortUsername,
    unmountComponent
} from '../../../actions/RegisterActions';

const styles = ({
    root: {
        flexGrow: 1,
        marginTop: 50,
    },
    paper: {
        padding: 16,
    },

    headline: {
        marginBottom: 20
    },

    singleButton: {
        marginTop: 10
    },

    button: {
        marginTop: 30
    },
    resetPassword: {
        marginTop: 30
    },
    btnRegister: {
        backgroundColor: '#ffba49',
        width: '100%',
    }
});

@connect((store) => {
    return {
        register: store.registerReducer
    }
})
class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        repeatedPassword: ""
    };

    constructor(props) {
        super(props);
        this.registerButtonClicked = this.registerButtonClicked.bind(this);
    }

    componentWillUnmount () {
        this.props.dispatch(unmountComponent());
    }

    static validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    registerButtonClicked() {
        let error = false;

        //Check Passwords
        if (this.state.password.length < 7) {
            this.props.dispatch(shortPasswords());
            error = true;
        } else {
            this.props.dispatch(passwordsOk());
        }

        if (!error) {
            if (this.state.password === this.state.repeatedPassword) {
                this.props.dispatch(passwordsOk());
            } else {
                error = true;
                this.props.dispatch(differentPasswords());
            }
        }

        // Check email
        if (!Register.validateEmail(this.state.email)) {
            error = true;
            this.props.dispatch(emailError());
        } else {
            this.props.dispatch(emailOk());
        }

        //Check username
        if (this.state.username.length < 5) {
            error = true;
            this.props.dispatch(shortUsername());
        } else {
            this.props.dispatch(usernameOk());
        }

        if (!error) {
            this.props.dispatch(registerUser(this.state.username, this.state.password, this.state.email));
        }
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <TextField
                    error={this.props.register.get('usernameError')}
                    helperText={this.props.register.get('usernameErrorMessage')}
                    label="Username"
                    placeholder="Username"
                    fullWidth
                    onChange={event => this.setState({username: event.target.value})}
                    className={classes.singleButton}
                />
                <TextField
                    error={this.props.register.get('emailError')}
                    helperText={this.props.register.get('emailErrorMessage')}
                    label="Email"
                    placeholder="Email"
                    fullWidth
                    type="email"
                    onChange={event => this.setState({email: event.target.value})}
                    className={classes.singleButton}
                />
                <TextField
                    error={this.props.register.get('passwordError')}
                    helperText={this.props.register.get('passwordErrorMessage')}
                    label="Password"
                    placeholder="Password"
                    fullWidth
                    type="password"
                    onChange={event => this.setState({password: event.target.value})}
                    className={classes.singleButton}
                />
                <TextField
                    error={this.props.register.get('repeatPasswordError')}
                    helperText={this.props.register.get('repeatPasswordErrorMessage')}
                    label="Repeat password"
                    placeholder="Repeat password"
                    fullWidth
                    type="password"
                    onChange={event => this.setState({repeatedPassword: event.target.value})}
                    className={classes.singleButton}
                />
                <Grid container className={classes.button}>
                    <Grid item xs={12}>
                        <Button raised className={this.props.classes.btnRegister} onClick={this.registerButtonClicked} disabled={this.props.register.get('whileRegister')}>
                            {this.props.register.get('registerButtonText')}
                        </Button>
                        <LinearProgress hidden={!this.props.register.get('whileRegister')}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);