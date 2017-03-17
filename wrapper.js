'use strict'
import React from 'react';
import { AppRegistry, AsyncStorage, Platform } from 'react-native'
import { applyMiddleware, createStore, combineReducers,  compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Provider } from 'react-redux'

import { ApolloProvider } from 'react-apollo';
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './js/reducers'
// import * as rootReducer from './js/reducers'
import App from './js/app'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { autoRehydrated } from './js/reducers/persist'
import { clapitAccountData } from './js/reducers/clapit'
import { drawer } from './js/reducers/drawer'
import { navigationState } from './js/reducers/navigation'

import apolloClient from  './js/apolloConfig'

//     client.query({ query: gql`
//   query allUsers {
//     usersList {
//       id,
//       name,
//       friends {
//         id,
//         name
//       }
//     }
//   }
// ` });
const wrapper = (props) => {
    //console.log('~~wrapper props', props);

    let middlewareApplied;
    const logger = createLogger();

    middlewareApplied = applyMiddleware(apolloClient.middleware(), thunk, logger);

    const composeEnhancers = composeWithDevTools({
        name: Platform.OS, realtime: true,
        hostname: 'localhost', port: 8000,
        autoReconnect: true,
    });

    const store = createStore(rootReducer, // {},
    //compose(
    composeEnhancers(
      autoRehydrate(),
      middlewareApplied,
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ));
    persistStore(store, {
      storage: AsyncStorage,
      whitelist: [/*'apollo'*/,'autoRehydrated','clapitAccountData','drawer','navigationState','newNotifications', 'preferences',]
    }).purge([]);

    return (
        <ApolloProvider store={store} client={apolloClient}>
          <App />
        </ApolloProvider>
    )
};

export default wrapper
