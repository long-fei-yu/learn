import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import BaseComponent from '../baseComponent';
import BaseStyle from '../../lib/baseStyle';
import {Header} from '../../components/header';
import Color from '../../lib/color';

export default class AboutContainer extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    <Header text={'关于'} onPress={() => this.openDrawer()}/>

                    <View style={styles.interval}/>

                    <View style={styles.option}>
                        <Text style={BaseStyle.s16c333333}>作者:h_hhb_1106@163.com</Text>
                    </View>

                    <View style={styles.interval}/>

                    <View style={styles.option}>
                        <Text style={BaseStyle.s16c333333}>
                            项目简介:{'\n'}
                            一个纯粹的阅读React Native项目{'\n'}
                            为了熟悉当前React Native主流框架的使用,
                            也为了能有一款将知乎、豆瓣、GitHub一网打尽的简洁的阅读应用,利用闲暇时间做了这个项目本着学习的目的,
                            该项目会持续迭代与优化,加入更丰富的阅读内容与功能,并不断尝试最新的技术,
                            欢迎star、fork、issue、email
                        </Text>
                    </View>

                    <View style={styles.interval}/>

                    <View style={styles.option}>
                        <Text style={BaseStyle.s16c333333}>项目地址:</Text>
                    </View>

                    <View style={styles.interval}/>

                    <View style={[styles.option, {justifyContent: 'center'}]}>
                        <Text style={BaseStyle.s16c333333}>版本 1.0</Text>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    option: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    interval: {
        height: 10,
        backgroundColor: Color.cF5F5F5,
    },
});

