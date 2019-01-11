import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    Animated
} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import Color from "../../../lib/color";
import Dimen from '../../../lib/dimen';
import _ from "lodash";
import PropTypes from 'prop-types';
import Swiper from "react-native-swiper";
import {mineData} from './mineData';

export default class MineContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            distance: new Animated.Value(15),
        }
    }

    onTitleClick = (index) => {
        Animated.timing(this.state.distance, {
            toValue: index * 60 + 15,
            duration: 300,
        }).start();

        this.setState({
            index,
        })
    };

    render() {
        const {index, distance} = this.state;

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

                        <View>

                            <View style={styles.title}>

                                <TouchableOpacity style={styles.titleItem} onPress={this.onTitleClick.bind(this, 0)}>
                                    <Text
                                        style={{
                                            color: index === 0 ? Color.c333333 : Color.c999999,
                                            fontSize: index === 0 ? Dimen.s14 : Dimen.s12
                                        }}>影视</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.titleItem} onPress={this.onTitleClick.bind(this, 1)}>
                                    <Text
                                        style={{
                                            color: index === 1 ? Color.c333333 : Color.c999999,
                                            fontSize: index === 1 ? Dimen.s14 : Dimen.s12
                                        }}>图书</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.titleItem} onPress={this.onTitleClick.bind(this, 2)}>
                                    <Text
                                        style={{
                                            color: index === 2 ? Color.c333333 : Color.c999999,
                                            fontSize: index === 2 ? Dimen.s14 : Dimen.s12
                                        }}>音乐</Text>
                                </TouchableOpacity>

                            </View>

                            <Animated.View style={[styles.titleInterval, {marginLeft: distance}]}/>

                            <View style={styles.myContent}>
                                <Swiper height={80} index={0} showsPagination={false}
                                        key={mineData.subject.length}
                                        loop={false}
                                        onIndexChanged={(index) => {
                                            console.log('index', index);
                                            this.onTitleClick(index)
                                        }}>

                                    {mineData.subject.map((data, index) => {
                                        return (
                                            <View key={data + index} style={styles.subject}>
                                                <ItemsPage interests={data.interests}/>
                                            </View>)
                                    })}
                                </Swiper>
                            </View>
                        </View>


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

class ItemsPage extends Component {

    static propTypes = {
        interests: PropTypes.array,
    };

    static defaultProps = {
        interests: [],
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {interests} = this.props;

        return (
            <View style={styles.itemsPage}>
                {
                    interests.map((interest, index) => {
                        return <Items key={interest + index} {...interest}/>
                    })
                }

            </View>
        );
    }
}

class Items extends Component {

    static propTypes = {
        cover_url: PropTypes.string,
        status_cn: PropTypes.string,
        count: PropTypes.number,
        onPress: PropTypes.func,
        type: PropTypes.string,
    };

    static defaultProps = {
        cover_url: '',
        status_cn: '',
        count: 0,
        onPress: null,
        type: '',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {cover_url, status_cn, count, onPress, type} = this.props;

        return (
            <TouchableOpacity style={styles.items} onPress={onPress}>
                {cover_url ? <Image style={styles.itemsIcon} source={{uri: cover_url}}/> :
                    <Image style={styles.itemsIcon}
                           source={type === 'movie' ? require('../../../images/douBan/mine/bg_videos_stack_default.png') :
                               type === 'book' ? require('../../../images/douBan/mine/bg_books_stack_default.png') :
                                   require('../../../images/douBan/mine/bg_music_stack_default.png')}/>}

                <Text style={BaseStyle.s12c333333}>{status_cn}
                    <Text style={BaseStyle.s10c333333}>{count}</Text>
                </Text>
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
        height: 80,
        marginVertical: 10,
    },

    title: {
        flexDirection: 'row',
        height: 40,
        borderBottomColor: Color.cD9D9D9,
        borderBottomWidth: 1,
    },

    titleItem: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleInterval: {
        width: 25,
        height: 2,
        marginTop: -2,
        backgroundColor: Color.c191919,
    },

    items: {
        width: 100,
        alignItems: 'center',
    },

    itemsIcon: {
        width: 60,
        height: 60,
        marginBottom: 5
    },

    itemsPage: {
        flexDirection: 'row',
    },

    subject: {
        justifyContent: 'center',
    }


});
