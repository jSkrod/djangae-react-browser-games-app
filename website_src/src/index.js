import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layouts/Main';
import EmbedView from './components/views/Game/Embed';
import {history} from './store';
import store from './store';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
const detailsColor = "#FF715B";
const theme = createMuiTheme({
    overrides:{
        MuiInput:{
            inkbar:{
                "&:after":{
                    backgroundColor: detailsColor,
                }
            }
        },
        MuiFormLabel:{
            focused:{
                color:detailsColor,
            }
        },
        MuiGridListTileBar:{
            rootWithSubtitle: {
                height:"150px",
            },
            titleWrap:{
                height: "75px",
            },
            subtitle: {
                whiteSpace: "normal",
            }

        }
    }
});
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/embed/:gameName" component={EmbedView}/>
                <Route path="/" component={Layout} />
            </Switch>
        </ConnectedRouter>
        </MuiThemeProvider>
        
    </Provider>,
  document.getElementById('root')
);
