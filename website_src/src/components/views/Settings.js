import React from "react";
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import { connect } from 'react-redux';

import isLoggedDecorator from "../../decorators/loggedDecorator";
import Tabs, { Tab } from 'material-ui/Tabs';
import UserComponent from './SettingsComponents/UserComponent';
import DeveloperComponent from './SettingsComponents/DeveloperComponent';
import {developerSettingsChosen, userSettingsChosen} from "../../actions/SettingsActions";

const styleSheet = ({
    container: {
        boxShadow: 'none',
        paddingTop: 80,
    }
});
const chooseComponent = (state) => {
    switch(state){
        case 'developer':
            return <DeveloperComponent/>
        case 'user':
        default:
            return <UserComponent/>
    }
}
@isLoggedDecorator
@connect((store) => {
    const component = store.settingsReducer.get('settingsComponent');
    return {
        settingComponent: chooseComponent(component),
        tabState: component,
    }
})
class SettingsView extends React.Component {
    handleChange (ev, value) {
        if (value === 'user'){
            this.props.dispatch(userSettingsChosen());
        }
        else{
            this.props.dispatch(developerSettingsChosen());
        }
    }

    render () {
        return (
            <div>
                <Grid container spacing={0} justify="center" className={this.props.classes.container}>
                    <Grid item xs={12}>
                        <Tabs
                            value={this.props.tabState}
                            onChange={this.handleChange.bind(this)}
                            indicatorColor={"#FF715B"}
                            centered
                        >
                            <Tab value="user" label="User" />
                            <Tab value="developer" label="Developer" />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12}>
                        {this.props.settingComponent}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styleSheet)(SettingsView);