import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import BaseComponent from '../baseComponent';
import BaseStyle from '../../lib/baseStyle';
import {Header} from "../../components/header";
import PropTypes from 'prop-types';
import Color from '../../lib/color';

export default class SettingContainer extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    <Header text={'设置'} onPress={() => this.openDrawer()}/>

                    <View style={styles.interval}/>
                    <Options text={'推送'} onPress={() => {

                    }}/>

                    <View style={styles.interval}/>
                    <Options text={'帮助与反馈'} onPress={() => {

                    }}/>
                    <View style={styles.division}/>
                    <Options text={'网络诊断'} onPress={() => {

                    }}/>

                    <View style={styles.interval}/>
                    <Options text={'给应用评分'} onPress={() => {

                    }}/>
                    <View style={styles.division}/>
                    <Options text={'新功能介绍'} onPress={() => {

                    }}/>
                    <View style={styles.division}/>
                    <Options text={'关于'} onPress={() => {

                    }}/>

                    <View style={styles.interval}/>

                    <Options text={'实验室'} onPress={() => {

                    }}/>
                </View>
            </SafeAreaView>
        );
    }
}

class Options extends Component {

    static propTypes = {
        text: PropTypes.string,
        onPress: PropTypes.func,

    };

    static defaultProps = {
        text: '',
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {text, onPress} = this.props;


        return (
            <TouchableOpacity style={styles.option} onPress={onPress}>
                <Text style={[BaseStyle.s16c333333, styles.text]}>{text}</Text>
                <Image style={styles.right} source={require('../../images/douBan/mine/ic_forum_arrow_right.png')}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    option: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    text: {
        flex: 1,
        marginLeft: 15,
    },
    right: {
        width: 12,
        height: 12,
    },

    interval: {
        height: 10,
        backgroundColor: Color.cF5F5F5,
    },

    division: {
        height: 1,
        marginHorizontal: 15,
        backgroundColor: Color.cF5F5F5,
    },
});

