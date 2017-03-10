import {
    Animated,
    Dimensions,

} from 'react-native'
import  _ from 'lodash'
let { width, height } = Dimensions.get('window')

import {
    DRAWER_DATA_SET,
    DRAWER_OPEN,
    DRAWER_CLOSE
} from '../constants/ActionTypes'

const initialState = {
    open: false,
    disabled: false,
    //type: 'displace',
    type: 'overlay',
    tapToClose: true,
    openDrawerOffset: 0.25,
    closedDrawerOffset: -3,
    panCloseMask: 0.2,
    verticalLine: false,
    opacityLine: 0.7,
    leftLinePosition: new Animated.Value(-width),
    leftLineShown: false,
    styles: {
        drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
        main: {paddingLeft: 0},
        drawerOverlay: {},
        mainOverlay: {},
    },
}

export function drawer(state = initialState, action) {
    let { type, payload } = action

    switch (type) {
        case DRAWER_DATA_SET: {
            return _.merge(state,payload);
        }
        case DRAWER_OPEN: {
            return {...state, open: true};
        }
        case DRAWER_CLOSE: {
            return {...state, open: false};
        }
    }

    return state
}
