'use strict'

import { combineReducers } from 'redux'
import { autoRehydrated } from './persist'
import { clapitAccountData } from './clapit'
import { drawer } from './drawer'
import { navigationState } from './navigation'

//
// const rootReducer = combineReducers({
//     autoRehydrated,
//     clapitAccountData,
//     drawer,
//     navigationState,
// })
//
// export default rootReducer

export default { autoRehydrated, clapitAccountData, drawer, navigationState}