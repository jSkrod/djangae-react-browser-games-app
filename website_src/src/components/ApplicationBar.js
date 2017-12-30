import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Logo from './Logo';
import {Component} from "react";
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import NotLoggedComponent from "./applicationBarComponents/NotLoggedComponent";
import LoggedComponent from "./applicationBarComponents/LoggedComponent";

const styleSheet = ({
    root: {
        marginTop: 0,
        width: '100%',
    },
    flex: {
        flex: 1,
        color: '#FF715B',
    },
    button: {
        color: '#E8E9EB',
    }
});


@connect((store) => {
    return {
        userReducer: store.userReducer
    }
})
class ButtonAppBar extends Component {
    constructor(props) {
        super(props);
        this.handleOpenPopover = this.handleOpenPopover.bind(this);
        this.handleRequestClosePopover = this.handleRequestClosePopover.bind(this);
        this.handleHome = this.handleHome.bind(this);
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
    handleHome(){
        this.props.dispatch(push('/'))
    }
    handleOpenPopover () {
        this.setState({
            open: true,
            anchorEl: findDOMNode(this.button)
        });
    }

    renderSubElements () {
        return (
            <div>
                <NotLoggedComponent/>
                <LoggedComponent/>
            </div>
        );
    }

    render() {
        return (
                <AppBar style={{backgroundColor: '#323031'}}
                >
                    <Toolbar>
                        <Logo handleHome={this.handleHome}/>
                        <Typography type="headline" className={this.props.classes.flex}>
                            GameHub
                        </Typography>
                        {this.props.children}
                        {this.renderSubElements()}
                    </Toolbar>
                </AppBar>
        );
    }
}


ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styleSheet)(ButtonAppBar);