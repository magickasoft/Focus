/**
 * Created by konstantin on 27.07.16.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    ScrollView,
    Text,
    AsyncStorage
} from 'react-native';

import MenuItem from './MenuItem'

let { width, height } = Dimensions.get('window')

    //<Image  style={styles.afa}  source={require('../resources/TonyStark.png')}/>


export default class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onWebViewPage(details){

    }
    
    onLogOut() {

    }

    render() {

        const{
            onPressItem
        } = this.props;

        return (
            <View style={styles.container}>
                <View  style={styles.containerPanelTop}>
                    <Text style={styles.panelTop_Label}>{'FOCUS'}</Text>
                    <View style={styles.containerPanelTop_inner}>
                        <Image  style={styles.panelTop_innerUserImage}  source={require('../images/TonyStark.png')}/>
                        <View style={styles.containerPanelTop_innerDetail}>
                            <Text
                                numberOfLines={1}
                                style={styles.panelTop_LabelTitle}>{'Gurpreet Jass Gurpreet Jass Gurpreet Jass Gurpreet Jass'}</Text>
                            <Text
                                numberOfLines={1}
                                style={styles.panelTop_LabelSubTitle}>{'Co-Founder Co-Founder Co-Founder Co-Founder'}</Text>
                        </View>
                    </View>
                </View>
                {/*<Image  style={styles.backgroundImage}  source={require('../images/tytel-menu-backgroud.png')}>*/}
                    {/*<Text style={styles.name}>{'NAME'}</Text>*/}
                {/*</Image>*/}
                {/*<Image  style={styles.afa}  source={{uri: this.props.user.avatar}}/>*/}
                {/*<Image  style={styles.afa}  source={require('../images/TonyStark.png')}/>*/}

                <ScrollView style={styles.menu} contentContainerStyle={{justifyContent:'space-between'}}>
                    <MenuItem //imageItemSource={require('../images/icon/dashboard.png')}
                              textItem='Schedule'
                              onPressItem={()=>this.onWebViewPage('dashboard')}/>
                    <MenuItem //imageItemSource={require('../images/icon/account.png')}
                              textItem='Accounts'
                              onPressItem={()=>this.onWebViewPage('account')}/>
                    <MenuItem //imageItemSource={require('../images/icon/fitness.png')}
                              textItem='Media'
                              onPressItem={()=>this.onWebViewPage('fitness')}/>
                    <MenuItem //imageItemSource={require('../images/icon/mind.png')}
                              textItem='Notifications'
                              onPressItem={()=>this.onWebViewPage('mind')}/>
                    <MenuItem //imageItemSource={require('../images/icon/place.png')}
                              textItem='Settings'
                              onPressItem={()=>this.onWebViewPage('social')}/>
                    <MenuItem //imageItemSource={require('../images/icon/social.png')}
                              textItem='My profile'
                              onPressItem={()=>this.onWebViewPage('place')}/>
                    <MenuItem //imageItemSource={require('../images/icon/logout.png')}
                              textItem='Logout'
                              onPressItem={()=>this.onLogOut()}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#1f1b20',
    },
    panelTop_Label: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 5,
        marginLeft:20,
        marginBottom: 5,
    },
    containerPanelTop_inner: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent:'flex-start',
    },
    containerPanelTop_innerDetail: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
    },
    panelTop_innerUserImage: {
        height:70,
        width:70,
        borderRadius: 35,
        marginRight: 10,
    },
    panelTop_LabelTitle:{
        color: '#fff',
        fontSize: 18,
        //fontFamily: 'Roboto-Regular',
    },
    panelTop_LabelSubTitle:{
        color: '#fff',
        fontSize: 14,
        opacity: 0.8,
        //fontFamily: 'Roboto-Regular',
    },
    containerPanelTop:{
        justifyContent: 'center',
        flex: 0.35,
        flexDirection: 'column',
        marginTop: 20,
        marginLeft:20,
        marginRight:20,
    },
    afa:{
        position:'absolute',
        marginLeft: width * 0.27,
        top:height * 0.18,
        height:70,
        width:70,
        borderRadius:35
    },
    text: {
        color: '#2d3036',
        fontSize: 17,
        //fontFamily: 'Roboto-Regular',
        alignSelf: 'center',
        textAlign: 'center'
    },
    menu:{
        paddingTop: 15,
        backgroundColor: 'black'
    }
});

