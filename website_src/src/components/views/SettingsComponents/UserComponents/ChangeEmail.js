import React from "react";
import {Component} from "react";
import {connect} from 'react-redux';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import {
    emailError,
    emailOk,
} from '../../../../actions/RegisterActions';
import {changeEmail} from "../../../../actions/SettingsActions";
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
    }
});

@connect((store) => {
    return {
        register: store.registerReducer
    }
})
class ChangeEmail extends Component {
    state = {
        alert:false,
        email: ""
    };

    constructor(props) {
        super(props);
        this.changeClicked = this.changeClicked.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }


    static validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    handleDialogClose(accepted){
        if(accepted){
            this.props.dispatch(changeEmail(this.state.email))
        }
        this.setState({
            alert:false
        });

    }

    handleEmailChange() {
        this.setState({
            alert: true
        });
    }
    changeClicked() {
        // Check email
        if (!ChangeEmail.validateEmail(this.state.email)) {
            this.props.dispatch(emailError());
        } else {
            this.props.dispatch(emailOk());
        }
       this.handleEmailChange()
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <TextField
                    error={this.props.register.get('emailError')}
                    helperText={this.props.register.get('emailErrorMessage')}
                    label="Email"
                    fullWidth
                    placeholder="Email"
                    type="email"
                    onChange={event => this.setState({email: event.target.value})}
                    className={classes.singleButton}
                />
                <Grid container justify="center" className={classes.button}>
                    <Grid item xs={6}>
                        <Button raised className={this.props.classes.btnRegister} onClick={this.changeClicked}>
                            Change
                        </Button>
                    </Grid>
                </Grid>
                <ConfirmationDialog option="email" open={this.state.alert} handleClose={this.handleDialogClose.bind(this)}/>
            </div>
        );
    }
}

ChangeEmail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangeEmail);