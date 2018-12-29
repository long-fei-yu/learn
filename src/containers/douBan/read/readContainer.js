import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";

export default class ReadContainer extends BaseComponent {

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>
                    <Text>Welcome to React ReadContainer!</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({});
