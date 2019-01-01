import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import Color from '../../../lib/color';

export default class DailyDetailContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onTopPress = () => {

    };

    onPress = () => {


    };

    render() {
        const {} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>
                    <Text>详情</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },

    time: {
        backgroundColor: Color.c2EBDED,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
