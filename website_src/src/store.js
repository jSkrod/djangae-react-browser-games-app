import { applyMiddleware, createStore } from "redux"
import {createEpicMiddleware} from "redux-observable";

import { createLogger } from 'redux-logger'


import reducer from './reducers'
import epic from './epics'
import createHistory from 'history/createBrowserHistory'

import { routerMiddleware } from 'react-router-redux'

const routerHistory = createHistory();

// Apply the middleware to the store
const varRouterMiddleware = routerMiddleware(routerHistory);
const epicMiddleware = createEpicMiddleware(epic);
const middleware = applyMiddleware(createLogger(), epicMiddleware, varRouterMiddleware);

export default createStore(reducer, middleware);

export const history = routerHistory;