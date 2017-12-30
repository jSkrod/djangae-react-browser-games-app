import ApplicationBar from './ApplicationBar';
import {Component} from "react";
import React from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const styles = {
    button: {
        color: '#E8E9EB',
    }
}

@connect((store) => {
    return {
    }
})
class _EmbedApplicationBar extends Component {
    constructor (props, context) {
        super(props, context);

        this.renderSubElements = this.renderSubElements.bind(this);
    }

    gotoRanking () {
        this.props.dispatch(push('/ranking/' + this.props.gameName));
    }

    renderSubElements () {
        return (
            <div>
                <Button className={this.props.classes.button} onClick={this.gotoRanking.bind(this)}>{"Ranking"}</Button>
                { this.props.showFullscreenButton == true? <Button onClick={this.props.fullscreenCallback} className={this.props.classes.button}>{"Full screen"}</Button>: null}
            </div>
        );
    }

    render () {
        return (
            <ApplicationBar>
                {this.renderSubElements()}
            </ApplicationBar>
        );
    }
}

_EmbedApplicationBar.propTypes = {
    fullscreenCallback: PropTypes.func.isRequired,
    showFullscreenButton: PropTypes.bool.isRequired
};


export const EmbedApplicationBar = withStyles(styles)(_EmbedApplicationBar);