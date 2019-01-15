import React, {Component} from 'react';
import _ from "lodash";
import {View, ActivityIndicator, StyleSheet, Text, Animated} from 'react-native';
import Color from '../lib/color';
import BaseStyle from '../lib/baseStyle';

export default class Loading extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            zIndex: new Animated.Value(-99),
        };

        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
    }

    showLoading = (text = '加载中') => {
        this.setState({
            text,
        });

        Animated.timing(
            this.state.zIndex,
            {
                toValue: 99,
                duration: 300,
            }
        ).start();
    };

    hideLoading = () => {
        Animated.timing(
            this.state.zIndex,
            {
                toValue: -99,
                duration: 300,
            }
        ).start();
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {text, zIndex} = this.state;

        return (
            <Animated.View style={[styles.content, {zIndex}]}>
                <ActivityIndicator size="small" color={Color.cFFFFFF} style={styles.load}/>
                <Text style={BaseStyle.s12cFFFFFF}>{text}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: deviceParameter.pw,
        height: deviceParameter.ph,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },

    load: {
        marginBottom: 10,
    }
});
