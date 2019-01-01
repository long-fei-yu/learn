import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import BaseComponent from '../baseComponent';
import BaseStyle from '../../lib/baseStyle';
import {Header} from "../../components/header";

export default class AboutContainer extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    <Header text={'关于'} onPress={() => this.openDrawer()}/>

                    <TouchableOpacity onPress={() => this.navigate('MovieDetails')}>
                        <Text>跳转</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({});

