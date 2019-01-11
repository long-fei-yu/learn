import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ImageBackground, ScrollView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import _ from "lodash";
import PropTypes from 'prop-types';
import {movieData} from './movieData';

export default class MovieContainer extends BaseComponent {

    onRankingClick = id => {

        switch (id) {
            case 'movie_weekly_best':
                //口碑电影
                break;
            case 'movie_hot_weekly':
                //热门电影
                break;
            case 'movie_top250':
                //TOP250
                this.push('MovieTop250');
                break;
        }

    };

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <ScrollView style={BaseStyle.content}>
                    <View style={[BaseStyle.content, styles.wrapper]}>

                        {
                            movieData.groups[0].selected_collections.map((obj, index) => {
                                return (
                                    <Ranking key={obj + index}
                                             bgUri={obj.header_bg_image}
                                             title={obj.short_name}
                                             items={obj.items}
                                             onPress={this.onRankingClick.bind(this, obj.id)}
                                    />
                                )
                            })
                        }

                        <View style={styles.yearRankingTitle}>
                            <Text style={BaseStyle.s16c333333}>豆瓣年度榜单</Text>
                        </View>

                        {
                            movieData.groups[1].selected_collections.map((obj, index) => {
                                return (
                                    <YearRanking key={obj + index} {...obj} />
                                )
                            })
                        }

                        <View style={styles.yearRankingTitle}>
                            <Text style={BaseStyle.s16c333333}>豆瓣高分榜</Text>
                        </View>

                        {
                            movieData.groups[2].selected_collections.map((obj, index) => {
                                return (
                                    <View key={obj + index} style={BaseStyle.movieRanking}>
                                        <TouchableOpacity>
                                            <View style={styles.yearRankingTitle}>
                                                <Text style={BaseStyle.s14c333333}>{`${obj.short_name}TOP20`}</Text>
                                                <View style={styles.yearRankingAll}>
                                                    < Text style={BaseStyle.s12c999999}>全部</Text>
                                                    <Image style={styles.right}
                                                           source={require('../../../images/douBan/mine/ic_forum_arrow_right.png')}/>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.yearRankingContent}>
                                            {obj.items.map((item, index) => <Movie key={item + index} {...item}
                                                                                   index={index}/>)}
                                        </View>
                                    </View>
                                )
                            })
                        }


                    </View>
                </ScrollView>
            </SafeAreaView>
        )
            ;
    }
}


class Ranking extends Component {

    static propTypes = {
        bgUri: PropTypes.string,
        title: PropTypes.string,
        onPress: PropTypes.func,
        items: PropTypes.array,
    };

    static defaultProps = {
        bgUri: '',
        title: '',
        onPress: null,
        items: [],
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {bgUri, title, onPress, items} = this.props;

        return (
            <View style={styles.rankingWrapper}>
                <ImageBackground source={{uri: bgUri}}
                                 style={styles.rankingBg}
                                 resizeMode={'cover'}>
                    <TouchableOpacity style={styles.ranking} onPress={onPress}>
                        <View style={styles.rankingTitle}>
                            <Text style={BaseStyle.s16cFFFFFF}>{title}</Text>
                        </View>
                        <View style={styles.rankingContent}>
                            {items.map((data, index) => {
                                return <NameRank key={data + index} name={`${index}. ${data.title}`} score={data.value}
                                                 dynamic={data.trend}/>
                            })}
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

class NameRank extends Component {

    static propTypes = {
        name: PropTypes.string,
        score: PropTypes.number,
        dynamic: PropTypes.bool,
    };

    static defaultProps = {
        name: '',
        dynamic: '',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {name, score, dynamic} = this.props;

        return (
            <View style={styles.rank}>
                <View style={styles.rankText}>
                    <Text style={BaseStyle.s14cFFFFFF}>{name} </Text>
                    <Text style={[BaseStyle.s12cCE9844, styles.rankScore]}>{score}</Text>
                </View>
                {dynamic && (
                    <Image
                        source={dynamic ? require('../../../images/douBan/movie/arrow_up.png') : require('../../../images/douBan/movie/arrow_down.png')}
                        style={styles.rankDynamic}
                        resizeMode={'center'}/>)}
            </View>
        )
    }
}

class YearRanking extends Component {

    static propTypes = {
        header_bg_image: PropTypes.string,
        type_text: PropTypes.string,
        medium_name: PropTypes.string,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        header_bg_image: '',
        type_text: '',
        medium_name: '',
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {header_bg_image, type_text, medium_name, onPress} = this.props;

        return (
            <View style={styles.rankingWrapper}>
                <ImageBackground source={{uri: header_bg_image}}
                                 style={styles.rankingBg}
                                 resizeMode={'cover'}>
                    <TouchableOpacity style={styles.yearRanking} onPress={onPress}>

                        <Text style={[BaseStyle.s12cFFFFFF, styles.yearRankingText]}>{type_text}</Text>
                        <Text style={[BaseStyle.s18cFFFFFF, styles.yearRankingText]}>{medium_name}</Text>

                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

class Movie extends Component {

    static propTypes = {
        pic: PropTypes.string,
        title: PropTypes.string,
        value: PropTypes.number,
        star_count: PropTypes.number,
        index: PropTypes.number,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        uri: '',
        title: '',
        index: 0,
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {pic, title, value, star_count, index, onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.movieWrapper, {marginLeft: index === 0 ? 0 : 10}]}>
                    <Image
                        source={{uri: pic}}
                        style={styles.movieIcon}
                        resizeMode={'cover'}/>

                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={BaseStyle.s14c333333}>{title} </Text>

                    <View style={styles.movieContent}>
                        <View style={styles.movieContent}>
                            {
                                [1, 2, 3, 4, 5].map((arr, index) => {
                                    return (
                                        <Image
                                            key={arr + index}
                                            source={arr <= star_count ? require('../../../images/douBan/movie/rating_star_xxsmall_on.png') : require('../../../images/douBan/movie/rating_star_xxsmall_off.png')}
                                            style={styles.movieLevel}
                                            resizeMode={'center'}/>
                                    )
                                })
                            }
                        </View>
                        <Text style={BaseStyle.s10c999999}>{value}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 15,
    },


    rankingWrapper: {
        marginTop: 10
    },

    rankingBg: {
        height: 100,
        width: deviceParameter.pw - 30,
    },

    ranking: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 100,
    },

    rankingTitle: {
        flex: 1,
        justifyContent: 'center',
    },

    rankingContent: {
        flex: 3,
        marginBottom: 10,
    },


    rank: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    rankText: {
        flexDirection: 'row',
    },

    rankScore: {
        marginLeft: 10,
    },

    rankDynamic: {
        width: 15,
        height: 15,
    },


    yearRankingTitle: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    yearRankingAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    right: {
        width: 12,
        height: 12,
    },

    movieRanking: {
        marginBottom: 35,
    },


    yearRanking: {
        paddingHorizontal: 10,
        height: 100,
    },

    yearRankingText: {
        marginTop: 10,
    },

    yearRankingContent: {
        flexDirection: 'row',
    },


    movieWrapper: {
        width: (deviceParameter.pw - 50) / 3,
    },

    movieIcon: {
        width: (deviceParameter.pw - 50) / 3,
        height: 100,
        marginBottom: 10,
    },

    movieContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },

    movieLevel: {
        width: 10,
        height: 10,
    }


});

