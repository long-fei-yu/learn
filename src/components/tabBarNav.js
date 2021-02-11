import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Animated} from 'react-native';
import BaseStyle from '../lib/baseStyle';
import {Header} from '../components/header';
import Color from '../lib/color';

export default class TabBarNav extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            distance: new Animated.Value(0),
        };
    }

    onSliding = (index) => {

        Animated.timing(this.state.distance, {
            toValue: index * deviceParameter.pw / 4,
            duration: 300,
        }).start();

        this.setState({
            index
        });
    };

    render() {
        const {navigation} = this.props;
        const {index, distance} = this.state;

        return (
            <SafeAreaView>
                <View>
                    <Header text={'知乎日报'} onPress={() => navigation.openDrawer()}/>

                    <View style={styles.title}>

                        <TouchableOpacity style={styles.titleItem} onPress={() => {
                            navigation.navigate('Daily');
                            this.onSliding(0);
                        }}>
                            <Text
                                style={[BaseStyle.s16c333333, {color: index === 0 ? Color.c2EBDED : Color.c333333}]}>日报</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.titleItem} onPress={() => {
                            navigation.navigate('Column');
                            this.onSliding(1);
                        }}>
                            <Text
                                style={[BaseStyle.s16c333333, {color: index === 1 ? Color.c2EBDED : Color.c333333}]}>专栏</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.titleItem} onPress={() => {
                            navigation.navigate('Popular');
                            this.onSliding(2);
                        }}>
                            <Text
                                style={[BaseStyle.s16c333333, {color: index === 2 ? Color.c2EBDED : Color.c333333}]}>热门</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.titleItem} onPress={() => {
                            navigation.navigate('Theme');
                            this.onSliding(3);
                        }}>
                            <Text
                                style={[BaseStyle.s16c333333, {color: index === 3 ? Color.c2EBDED : Color.c333333}]}>主题</Text>
                        </TouchableOpacity>

                    </View>

                    <Animated.View style={[styles.interval, {marginLeft: distance}]}/>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        height: 44,
        borderBottomColor: Color.cD9D9D9,
        borderBottomWidth: 1,
    },
    titleItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    interval: {
        width: deviceParameter.pw / 4,
        height: 1,
        marginTop: -2,
        backgroundColor: Color.c2EBDED

    }
});
