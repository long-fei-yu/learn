import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import BaseComponent from '../baseComponent';
import BaseStyle from '../../lib/baseStyle';
import {Header} from "../../components/header";

export default class GitHubMainContainer extends BaseComponent {

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>
                    <Header text={'GitHub'} onPress={() => this.openDrawer()}/>

                    <View style={styles.theme}>
                        <Text style={BaseStyle.s18c000000}>敬请期待</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    theme: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }

});
