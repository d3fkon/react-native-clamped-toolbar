/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window')
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const uri = 'https://www.w3schools.com/howto/img_fjords.jpg';
type Props = {};
export default class App extends Component<Props> {
  topHeight = 300;
  _animatedValue = new Animated.Value(0);
  _dynamicHeight = new Animated.Value(0);
  interpolatedImageValue = this._animatedValue.interpolate({
    inputRange: [this.topHeight * (-1), 0, this.topHeight],
    outputRange: [-100,0,100]
  })
  TopComponent = () => (
    <Animated.Image source={{ uri }} style={{
      height: this.topHeight, width: '100%', resizeMode: 'cover', transform: [{
        translateY: this.interpolatedImageValue
      }]
    }}>
    </Animated.Image>
  )
  MainComponent = () => {
    let a = [];
    for (let i = 0; i < 30; i++)
      a.push(i)
    console.log(a)
    return (
      <View style={{ height: 5000, backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
        {a.map(e => (
          <View style={{ width: '90%', margin: 5, height: 60, backgroundColor: 'aqua' }} key={e} >
            <Text>{e}</Text>
          </View>
        ))}
      </View>
    );
  }
  ToolbarComponent = () => (
    <TouchableOpacity onPress={this.onPress} style={{ height: 60, backgroundColor: 'teal' }}>
      <Text>Clamping Component</Text>
    </TouchableOpacity>
  )
  onPress = () => alert('FUCK')
  render() {
    let onScroll = Animated.event([{
      nativeEvent: {
        contentOffset: {
          y: this._animatedValue
        }
      }
    }])
    this.isClamped = false;
    this._animatedValue.addListener(({ value }) => {
      console.log(value)
      this.isClamped = value >= this.topHeight ? true : false;
      this.isClamped ? this._dynamicHeight.setValue(this.topHeight) : this._dynamicHeight.setValue(0)
    })
    const interpolatedValue = this._dynamicHeight.interpolate({
      inputRange: [0, this.topHeight],
      outputRange: [-60, 0],
      extrapolate: 'clamp'
    })
    const interpolatedValue2 = this._dynamicHeight.interpolate({
      inputRange: [0, this.topHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} onScroll={onScroll} scrollEventThrottle={16}>
          <this.TopComponent />
          <Animated.View style={{ opacity: interpolatedValue2 }}>
            <this.ToolbarComponent />
          </Animated.View>
          <this.MainComponent />
        </ScrollView>
        <Animated.View style={{ marginTop: interpolatedValue, position: 'absolute', top: 0, width: '100%' }}>
          <this.ToolbarComponent />
        </Animated.View>
      </View>
    );
  }
  componentWillUnmount() {
    this._animatedValue.removeAllListeners()
  }
}

