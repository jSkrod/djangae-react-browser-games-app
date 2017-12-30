import React from "react";
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui/Tabs';
import Login from "./SignComponents/Login";
import Register from "./SignComponents/Register";
import RegisteredPopup from "./SignComponents/RegisteredPopup";
import Typography from 'material-ui/Typography';
import isNotLoggedDecorator from "../../decorators/isNotLoggedDecorator";
import { push } from 'react-router-redux';
const styleSheet = ({
    container: {
        boxShadow: 'none',
        paddingTop: 80,
        paddingBottom: 100,
        height: "100%",
    }
});

@isNotLoggedDecorator
@connect((store) => {
    return {
        register: store.registerReducer
    }
})
class LoginView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            actualTableValue: this.props.signType || "register"
        }

        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange (event, value) {
        this.setState({actualTableValue: value});
    }

    render () {
        const {actualTableValue} = this.state;

        if (this.state.actualTableValue === "register" && this.props.register.get('isRegistered')) {
            this.setState({
                actualTableValue: "login"
            });
        }

        return (
            <div>
                <Grid container spacing={0} alignItems="center" justify="center" className={this.props.classes.container}>
                    <Grid item lg={3} sm={12}>
                        <Typography type="display2" gutterBottom>
                            GameHub.com
                        </Typography>
                        <Typography type="body2" gutterBottom >GameHub.com offers free to play browser game with leaderboards.</Typography>
                        <ul>
                            <li><Typography type="body2" gutterBottom onClick={()=>this.props.dispatch(push('/'))}>Explore available games.</Typography></li>
                            <li><Typography type="body2" gutterBottom>TODO</Typography></li>
                            <li><Typography type="body2" gutterBottom>TODO</Typography></li>
                        </ul>
                        <Typography type="body2" gutterBottom>For developers.</Typography>
                        <ul>
                            <li><Typography type="body2" gutterBottom>Sign up and request developer account.</Typography></li>
                            <li><Typography type="body2" gutterBottom>Check out our leaderboard library.</Typography></li>
                            <li><Typography type="body2" gutterBottom>TODO</Typography></li>
                        </ul>
                    </Grid>
                    <Grid item lg={3} sm={12}>
                        <Tabs value={actualTableValue} onChange={this.onTabChange} indicatorColor={"#FF715B"} centered={true} >
                            <Tab value="login" label="Login"/>
                            <Tab value="register" label="Register" disabled={this.props.register.get('isRegistered')}/>
                        </Tabs>
                        {actualTableValue === "login" && <Login/>}
                        {actualTableValue === "register" && <Register/>}
                    </Grid>
                </Grid>
                <RegisteredPopup/>
            </div>
        )
    }
}

export default withStyles(styleSheet)(LoginView);