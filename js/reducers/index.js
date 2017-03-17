'use strict'

import { combineReducers } from 'redux'
import apolloClient from  '../../js/apolloConfig'
import { autoRehydrated } from './persist'
import { clapitAccountData } from './clapit'
import { drawer } from './drawer'
import { navigationState } from './navigation'


const rootReducer = combineReducers({
    apollo: apolloClient.reducer(),
    autoRehydrated,
    clapitAccountData,
    drawer,
    navigationState,
});

export default rootReducer
