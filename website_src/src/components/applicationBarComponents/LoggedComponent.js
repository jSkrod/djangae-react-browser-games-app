import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import {Component} from "react";
import {push} from "react-router-redux";

import {connect} from 'react-redux';
import Popover from 'material-ui/Popover';
import {logout} from "../../actions/LogoutActions";

const styleSheet = ({
    button: {
        color: '#E8E9EB',
    }
});


@connect((store) => {
    return {
        userReducer: store.userReducer
    }
})
class LoggedComponent extends Component {
    constructor(props) {
        super(props);
        this.handleOpenPopover = this.handleOpenPopover.bind(this);
        this.handleRequestClosePopover = this.handleRequestClosePopover.bind(this);
        this.handleSettingsButtonClick = this.handleSettingsButtonClick.bind(this);
        this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
        this.state = {
            open: false,
            anchorEl: null
        };
    }

    button = null;

    handleRequestClosePopover() {
        this.setState({
            open: false
        })
    }

    handleOpenPopover () {
        this.setState({
            open: true,
            anchorEl: findDOMNode(this.button)
        });
    }

    handleSettingsButtonClick () {
        this.handleRequestClosePopover();
        this.props.dispatch(push('/settings'));
    }
    handleLogoutButtonClick(){
        this.props.dispatch(logout());
        this.handleRequestClosePopover();
        this.props.dispatch(push('/'));
    }
    render() {
        let nameButtonComponent = null;
        if (this.props.userReducer.get('isLogged')) {
            let refFunction = node => {
                this.button = node;
            }
            nameButtonComponent = (
                <Button onClick={this.handleOpenPopover} className={this.props.classes.button} ref={refFunction}>
                    {this.props.userReducer.get('username')}
                </Button>
            );
        }

        return (
            <div>
                {nameButtonComponent}
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.handleRequestClosePopover.bind(this)}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <List>
                        <ListItem button onClick={this.handleSettingsButtonClick}>
                            <ListItemText primary="Settings"/>
                        </ListItem>
                        <ListItem button onClick={this.handleLogoutButtonClick}>
                            <ListItemText primary="Logout"/>
                        </ListItem>
                    </List>
                </Popover>
            </div>
        );
    }
}


LoggedComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(LoggedComponent);