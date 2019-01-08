import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ImageBackground, ScrollView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import Color from "../../../lib/color";
import _ from "lodash";
import PropTypes from 'prop-types';

export default class MineContainer extends BaseComponent {

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <ScrollView style={BaseStyle.content}>
                    <View style={BaseStyle.content}>
                        <ImageBackground source={require('../../../images/douBan/mine/bg_mine_login.png')}
                                         resizeMode={'cover'}
                                         style={styles.header}>

                            <View style={styles.settings}>
                                <View style={styles.settingsDot}/>
                                <Image source={require('../../../images/douBan/mine/ic_settings.png')}
                                       style={styles.settingIcon}/>
                            </View>

                            <View style={styles.headerContent}>
                                <Image source={require('../../../images/douBan/mine/avatar_male_100.png')}
                                       style={styles.head}/>

                                <View style={styles.headerContentRight}>
                                    <View style={styles.headRow}>
                                        <Text style={BaseStyle.s16cFFFFFF}>豆友 189205689</Text>

                                        <View style={styles.home}>
                                            <Text style={BaseStyle.s14cFFFFFF}>个人主页</Text>
                                            <Image
                                                source={require('../../../images/douBan/mine/ic_forum_arrow_right.png')}
                                                style={styles.right}/>
                                        </View>
                                    </View>

                                    <Text style={[BaseStyle.s12cFFFFFF, styles.focus]}>关注 3 被关注 0</Text>

                                    <View style={styles.otherDivision}/>

                                    <View>
                                        <Image source={require('../../../images/douBan/mine/ic_chat_white.png')}
                                               style={styles.remindIcon}/>
                                        <View style={styles.remind}>
                                            <Text style={BaseStyle.s12cFFFFFF}>1</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </ImageBackground>

                        <Options icon={require('../../../images/douBan/mine/ic_me_notification.png')} text={'提醒'}
                                 onPress={() => {

                                 }}/>

                        <View style={styles.interval}/>

                        <View style={styles.my}>
                            <Text style={BaseStyle.s18c000000}>我的书影音</Text>
                        </View>
                        <View style={styles.myContent}/>

                        <View style={styles.interval}/>

                        <Options icon={require('../../../images/douBan/mine/ic_me_order.png')} text={'看电影'}
                                 onPress={() => {

                                 }}/>

                        <View style={styles.interval}/>

                        <Options icon={require('../../../images/douBan/mine/ic_me_journal.png')} text={'我的发布'}
                                 onPress={() => {

                                 }}/>

                        <View style={styles.division}/>

                        <Options icon={require('../../../images/douBan/mine/ic_me_follows.png')} text={'我的关注'}
                                 onPress={() => {

                                 }}/>

                        <View style={styles.division}/>

                        <Options icon={require('../../../images/douBan/mine/ic_me_photo_album.png')} text={'相册'}
                                 onPress={() => {

                                 }}/>

                        <View style={styles.division}/>

                        <Options icon={require('../../../images/douBan/mine/ic_me_doulist.png')} text={'豆列/收藏'}
                                 onPress={() => {

                                 }}/>

                        <View style={styles.interval}/>

                        <Options icon={require('../../../images/douBan/mine/ic_me_wallet.png')} text={'钱包'}
                                 onPress={() => {

                                 }}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


class Options extends Component {

    static propTypes = {
        icon: PropTypes.number,
        text: PropTypes.string,
        onPress: PropTypes.func,

    };

    static defaultProps = {
        text: '',
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {icon, text, onPress} = this.props;


        return (
            <TouchableOpacity style={styles.option} onPress={onPress}>
                <Image style={styles.icon} source={icon}/>
                <Text style={[BaseStyle.s16c333333, styles.text]}>{text}</Text>
                <Image style={styles.right} source={require('../../../images/douBan/mine/ic_forum_arrow_right.png')}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    header: {
        height: 160,
        width: deviceParameter.pw,
    },

    settings: {
        alignSelf: 'flex-end',
        paddingRight: 15,
        marginTop: 10,
        marginBottom: 20
    },

    settingsDot: {
        backgroundColor: Color.cFF0000,
        width: 5,
        height: 5,
        borderRadius: 2.5,
        marginLeft: 16,
        marginBottom: -5
    },

    settingIcon: {
        width: 20,
        height: 20,
    },

    headerContent: {
        flexDirection: 'row',
        paddingHorizontal: 15
    },

    headerContentRight: {
        flex: 1,
        marginLeft: 20
    },

    headRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    home: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    focus: {
        marginTop: 10
    },

    remind: {
        backgroundColor: Color.cFF0000,
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginLeft: 16,
        marginTop: -30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    remindIcon: {
        width: 25,
        height: 25
    },

    head: {
        width: 55,
        height: 55
    },

    interval: {
        height: 10,
        backgroundColor: Color.cF5F5F5,
    },

    division: {
        height: 1,
        marginHorizontal: 15,
        backgroundColor: Color.cF5F5F5,
    },

    otherDivision: {
        height: 0.5,
        backgroundColor: Color.cF5F5F5,
        marginVertical: 10,
    },

    option: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    icon: {
        width: 25,
        height: 25,
    },
    text: {
        flex: 1,
        marginLeft: 15,
    },
    right: {
        width: 12,
        height: 12,
    },
    my: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },

    myContent: {
        height: 150,
        borderTopWidth: 1,
        borderTopColor: Color.cF5F5F5,

    },

});
