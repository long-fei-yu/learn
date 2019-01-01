import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import BaseComponent from '../baseComponent';
import BaseStyle from '../../lib/baseStyle';
import {Header} from "../../components/header";

export default class SettingContainer extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    <Header text={'设置'} onPress={() => this.openDrawer()}/>
                    <Text>设置</Text>

                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({});

