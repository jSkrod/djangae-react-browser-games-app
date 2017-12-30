import {connect} from "react-redux";
import React from "react";
import { push } from 'react-router-redux';


const isNotLoggedDecorator = (Component) => {
    @connect((store) => { return {
        userReducer: store.userReducer,
    }})
    class IsNotLoggedDecorator extends React.Component {
        constructor() {
            super();
            this.willBeRendered = true;
        }

        logic(reducer) {
            const isLogged = reducer.get('isLogged');
            if (isLogged !== false) {
                this.willBeRendered = false;
                this.props.dispatch(push("/"));
            }    
        }

        componentWillUpdate(nextProps) {
            const userReducer = nextProps.userReducer;
            this.logic(userReducer);
        }

        componentWillMount() {
            const userReducer = this.props.userReducer;
            this.logic(userReducer);
        }

        render() {
            if (!this.willBeRendered) {
                return null;
            }
            return <Component {...this.props} {...this.state} />;
        }
    }
    return IsNotLoggedDecorator;
};

export default isNotLoggedDecorator;