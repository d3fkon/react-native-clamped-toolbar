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

type Props = {};
export default class App extends Component<Props> {
    _animatedValue = new Animated.Value(0);
    _dynamicOpacity = new Animated.Value(0);
    interpolatedValue = this._animatedValue.interpolate({
        inputRange: [0, 10],
        outputRange: [0, 100]
    })
    render() {
        let onScroll = Animated.event([{
            nativeEvent: {
                contentOffset: {
                    y: this._animatedValue
                }
            }
        }])
        const { topComponentHeight } = this.props;
        this.isClamped = false;
        this._animatedValue.addListener(({ value }) => {
            this.isClamped = value >= this.topComponentHeight ? true : false;
            this._dynamicOpacity.setValue(this.isClamped ? 1 : 0)
        })
        const interpolatedValue = this._dynamicOpacity.interpolate({
            inputRange: [0, topComponentHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        const interpolatedValue2 = this._dynamicOpacity.interpolate({
            inputRange: [0, topComponentHeight],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        const { toolBarComponent, topComponent, mainComponent } = this.props;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1,  backgroundColor: 'red' }} onScroll={onScroll} scrollEventThrottle={16}>
                    <topComponent />
                    <Animated.View style={{ opacity: interpolatedValue2 }}>
                        <toolbarComponent />
                    </Animated.View>
                    <this.MainComponent />
                </ScrollView>
                <Animated.View style={{ opacity: interpolatedValue, position: 'absolute', top: 0, width: '100%' }}>
                    <toolbarComponent />
                </Animated.View>
            </View>
        );
    }
    componentDidMount() {
        this._animatedValue = new Animated.Value(0);
    }
}

