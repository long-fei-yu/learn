import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import HttpUtil from "../../../lib/http";
import {URLS} from "../../../lib/urls";
import Color from '../../../lib/color';
import _ from "lodash";
import {connect} from 'react-redux';

@connect(
    state => (
        {
            movieDetailsReducer: state.movieDetailsReducer
        }
    ),
    null
)
export default class MovieDetailsContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }

    componentDidMount() {

        HttpUtil.getDouBan({
            url: URLS.subject + this.props.movieDetailsReducer.id,
            param: {client: '', udid: ''}
        }, res => {
            this.setState({
                data: res,
            })
        });
    }

    showInfo = (data) => {
        let res = '';

        if (_.isArray(data.countries)) {
            for (let countrie of data.countries) {
                res += countrie + ' ';
            }
            res += '/ ';
        }

        if (_.isArray(data.genres)) {
            for (let genre of data.genres) {
                res += genre + ' ';
            }

            res += '/ ';
        }

        if (_.isArray(data.pubdates)) {
            res += data.pubdates[0] + '上映';
            res += '/ ';
        }

        if (_.isArray(data.durations)) {
            for (let duration of data.durations) {
                res += '片长' + duration + ' ';
            }
        }

        return res;
    };

    render() {
        const {data} = this.state;

        let total = 0;
        let details = data.rating && data.rating.details;
        for (let key in details) {
            total += details[key];
        }

        return (
            <SafeAreaView style={BaseStyle.container}>
                <ScrollView>
                    <View style={styles.content}>

                        <View style={styles.head}>
                            <Image style={styles.headIcon}
                                   source={{uri: data.images && data.images.small}}
                                   resizeMode={'cover'}/>

                            <View style={styles.headerContent}>
                                <Text style={[BaseStyle.s18cFFFFFF, {marginTop: 5}]}>{data.title}</Text>
                                <Text style={[BaseStyle.s14cFFFFFF, {marginTop: 5}]}>{data.original_title}</Text>
                                <Text style={[BaseStyle.s12cABABAE, {marginTop: 5}]}>{this.showInfo(data)}</Text>

                                <View style={styles.headHandle}>
                                    <TouchableOpacity style={[styles.headWant, {marginRight: 15}]}>
                                        <Image style={styles.wish} resizeMode={'center'}
                                               source={require('../../../images/douBan/movie/ic_info_wish.png')}/>
                                        <Text style={BaseStyle.s10c999999}>想看</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.headWant}>
                                        <Image style={styles.wish} resizeMode={'center'}
                                               source={require('../../../images/douBan/movie/ic_info_wish.png')}/>
                                        <Text style={BaseStyle.s10c999999}>看过</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                        <View style={styles.score}>
                            <View style={styles.scoreTm}>
                                <Text style={BaseStyle.s12cFFFFFF}>豆瓣评分</Text>
                                <Text style={[BaseStyle.s5cFFFFFF, styles.tm]}>TM</Text>
                            </View>

                            <View style={styles.scoreContent}>
                                <View style={styles.scorePoints}>
                                    <Text style={BaseStyle.s30cFFFFFF}>{data.rating && data.rating.average}</Text>
                                    <View style={styles.starScore}>
                                        {data.rating && [1, 2, 3, 4, 5].map((obj, index) => {
                                            return (<Image key={obj + index} style={styles.starIcon}
                                                           resizeMode={'cover'}
                                                           source={index < (data.rating.stars / 10) ?
                                                               require('../../../images/douBan/movie/rating_star_small_on.png') :
                                                               require('../../../images/douBan/movie/rating_star_small_off.png')}/>
                                            )
                                        })}
                                    </View>
                                </View>
                                <View>
                                    <View>
                                        <View style={styles.starAllScore}>
                                            <View style={styles.scoreScale}>
                                                {[1, 2, 3, 4, 5].map((obj, index) => {
                                                    return (<Image key={obj + index} style={styles.starIcon}
                                                                   resizeMode={'cover'}
                                                                   source={require('../../../images/douBan/movie/rating_star_small_off.png')}/>
                                                    )
                                                })}
                                            </View>
                                            <View style={styles.scaleBg}>
                                                {data.rating && <View
                                                    style={[styles.scaleElect, {width: data.rating.details['5'] / total * 150}]}></View>}
                                            </View>
                                        </View>

                                        <View style={styles.starAllScore}>
                                            <View style={styles.scoreScale}>
                                                {[1, 2, 3, 4].map((obj, index) => {
                                                    return (<Image key={obj + index} style={styles.starIcon}
                                                                   resizeMode={'cover'}
                                                                   source={require('../../../images/douBan/movie/rating_star_small_off.png')}/>
                                                    )
                                                })}
                                            </View>
                                            <View style={styles.scaleBg}>
                                                {data.rating && <View
                                                    style={[styles.scaleElect, {width: data.rating.details['4'] / total * 150}]}></View>}
                                            </View>
                                        </View>

                                        <View style={styles.starAllScore}>
                                            <View style={styles.scoreScale}>
                                                {[1, 2, 3].map((obj, index) => {
                                                    return (<Image key={obj + index} style={styles.starIcon}
                                                                   resizeMode={'cover'}
                                                                   source={require('../../../images/douBan/movie/rating_star_small_off.png')}/>
                                                    )
                                                })}
                                            </View>
                                            <View style={styles.scaleBg}>
                                                {data.rating && <View
                                                    style={[styles.scaleElect, {width: data.rating.details['3'] / total * 150}]}></View>}
                                            </View>
                                        </View>

                                        <View style={styles.starAllScore}>
                                            <View style={styles.scoreScale}>
                                                {[1, 2].map((obj, index) => {
                                                    return (<Image key={obj + index} style={styles.starIcon}
                                                                   resizeMode={'cover'}
                                                                   source={require('../../../images/douBan/movie/rating_star_small_off.png')}/>
                                                    )
                                                })}
                                            </View>
                                            <View style={styles.scaleBg}>
                                                {data.rating && <View
                                                    style={[styles.scaleElect, {width: data.rating.details['2'] / total * 150}]}></View>}
                                            </View>
                                        </View>

                                        <View style={styles.starAllScore}>
                                            <View style={styles.scoreScale}>
                                                {[1].map((obj, index) => {
                                                    return (<Image key={obj + index} style={styles.starIcon}
                                                                   resizeMode={'cover'}
                                                                   source={require('../../../images/douBan/movie/rating_star_small_off.png')}/>
                                                    )
                                                })}
                                            </View>
                                            <View style={styles.scaleBg}>
                                                {data.rating && <View
                                                    style={[styles.scaleElect, {width: data.rating.details['1'] / total * 150}]}></View>}
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text
                                            style={BaseStyle.s10cABABAE}>{total}人评价
                                        </Text>
                                    </View>

                                </View>

                            </View>

                            <View style={styles.collect}>
                                <Text
                                    style={BaseStyle.s12cABABAE}>{data.collect_count}人看过{`  ${data.wish_count}`}人想看
                                </Text>
                            </View>
                        </View>


                        <ScrollView horizontal={true}>
                            <View style={styles.channelScroll}>
                                <Text style={BaseStyle.s12cABABAE}>所属频道</Text>
                                {
                                    data.tags && data.tags.map((tag, index) => {
                                        return (
                                            <View key={tag + index} style={styles.channel}>
                                                <Text style={BaseStyle.s12cFFFFFF}>{tag}</Text>
                                            </View>)
                                    })
                                }
                            </View>
                        </ScrollView>

                        <Text style={BaseStyle.s14cFFFFFF}>剧情简介</Text>
                        <Text style={[BaseStyle.s12cFFFFFF, styles.plot]}>{data.summary}</Text>

                        <View>
                            <Text style={[BaseStyle.s14cFFFFFF, styles.actorTitle]}>演员表</Text>

                            <ScrollView horizontal={true}>
                                {
                                    data.casts && data.directors && data.directors.concat(data.casts).map((actor, index) => {
                                        return (
                                            <View key={actor + index} style={styles.actor}>
                                                <Image style={styles.actorIcon}
                                                       source={{uri: actor.avatars && actor.avatars.small}}
                                                       resizeMode={'cover'}/>

                                                <Text style={[BaseStyle.s12cFFFFFF, styles.actorText]}
                                                      ellipsizeMode={'tail'}
                                                      numberOfLines={1}>{actor.name_en}</Text>

                                                <Text style={BaseStyle.s10cABABAE} ellipsizeMode={'tail'}
                                                      numberOfLines={1}>{actor.name}</Text>
                                            </View>
                                        )

                                    })
                                }
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={[BaseStyle.s14cFFFFFF, styles.photoTitle]}>预告片 / 剧照</Text>

                            <ScrollView horizontal={true}>
                                {
                                    data.photos && data.photos.map((photo, index) => {
                                        return (
                                            <Image
                                                key={photo + index}
                                                style={styles.photoIcon}
                                                source={{uri: photo.thumb}}
                                                resizeMode={'cover'}/>
                                        )

                                    })
                                }
                            </ScrollView>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    content: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        backgroundColor: '#46281F',
    },


    head: {
        flexDirection: 'row',
        height: 120,
    },

    headIcon: {
        width: 90,
        height: 120,
        marginRight: 15,
    },

    headerContent: {
        flex: 1
    },

    headHandle: {
        flexDirection: 'row',
        marginTop: 5,
    },

    headWant: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.cFFFFFF,
        height: 28,
        borderRadius: 5,
    },

    wish: {
        width: 15,
        height: 15,
        marginRight: 5,
    },


    score: {
        backgroundColor: Color.c382018,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
    },

    scoreTm: {
        flexDirection: 'row',
    },

    tm: {
        alignSelf: 'flex-start',
    },

    scoreContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: Color.c4F3B34,
        borderBottomWidth: 1,
        paddingVertical: 5,
    },

    scorePoints: {
        alignItems: 'center',
        marginRight: 10,
    },

    starAllScore: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    scoreScale: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 40,
        marginRight: 5
    },

    scaleBg: {
        backgroundColor: Color.c412B24,
        width: 150,
        height: 5,
        borderRadius: 3,
    },

    scaleElect: {
        backgroundColor: Color.cF1AE4B,
        height: 5,
        borderRadius: 3,
    },

    starScore: {
        flexDirection: 'row',
    },

    starIcon: {
        width: 8,
        height: 8,
    },

    collect: {
        alignItems: 'flex-end',
        paddingVertical: 5
    },


    channelScroll: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },

    channel: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.c382018,
        borderRadius: 10,
    },

    plot: {
        marginVertical: 10,
    },

    actorTitle: {
        marginBottom: 10,
    },

    actor: {
        marginRight: 10,
        width: 70,
    },

    actorIcon: {
        width: 70,
        height: 100
    },

    actorText: {
        marginVertical: 5
    },


    photoTitle: {
        marginVertical: 10,
    },

    photoIcon: {
        width: 100,
        height: 100,
        marginRight: 5,
    },

});

