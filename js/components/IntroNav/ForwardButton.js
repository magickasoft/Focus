import React, { Component } from 'react';
import  {
    StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

export default class ForwardButton extends Component {
  render() {
    let { onPress, text, disabled } = this.props

    return (
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress} disabled={disabled} activeOpacity={disabled ? 1 : 0.7}>
        <Text style={styles.forwardText}>{text}</Text>
        <Text style={styles.arrow}>&rsaquo;</Text>
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
    paddingRight: 10,
    paddingTop: 2,
    color: '#db5c81',
    textAlign: 'center',
    fontSize: 45
  },
  forwardText: {
    color: '#db5c81',
    paddingTop: 7,
    paddingRight: 0,
    fontSize: 18,
    textAlign: 'center',
  }
})
