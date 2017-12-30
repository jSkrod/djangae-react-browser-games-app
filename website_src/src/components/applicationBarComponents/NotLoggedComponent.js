import React, {Component} from "react";
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {loginClicked, registerClicked} from '../../actions/ApplicationBarActions';
import {push} from 'react-router-redux'


const styles = {
    button: {
        color: '#E8E9EB',
    }
};

@connect((store) => {
    return {
        userReducer: store.userReducer
    }
})
class NotLoggedComponent extends Component {
    constructor(props) {
        super(props);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
    }

    onLoginClick() {
        this.props.dispatch(loginClicked());
        this.props.dispatch(push('/login'));
    }

    onRegisterClick() {
        this.props.dispatch(registerClicked());
        this.props.dispatch(push('/register'));
    }

    render() {
        return (
            <div>
                {!this.props.userReducer.get('isLogged') && <Button onClick={this.onLoginClick} className={this.props.classes.button}>Login</Button>}
                {!this.props.userReducer.get('isLogged') && <Button onClick={this.onRegisterClick} className={this.props.classes.button}>Register</Button> }
            </div>
        );
    }
}


export default withStyles(styles)(NotLoggedComponent);