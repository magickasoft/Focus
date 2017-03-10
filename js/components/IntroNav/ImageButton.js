import React, { Component } from 'react';
import  {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

export default class ImageButton extends Component {
  render() {
    let { onPress, imageSource, title } = this.props
    
    return (
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      {
        imageSource ? <Image style={styles.buttonNavBar} source={imageSource}/>
          : null
      }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  arrow: {
    paddingLeft: 15,
    color: '#B385FF',
    fontSize: 45
  },
  buttonNavBar:{
    marginLeft: 15,
    width:23
  },
  backText: {
    paddingTop: 10,
    paddingLeft: 10,
    textAlign: 'center',
  }
})
