import React from "react";
import {Component} from "react";
import Grid from 'material-ui/Grid';
import { withStyles, } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { push } from 'react-router-redux';
import axios from 'axios';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { connect } from 'react-redux';

const style = ({
    container: {
        boxShadow: 'none',
        paddingTop: 80,
        paddingBottom: 100,
    }
});


@connect((store) => {
    return {
    }
})
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activatedAccount: false,
            error: false
        };

        this.gotoLogIn = this.gotoLogIn.bind(this);
        this.gotoContactUs = this.gotoContactUs.bind(this);

        let self = this;

        axios.get('/api/user/activate/' + this.props.match.params.key + '/')
        .then(function (data) {
            self.setState({
                activatedAccount: true
            });
        })
        .catch(function (data) {
            self.setState({
                error: true
            });
        })
    }

    gotoLogIn () {
        this.props.dispatch(push('/login'));
    }

    gotoContactUs () {
        this.props.dispatch(push('/contactus'));
    }

    render() {
        return (
                <div>
                    <Grid container spacing={0} justify="center" className={this.props.classes.container}>
                        <CircularProgress size={50} />
                    </Grid>
                    <Dialog open={this.state.activatedAccount} onRequestClose={this.gotoLogIn}>
                        <DialogTitle>{"Activation complete."}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Your account has been activated. Click below to skip to the log in view.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.gotoLogIn} color="primary">
                            Go to login
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.error} onRequestClose={this.gotoLogIn}>
                        <DialogTitle>{"Activation error."}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            During activation an error occurred. Your account might be activated earlier or there may be technical issue.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.gotoLogIn} color="primary">
                            Go to login
                            </Button>
                            <Button onClick={this.gotoLogIn} color="primary">
                            Contact us
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
        );
    }
}

export default withStyles(style)(Login);