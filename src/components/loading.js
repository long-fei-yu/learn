import React, {Component} from 'react';
import _ from 'lodash';
import {ActivityIndicator, StyleSheet, Text, Animated} from 'react-native';
import Color from '../lib/color';
import BaseStyle from '../lib/baseStyle';

export default class Loading extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            zIndex: new Animated.Value(-99),
            loadOpacity: new Animated.Value(0),
        };

        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
    }

    showLoading = (text = '加载中') => {
        this.setState({
            text,
        });

        Animated.parallel([
            Animated.timing(
                this.state.zIndex,
                {
                    toValue: 99,
                    duration: 200,
                }
            ),
            Animated.timing(
                this.state.loadOpacity,
                {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,  //启用原生动画驱动
                }
            )
        ]).start();
    };

    hideLoading = () => {
        Animated.parallel([
            Animated.timing(
                this.state.zIndex,
                {
                    toValue: -99,
                    duration: 200,
                }
            ),
            Animated.timing(
                this.state.loadOpacity,
                {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,  //启用原生动画驱动
                }
            )
        ]).start();
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {text, zIndex, loadOpacity} = this.state;

        return (
            <Animated.View style={[styles.container, {zIndex}]}>

                <Animated.View style={[styles.content, {opacity: loadOpacity}]}>
                    <ActivityIndicator size="small" color={Color.cFFFFFF} style={styles.load}/>
                    <Text style={BaseStyle.s12cFFFFFF}>{text}</Text>
                </Animated.View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: deviceParameter.pw,
        height: deviceParameter.ph,
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },

    load: {
        marginBottom: 10,
    }
});
