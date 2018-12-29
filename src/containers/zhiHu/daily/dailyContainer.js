import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";

export default class DailyContainer extends BaseComponent {

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    <TouchableOpacity onPress={() => this.navigate('MovieDetails')}>
                        <Text>Welcome to React DailyContainer!</Text>
                    </TouchableOpacity>
                    
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({});
