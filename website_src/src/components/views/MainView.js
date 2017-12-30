import React from "react";

import {Component} from "react";
import {Grid,Divider} from "../../../node_modules/material-ui/index";
import Checkbox from 'material-ui/Checkbox';
import {withStyles} from 'material-ui/styles';
import GameList from './Game/GameList';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import {filterGames} from '../../actions/GamesActions';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      background: theme.palette.background.paper,
    },
    container: {
        boxShadow: 'none',
        paddingTop: 80,
        paddingBottom: 100
    },
    gridList: {
        width: 'auto',
      },
  });
class MainView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: [0],
        };
    }

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({
          checked: newChecked,
        });

        this.props.dispatch(filterGames(value));
      };
    
    render() {
            return (
                <div>
                    <Grid container spacing={24} justify="center" className={this.props.classes.container}>
                        <Grid item xs={2} >
                            <List>
                                <ListItem button disabled={true}>
                                    <ListItemText primary="Games"/>
                                </ListItem>
                                <Divider/>
                                {["All",'Action', "Logic", "Shooter", "Sports"].map(value => (
                                    <ListItem
                                    key={value}
                                    dense
                                    button
                                    onClick={this.handleToggle(value)}
                                    className={this.props.classes.listItem}
                                    >

                                    <ListItemText primary={value} />
                                    <Checkbox
                                        checked={this.state.checked.indexOf(value) !== -1}
                                        disableRipple
                                    />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={10} >
                            <GameList/>
                        </Grid>

                    </Grid>
    
                </div>
            );
    
        
        
    }
}

export default withStyles(styles)(MainView);