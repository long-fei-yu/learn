import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import BaseComponent from '../baseComponent';
import BaseStyle from '../../lib/baseStyle';
import Color from '../../lib/color';
import MenuTab from './menuTab';

export default class menusContainer extends BaseComponent {

    onTabPress(routeName) {

        this.navigate(routeName);
        this.closeDrawer();
    };

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <ScrollView style={BaseStyle.content}>
                    <View style={BaseStyle.content}>

                        <Image style={styles.menu_top} source={require('../../images/menus/menu_top.jpg')}
                               resizeMode={'cover'}/>

                        <View style={styles.title}>
                            <Text style={BaseStyle.s16c999999}>资讯</Text>
                        </View>

                        <MenuTab text={'知乎日报'} path={require('../../images/menus/zhi_hu_launcher.png')} isSelect={true}
                                 onPress={this.onTabPress.bind(this, 'ZhiHu')}/>

                        <MenuTab text={'豆瓣'} path={require('../../images/menus/dou_ban_launcher.png')}
                                 onPress={this.onTabPress.bind(this, 'DouBan')}/>

                        <MenuTab text={'GitHub'} path={require('../../images/menus/git_hub_launcher.png')}
                                 onPress={this.onTabPress.bind(this, 'GitHub')}/>

                        <View style={[styles.title, styles.option]}>
                            <Text style={BaseStyle.s16c999999}>选项</Text>
                        </View>

                        <MenuTab text={'设置'} path={require('../../images/menus/settings.png')}
                                 onPress={this.onTabPress.bind(this, 'Setting')}/>

                        <MenuTab text={'关于'} path={require('../../images/menus/about.png')}
                                 onPress={this.onTabPress.bind(this, 'About')}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    menu_top: {
        width: deviceParameter.pw * 0.7,
        height: 700 / 1244 * (deviceParameter.pw * 0.7),
    },
    title: {
        height: 60,
        justifyContent: 'center',
        paddingLeft: 20,
    },

    option: {
        borderTopWidth: 1,
        borderTopColor: Color.cD9D9D9,
    }

});
