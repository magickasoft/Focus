import React, { Component } from 'react';
import  {
    StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

export default class BackButton extends Component {
  render() {
    let { onPress, text, disabled } = this.props
    
    return (
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress} disabled={disabled} activeOpacity={disabled ? 1 : 0.7}>
        <Text  numberOfLines={1}
               allowFontScaling={false}
               style={styles.arrow}>&lsaquo;</Text>
        <Text  numberOfLines={1}
               allowFontScaling={false}
               style={styles.backText}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
   paddingLeft: 10,
    color: '#db5c81',
    fontSize: 45,
    paddingTop: 2,
  },
  backText: {
    color: '#db5c81',
    paddingTop: 7,
    paddingLeft: 0,
    fontSize: 18,
    textAlign: 'center',
  }
})
