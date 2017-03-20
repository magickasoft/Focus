import {
    Animated,
    Dimensions,
} from 'react-native'

import {
    NETINFO_SET_STATUS,
} from '../constants/ActionTypes'

const initialState = {
    type: ''
};

export function netinfo(state = initialState, action) {
    let { type, payload } = action

    switch (type) {
        case NETINFO_SET_STATUS: {
            return {...state, type: payload};
        }
    }

    return state
}
