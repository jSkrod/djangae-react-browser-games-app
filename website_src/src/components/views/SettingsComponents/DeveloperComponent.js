import React from "react";
import {withStyles} from 'material-ui/styles';
import { connect } from 'react-redux';
import List, {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
  } from 'material-ui/List';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import { red } from 'material-ui/colors';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import isLoggedDecorator from "../../../decorators/loggedDecorator";

import {activateDeveloperMode} from "../../../actions/SettingsActions";
import Games from "./DeveloperComponents/Games";

const styleSheet = ({
    container: {
        boxShadow: 'none',
    },
    secondParagraph: {
        paddingTop: 20,
        color: red[500]
    },
    dialogContent: {
        paddingBottom: 0
    }
});
const chooseOptionsComponents = (isDev) =>{
    if(isDev)  {
        return <Games/>;
    }
    return null;
};

@isLoggedDecorator
@connect((store) => {
    return {
        userReducer: store.userReducer,
        optionsComponents:  chooseOptionsComponents(store.userReducer.get('isDeveloper'))
    }
})
class DeveloperComponent extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            alertIsOpened: false
        }
    }

    handleChangeDeveloperMode () {
        if (!this.props.userReducer.get('isDeveloper')) {
            this.setState({
                alertIsOpened: true
            })
        }
    }

    handleRequestCloseDialog (accepted) {
        if (accepted) {
            this.props.dispatch(activateDeveloperMode());
        }

        this.setState({
            alertIsOpened: false
        });
    }

    render () {
        return (
            <div>
                <Grid container spacing={0} className={this.props.classes.container}>
                    <Grid item xs={6} lg={2}>
                        <List>
                            <ListItem>
                                <ListItemText primary="Developer mode" />
                                <ListItemSecondaryAction>
                                <Switch
                                    onClick={this.handleChangeDeveloperMode.bind(this)}
                                    checked={this.props.userReducer.get('isDeveloper')}
                                />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                {this.props.optionsComponents}
                <Dialog open={this.state.alertIsOpened} onRequestClose={this.handleRequestCloseDialog.bind(this, false)}>
                    <DialogTitle>{"Set account as developer?"}</DialogTitle>
                    <DialogContent className={this.props.classes.dialogContent}>
                        <DialogContentText>
                            Are you sure that you want to set this account as developer.
                        </DialogContentText>
                        <DialogContentText className={this.props.classes.secondParagraph}>
                            You won't be able to revert this change!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestCloseDialog.bind(this, false)} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleRequestCloseDialog.bind(this, true)} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>               
            </div>
        )
    }
}

export default withStyles(styleSheet)(DeveloperComponent);