import React from 'react';
import {View, StyleSheet,} from 'react-native';
import BaseComponent from '../baseComponent';
import BaseStyle from '../../lib/baseStyle';

export default class WebContainer extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View style={BaseStyle.container}>


            </View>
        );
    }
}


const styles = StyleSheet.create({});
