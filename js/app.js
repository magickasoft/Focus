'use strict';

import React, { Component } from 'react';
import  {
    NetInfo,
    View,
    Text,
    NativeModules,
    Alert
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as navigationActions  from './actions/navigation'
import { graphql } from 'react-apollo'
import { allUsers } from './queries/index'

import Login from './components/IntroNav/Login'
import TestPageContainer from './containers/TestPageContainer'
import MainContainer from './containers/MainContainer'
import IntroNavContainer from './containers/IntroNavContainer'

import CustomNavigationCardStack from './components/CustomNavigationCardStack'
import gql from 'graphql-tag';
import apolloClient from  './apolloConfig'
global._ = _;

const NavigationCardStackStyleInterpolator = require('NavigationCardStackStyleInterpolator');

// const initialRouteStack = []//[{ name: 'MainContainer', index: 0 }]

class App extends React.Component {
    constructor(props) {
        super(props);

        let { navigationPush, navigationPop, navigationReplace } = props;
        this.state = {
            permissionsRequested: false,
        };

        // for time's sake, converting from navigator.push to navigationPush
        this.navigator = {
            push: (data, staticState = false) => {
                const { name, ...otherData } = data;
                const key = name + (staticState ? '' : ('-' + new Date().getTime()));
                navigationPush({ key, name, ...otherData })
            },
            pop: () => {
                navigationPop()
            },
            replace: (data, staticState = false) => {
                let { name, ...otherData } = data;
                const key = name + (staticState ? '' : ('-' + new Date().getTime()));
                navigationReplace({ key, ...otherData })
            }
        }

    }

    componentWillReceiveProps(newProps) {
        let { autoRehydrated:oldAutoRehydrated, clapitAccountData:oldClapitAccountData } = this.props;
        let { autoRehydrated, clapitAccountData } = newProps;
        let requestPermission = false;
        if (!oldAutoRehydrated && autoRehydrated) { // data just became hydrated
            if (_.isEmpty(clapitAccountData)) {  // new stuff is empty, so show intro
                //this should be a special case, use setTimeout to avoid putting IntroNavContainer on top of the navigation stack
                //when Feed component is initializing
                setTimeout(()=>{ 
                    // this.navigator.push({ name: 'Login' }, true) intro
                    // this.navigator.push({ name: 'IntroNavContainer' }, true)
                    //this.navigator.push({ name: 'MainContainer' }, true)

                })                
            } else {
                requestPermission = true;
            }
        }

        /*if (_.isEmpty(oldClapitAccountData) && !_.isEmpty(clapitAccountData)) { // just logged in
            requestPermission = true;
        }
        if (requestPermission && !this.state.permissionsRequested){
            console.log('~~~ Requsting Permissions ~~~');
            // PushNotification.requestPermissions()
            this.setState({permissionsRequested: true});
            //console.log('data',clapitAccountData)
        }*/
    }

    _renderScene({ scene }) {
        let { navigationState:completeNavigationState } = this.props; // from redux
        let { route } = scene; // from scene
        let { clapitAccountData, navigationPush, navigationPop } = this.props;
        let { name, post, resourceId, callback, key, unauthenticatedAction, ...extraProps } = route;

        key = key.split('-')[0];  // for showing multiple PostDetails...?

        switch (key) {
            case 'MainContainer':
                return (
                    <MainContainer clapitAccountData={clapitAccountData}
                                   completeNavigationState={completeNavigationState} parentNavigator={this.navigator}/>);
            case 'IntroNavContainer':
                return (<IntroNavContainer parentNavigator={this.navigator} {...extraProps} />)
            case 'Login':
                return (
                    <Login signUp completeNavigationState={completeNavigationState} parentNavigator={this.navigator}/>);
            case 'TestPageContainer':
                return (
                    <TestPageContainer {... route.props} signUp completeNavigationState={completeNavigationState} parentNavigator={this.navigator}/>);
        }
    }

    componentDidMount() {
   //      apolloClient.query({ query: gql`
   //        query allUsers {
   //          usersList {
   //            id,
   //            name,
   //            friends {
   //              id,
   //              name
   //            }
   //          }
   //        }
   // ` });
    }


    render() {
        const {
          autoRehydrated,
          navigationState,
          navigationPush,
          navigationPop,
          navigationReplace,
          onNavigate
        } = this.props;

        if (!autoRehydrated) {
            return (<View></View>)
        }
        return (
            <CustomNavigationCardStack
                navigationState={navigationState}
                style={{flex:1}}
                animation_duration={0}
                onNavigate={onNavigate}
                renderScene={this._renderScene.bind(this)}
            />
        )
    }
}

const stateToProps = (state) => {
    let { autoRehydrated, navigationState } = state;

    return { autoRehydrated, navigationState };
};

const dispatchToProps = (dispatch) => {
    return bindActionCreators(_.extend({}, {...navigationActions}), dispatch)
};

export default connect(stateToProps, dispatchToProps)(App)
