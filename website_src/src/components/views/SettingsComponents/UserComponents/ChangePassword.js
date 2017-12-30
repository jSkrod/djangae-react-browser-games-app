import React from "react";
import {Component} from "react";
import {connect} from 'react-redux';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

import {
    differentPasswords,
    passwordsOk,
    shortPasswords,
} from '../../../../actions/RegisterActions';
import {changePassword} from "../../../../actions/SettingsActions";
import ConfirmationDialog from "./ConfirmationDialog";

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
    },
    // secondParagraph: {
    //     paddingTop: 20,
    //     color: red[500]
    // },
});

@connect((store) => {
    return {
        register: store.registerReducer
    }
})
class ChangePassword extends Component {
    state = {
        alert : false,
        old_password: "",
        new_password: "",
        repeatedPassword: ""
    };

    constructor(props) {
        super(props);
        this.changeClicked = this.changeClicked.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }


    handleDialogClose(accepted){
        if(accepted){
             this.props.dispatch(changePassword(this.state.old_password, this.state.new_password));
        }
        this.setState({
            alert:false
        });
    }

    handlePasswordChange(){
        this.setState({
            alert: true
    });

}
    changeClicked() {
        let error = false;

        //Check Passwords
        if (this.state.new_password.length < 7) {
            this.props.dispatch(shortPasswords());
            error = true;
        } else {
            this.props.dispatch(passwordsOk());
        }

        if (!error) {
            if (this.state.new_password === this.state.repeatedPassword) {
                this.props.dispatch(passwordsOk());
            } else {
                error = true;
                this.props.dispatch(differentPasswords());
            }
        }
        if (!error) {
            this.handlePasswordChange();
        }
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <Grid container className={classes.button}>
                    <Grid item xs={4}>
                        <TextField
                    label="Old Password"
                    fullWidthplaceholder="Old Password"

                    type="password"
                    onChange={event => this.setState({old_password: event.target.value})}
                    className={classes.singleButton}
                />
                <TextField
                    error={this.props.register.get('passwordError')}
                    helperText={this.props.register.get('passwordErrorMessage')}
                    label="New Password"
                    fullWidthplaceholder="New Password"

                    type="password"
                    onChange={event => this.setState({new_password: event.target.value})}
                    className={classes.singleButton}
                />
                <TextField
                    error={this.props.register.get('repeatPasswordError')}
                    helperText={this.props.register.get('repeatPasswordErrorMessage')}
                    label="Repeat password"
                    fullWidthplaceholder="Repeat password"

                    type="password"
                    onChange={event => this.setState({repeatedPassword: event.target.value})}
                    className={classes.singleButton}
                /></Grid>
                </Grid>
                <Grid container className={classes.button}justify="center">
                    <Grid item xs={6}>
                        <Button raised className={this.props.classes.btnRegister} onClick={this.changeClicked}>
                            Change
                        </Button>
                    </Grid>
                </Grid>
                <ConfirmationDialog option="password" open={this.state.alert} handleClose={this.handleDialogClose.bind(this)}/>
            </div>
        );
    }
}

ChangePassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangePassword);