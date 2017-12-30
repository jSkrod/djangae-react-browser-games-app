import React from "react";

import {Component} from "react";
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Popover from 'material-ui/Popover';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import Star from 'material-ui-icons/Star';
import Collapse from 'material-ui/transitions/Collapse';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { connect } from 'react-redux';
import {getComments, cancelFetchingComments, sendComment} from '../../../actions/CommentActions';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';


const styles = theme => ({
    card: {
        width: 520,
        maxHeight: 400
    },

    listCard: {
        width: "100%"
    },

    list: {
        maxHeight: 200,
        overflow: "auto"
    },

    sendButton: {
        marginLeft: "auto",
        marginRight: "0",
        float: "right"
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
    expandOpen: {
    transform: 'rotate(180deg)',
    }

  });

@connect((store) => {
    return {
        gamesReducer: store.gamesReducer,
        userReducer: store.userReducer
    }
})
class CommentsPopover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStars: 1,
            comment: '',
            expanded: false,
            canExpand: true
        };
    }

    onStarClick(index) {
        this.setState({
            selectedStars: index
        });
    }

    handleExpandClick() {
        this.setState({
            expanded: !(this.state.expanded)
        });
    }

    getCommentsList () {
        let comments = this.props.gamesReducer.get('comments');
        

/**
 *  game:"snakegame"
    rating:2
    text:"Fajna 2/10"
    user:"tester"
 */
        return (
            <List className={this.props.classes.list}>
                {comments.map((el, i) => {return (<ListItem key={i}>
                        <Card className={this.props.classes.listCard}>
                            <CardContent>
                                <Typography type="body1">
                                    {el.get('user')}
                                </Typography>
                                <Typography type="headline" component="h2">
                                    {el.get('rating') + '/10'}
                                </Typography>
                                <Typography type="body1">
                                    {el.get('text')}
                                </Typography>
                            </CardContent>
                        </Card>
                </ListItem>);})
                }
            </List>
        );
    }

    componentDidMount () {
        this.props.dispatch(getComments(this.props.gameName));
    }

    componentWillUnmount () {
        this.props.dispatch(cancelFetchingComments());
    }

    handleSendComment () {
        this.setState({
            canExpand: false,
            expanded: false
        });

        this.props.dispatch(sendComment(this.props.gameName, this.state.comment, this.state.selectedStars));
    }


    render() {
        let classes = this.props.classes;
        return (
            <div>
                <Popover
                    open={this.props.isOpen}
                    anchorEl={this.props.forElement}
                    onRequestClose={this.props.closeCallback}
                >
                <Card className={classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h2">
                            Comments:
                        </Typography>
                        {this.props.gamesReducer.get('isFetchingComments') ? <LinearProgress /> : this.getCommentsList()}
                    </CardContent>
                    <CardActions disableActionSpacing>
                        <div className={classes.flexGrow} />
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick.bind(this)}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                            disabled={!this.props.userReducer.get('isLogged')}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded}>
                    <CardContent>
                        <TextField
                        label="Comment:"
                        placeholder="Enter a comment"
                        multiline
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={event => this.setState({comment: event.target.value})}
                        />
                        {
                            [...Array(10)].map((e, i) => {
                                
                                return(
                                <IconButton key={i} onClick={this.onStarClick.bind(this, i + 1)}>
                                    {i >= this.state.selectedStars? <StarBorderIcon color="gray"/>: <Star color="gray"/>}
                                </IconButton>);
                            })
                        }
                        <Button raised color="primary" className={classes.sendButton} onClick={this.handleSendComment.bind(this)} disabled={!this.state.canExpand}>
                            Send comment
                        </Button>
                    </CardContent>
                    </Collapse>
                </Card>
                </Popover>
            </div>
        );
    }
}

export default withStyles(styles)(CommentsPopover);