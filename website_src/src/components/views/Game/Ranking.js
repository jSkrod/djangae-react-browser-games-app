import React from "react";

import {Component} from "react";
import {withStyles} from 'material-ui/styles';
import { connect } from 'react-redux';
import {getRanking, cancelGettingRanking} from '../../../actions/RankingActions';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { push } from 'react-router-redux';
import Button from 'material-ui/Button';


const styles = theme => ({
    container: {
        paddingTop: 88
    },
    paper: {
        width: "100%"
    },
    table: {
        width: "100%"
    }
});

@connect((store) => {
    return {
        gamesReducer: store.gamesReducer,
        userReducer: store.userReducer
    }
})
class Ranking extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount () {
        this.props.dispatch(getRanking(this.props.match.params.gameName));
    }

    componentWillUnmount () {
        this.props.dispatch(cancelGettingRanking());
    }

    gotoGame () {
        this.props.dispatch(push('/embed/' + this.props.match.params.gameName));
    }

    getRankingElement () {
        let classes = this.props.classes;
        let rankings = this.props.gamesReducer.get('ranking');
        return (
            <Paper className={this.props.classes.paper}>
                <Button onClick={this.gotoGame.bind(this)} className={this.props.classes.paper}>Return to game</Button>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell numeric>Score</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {rankings.map((el, i) => {return (
                            <TableRow key={i}>
                                <TableCell>{el.get('user')}</TableCell>
                                <TableCell numeric>{el.get('value')}</TableCell>
                            </TableRow>
                        );})}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    render() {
        let classes = this.props.classes;
        return (
            <div>
                
                <Grid container className={classes.container} alignItems={"center"} justify={"center"} direction={"row"} alignContent={"center"}>
                    <Grid item xs={this.props.gamesReducer.get('isFetchingRanking') ? 1 : 6}>
                        {this.props.gamesReducer.get('isFetchingRanking') ? <CircularProgress /> : this.getRankingElement()}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Ranking);