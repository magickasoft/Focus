import {
    DRAWER_DATA_SET,
    DRAWER_OPEN,
    DRAWER_CLOSE
} from '../constants/ActionTypes'


export function setDrawerData(data) {
    return {
        type: DRAWER_DATA_SET,
        payload: data
    }
}

export function openDrawer() {
    return {
        type: DRAWER_OPEN
    }
}

export function closeDrawer() {
    return {
        type: DRAWER_CLOSE
    }
}