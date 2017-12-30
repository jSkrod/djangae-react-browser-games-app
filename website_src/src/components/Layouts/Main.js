import React, {Component} from "react";
import { connect } from 'react-redux';
import ApplicationBar from '../ApplicationBar';
import Grid from 'material-ui/Grid';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import MainView from '../views/MainView';
import SignView from '../views/Sign';
import ActivationView from '../views/Activation/Activate';
import SettingsView from '../views/Settings';
import ReuploadGame from '../views/SettingsComponents/DeveloperComponents/ReuploadGame';
import {Switch, Route} from 'react-router';
import Ranking from '../views/Game/Ranking';

const styles = {
    root: {
        padding: 0
    },
    element: {
        paddingTop: 150
    }
};

@connect((store) => { return {
}})
class Layout extends Component {
    render() {
        return (
            <Grid container spacing={0} className={this.props.classes.root} >
                <ApplicationBar/>
                <Grid item xs={12}>
                    <Switch>
                        <Route exact path="/" component={MainView}/>
                        <Route path="/login" component={() => (<SignView signType="login" />) }/>
                        <Route path="/register" component={() => (<SignView signType="register" />) } />
                        <Route path="/settings" component={() => (<SettingsView />)}/>
                        <Route path="/reupload/:gameName" component={ReuploadGame}/>
                        <Route path="/activate/:key([-:\w]+)" component={ActivationView} />
                        <Route path="/ranking/:gameName" component={Ranking}/>
                    </Switch>
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)((withRouter(Layout)))