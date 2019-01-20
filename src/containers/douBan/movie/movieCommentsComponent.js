import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Animated, TouchableOpacity, Image} from 'react-native';
import BaseStyle from '../../../lib/baseStyle';
import Color from '../../../lib/color';
import _ from 'lodash';
import HttpUtil from '../../../lib/http';
import {URLS} from '../../../lib/urls';
import Dimen from '../../../lib/dimen';
import RefreshFlatList from '../../../components/refreshFlatList';
import PropTypes from 'prop-types';

const PAGE_SIZE = 10;

export default class MovieCommentsComponent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            distance: new Animated.Value(15),

            count: 10,
            start: 0,
            commentData: null,
            total: 0,
            isRefreshing: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.onRefresh();
    }

    /**
     * 电影条目短评
     * @param page
     */
    getMovieComments = page => {
        HttpUtil.getDouBan({
            url: URLS.subject + this.props.id + '/reviews',
            param: {start: page, count: PAGE_SIZE, client: '', udid: ''}
        }, res => {
            if (page == 0) {
                this.onRefreshEnd(res);
            } else {
                this.onLoadMoreEnd(res);
            }
        });
    };

    onRefresh = () => {
        this.setState({
            isRefreshing: true
        });
        if (this.state.index === 0) {
            this.getMovieComments(0);
        }
    };

    onRefreshEnd = (res) => {
        const {index} = this.state;

        this.setState({
            commentData: index === 0 ? res.reviews : null,
            total: res.total,
            count: res.count,
            start: res.start,
            isRefreshing: false
        });
    };

    onLoadMore = (page) => {
        this.setState({
            isLoading: true
        });

        if (this.state.index === 0) {
            this.getMovieComments(page);
        }
    };

    onLoadMoreEnd = (res) => {
        const {index, commentData} = this.state;
        let commentArr = _.clone(commentData);

        this.setState({
            commentData: _.concat(commentArr, index === 0 ? res.reviews : null),
            total: res.total,
            count: res.count,
            start: res.start,
            isLoading: false
        });
    };

    onSwitch = (index) => {
        this.setState({
            index,
            count: 10,
            start: 0,
            commentData: null,
            total: 0,
            isRefreshing: false,
            isLoading: false,
        });

        if (index === 0) {
            this.getMovieComments(0);
        }

        Animated.timing(this.state.distance, {
            toValue: index * (deviceParameter.pw - 30) / 4 + 15,
            duration: 300,
        }).start();
    };

    renderHeader = () => {
        const {index, distance} = this.state;

        return (
            <View>
                <View style={styles.title}>
                    <TouchableOpacity style={styles.titleItem} onPress={() => {
                        this.onSwitch(0);
                    }}>
                        <Text
                            style={{
                                color: index === 0 ? Color.c333333 : Color.c999999,
                                fontSize: index === 0 ? Dimen.s16 : Dimen.s14,
                            }}>影评</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.titleItem} onPress={() => {
                        this.onSwitch(1);
                    }}>
                        <Text
                            style={{
                                color: index === 1 ? Color.c333333 : Color.c999999,
                                fontSize: index === 1 ? Dimen.s16 : Dimen.s14,
                            }}>话题</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.titleItem} onPress={() => {
                        this.onSwitch(2);
                    }}>
                        <Text
                            style={{
                                color: index === 2 ? Color.c333333 : Color.c999999,
                                fontSize: index === 2 ? Dimen.s16 : Dimen.s14,
                            }}>讨论</Text>
                    </TouchableOpacity>
                </View>

                <Animated.View style={[styles.interval, {marginLeft: distance}]}/>
            </View>
        )
    };

    onPress = () => {

    };


    render() {
        const {commentData, isRefreshing, isLoading, total} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                {commentData && <RefreshFlatList
                    data={commentData}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                    renderHeader={this.renderHeader()}
                    total={total}
                    isRefreshing={isRefreshing}
                    isLoading={isLoading}
                    renderSeparator={() => <View style={styles.separator}/>}
                    renderItem={({item, index}) => <CommentItem avatar={item.author.avatar}
                                                                name={item.author.name}
                                                                ratingValue={item.rating.value}
                                                                title={item.title}
                                                                summary={item.summary}
                                                                comments_count={item.comments_count}
                                                                useful_count={item.useful_count}
                                                                useless_count={item.useless_count}
                                                                onPress={this.onPress.bind(this, item)}/>}
                />}
            </SafeAreaView>
        );
    }
}


class CommentItem extends Component {

    static propTypes = {
        avatar: PropTypes.string,
        name: PropTypes.string,
        ratingValue: PropTypes.number,
        title: PropTypes.string,
        summary: PropTypes.string,
        comments_count: PropTypes.number,
        useful_count: PropTypes.number,
        useless_count: PropTypes.number,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        avatar: '',
        name: '',
        ratingValue: 0,
        title: '',
        summary: '',
        comments_count: 0,
        useful_count: 0,
        useless_count: 0,
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {avatar, name, ratingValue, title, summary, comments_count, useful_count, useless_count, onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress} style={styles.commen}>
                <View style={styles.author}>
                    <Image style={styles.avatarIcon}
                           source={{uri: avatar}}
                           resizeMode={'cover'}/>
                    <Text style={[BaseStyle.s10c999999, styles.name]}>{name}</Text>

                    {[1, 2, 3, 4, 5].map((data, index) => {
                        return (<Image key={data + index} style={styles.starIcon}
                                       resizeMode={'cover'}
                                       source={index < ratingValue ? require('../../../images/douBan/movie/rating_star_small_on.png') :
                                           require('../../../images/douBan/movie/rating_star_small_off.png')}/>
                        )
                    })}
                </View>

                <Text style={BaseStyle.s16c333333}>{title}</Text>

                <Text style={[BaseStyle.s12c333333, styles.summary]}>{summary}</Text>

                <Text style={BaseStyle.s10c999999}>{comments_count}回复 . {useful_count}有用 . {useless_count}转发</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    title: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: Color.cFFFFFF,
        paddingHorizontal: 15,
        borderRadius: 10,
    },


    titleItem: {
        height: 44,
        width: (deviceParameter.pw - 30) / 4,
        justifyContent: 'center',
    },

    interval: {
        width: (deviceParameter.pw - 30) / 4 - 50,
        height: 1,
        marginTop: -5,
        backgroundColor: Color.cEDEDED,
    },


    commen: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    author: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    avatarIcon: {
        width: 20,
        height: 20,
    },

    name: {
        marginHorizontal: 5
    },

    starIcon: {
        width: 10,
        height: 10,
    },

    summary: {
        marginVertical: 10,
    },

    separator: {
        height: 10,
        backgroundColor: Color.cEDEDED,
    }
});

