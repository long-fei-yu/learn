import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";

export default class ColumnContainer extends BaseComponent {

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>
                    <Text>Welcome to React ColumnContainer!</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({});
