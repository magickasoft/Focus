

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Platform,
    Image,
} from 'react-native';

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        const{
            textItem,
            imageItemSource,
            onPressItem
        } = this.props;
        return (
            <TouchableOpacity style={{flexDirection:'row', marginBottom:20}} onPress={onPressItem}>
                <Image resizeMode={'contain'} style={styles.imageItem}  source={imageItemSource}/>
                <Text style={styles.text}>{textItem}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 17,
        //fontFamily: 'Roboto-Regular',
        alignSelf: 'center',
        textAlign: 'center'
    },
    imageItem:{
        height:30,
        width:30,
        marginLeft:25,
        marginRight:20,
    }
});


