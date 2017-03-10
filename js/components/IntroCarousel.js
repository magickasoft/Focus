import React, { Component } from 'react';
import  {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'

import Carousel from './Carousel/Carousel'
import IntroVideo from './IntroNav/IntroVideo'

let dimensions = Dimensions.get('window')

export default class IntroCarousel extends Component {
    constructor(props) {
        super(props)
    }


    //carousel options: https://github.com/nick/react-native-carousel
    render() {
        return (
          <View style={[styles.view, {height: dimensions.height}]}>
              <Carousel width={dimensions.width}
                        indicatorAtBottom={false}
                        indicatorColor="#B385FF"
                        indicatorSize={30}
                        indicatorSpace={20}
                        inactiveIndicatorColor="white"
                        indicatorOffset={20}
                        animate={true}
                        delay={50000}
                        loop={false}>
                  {[
                      {key: 1, text: '#your text #1'},
                      {key: 2, text: '#your text #2'},
                      {key: 3, text: '#your text #3'},
                      {key: 4, text: '#your text #4',
                          rightButtonText: 'SKIP', rightButtonNavigateTo: 'pop'}
                  ].map(val => {
                      return <View key={val.key}>
                          <IntroVideo
                            navigator={this.props.navigator}
                            parentNavigator={this.props.parentNavigator}
                            uri={'intro_' + val.key}
                            text={val.text}
                            leftButtonVisible={true}
                            rightButtonText={val.rightButtonText}
                            rightButtonNavigateTo={val.rightButtonNavigateTo}
                            highlightedText={val.highlightedText}
                            muted={true}
                          />
                      </View>
                  })}
              </Carousel>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'white'
    },
    navBar: {
        backgroundColor: 'white',
        height: 24
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    slideImage: {
        flex: 1,
        width:dimensions.width,
        height:dimensions.height,
        top:-40
    }
})
