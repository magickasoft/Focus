'use strict'
import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native'
import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './js/reducers'
import App from './js/app'


const wrapper = (props) => {
    console.log('~~wrapper props', props);

    let middlewareApplied;
    const logger = createLogger();

    middlewareApplied = applyMiddleware(thunk, logger);

    const store = createStore(rootReducer, {}, compose(
      autoRehydrate(),
      middlewareApplied
    ));
    persistStore(store, {
      storage: AsyncStorage,
      whitelist: ['newNotifications', 'preferences']
    }).purge([]);

    return (
        <Provider store={store}>
          <App />
        </Provider>
    )
};

export default wrapper
