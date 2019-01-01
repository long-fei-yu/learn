import React, {Component} from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import BaseStyle from "../lib/baseStyle";
import Color from '../lib/color';

const IC_DRAWER = require('../images/components/ic_drawer.png');
const IC_ARROW_BACK = require('../images/components/ic_arrow_back.png');

/**
 * 自定义导航栏
 */
class Header extends Component<Props> {

    static propTypes = {
        onPress: PropTypes.func,
        text: PropTypes.string,
        navigation: PropTypes.object,
    };

    static defaultProps = {
        onPress: null,
        text: '',
        navigation: null,
    };

    onBack = () => {
        this.props.navigation && this.props.navigation.goBack();
    };

    render() {
        const {onPress, text} = this.props;

        return (
            <View style={styles.bar}>
                <TouchableOpacity style={styles.navBtn} onPress={onPress || this.onBack}>
                    <Image source={IC_DRAWER} resizeMode={'contain'}
                           style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={BaseStyle.s18c000000}>{text}</Text>
            </View>
        );
    }
}

/**
 * 自定义导航栏左边返回图片
 */
class NavBack extends Component<Props> {

    static propTypes = {
        onPress: PropTypes.func,
        navigation: PropTypes.object.isRequired,
    };

    static defaultProps = {
        onPress: null,
        navigation: null,
    };

    onBack = () => {
        this.props.navigation && this.props.navigation.goBack();
    };

    render() {
        return (
            <TouchableOpacity style={styles.navBtn} onPress={this.props.onPress || this.onBack}>
                <Image source={IC_ARROW_BACK} resizeMode={'contain'} style={styles.backIcon}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        borderBottomColor: Color.cD9D9D9,
        borderBottomWidth: 1,
    },
    navBtn: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    backIcon: {
        width: 35,
        height: 35,
    },
});

export {Header, NavBack};
