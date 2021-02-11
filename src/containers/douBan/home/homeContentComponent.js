import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Animated, TouchableOpacity} from 'react-native';
import BaseStyle from '../../../lib/baseStyle';
import Color from '../../../lib/color';
import _ from 'lodash';
import Dimen from '../../../lib/dimen';
import RefreshFlatList from '../../../components/refresh/refreshFlatList';
import Http from '../../../lib/http';
import {URLS} from '../../../lib/urls';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as movieDetailsAction from '../../../redux/actions/movieDetailsAction';
import {withNavigation} from 'react-navigation';
import RefreshState from '../../../components/refresh/refreshState';

const PAGE_SIZE = 10;

@connect(
    null,
    dispatch => (
        {
            setMovieId: id => {
                dispatch(movieDetailsAction.setMovieId(id));
            }
        }
    )
)
class HomeContentComponent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    constructor(props) {
        super(props);

        this.state = {
            index: 1,
            distance: new Animated.Value(deviceParameter.pw / 5 + 10),
            subjects: null,
            total: 0,
        }
    }

    componentDidMount() {
        this.onRefresh();
    }


    //正在热映
    getInTheaters = (page) => {
        Http.getDouBan({url: URLS.in_theaters, param: {start: page, count: PAGE_SIZE, client: '', udid: ''}}, res => {
            if (page == 0) {
                this.onRefreshEnd(res);
            } else {
                this.onLoadMoreEnd(res);
            }
        });
    };

    //即将上映
    getComingSoon = (page) => {
        Http.getDouBan({url: URLS.coming_soon, param: {start: page, count: PAGE_SIZE, client: '', udid: ''}}, res => {
            if (page == 0) {
                this.onRefreshEnd(res);
            } else {
                this.onLoadMoreEnd(res);
            }
        });
    };

    onRefresh = () => {
        if (this.state.index === 1) {
            this.getInTheaters(0);
        } else if (this.state.index === 3) {
            this.getComingSoon(0);
        }
    };

    onRefreshEnd = (res) => {
        this.setState({
            subjects: res.subjects,
            total: res.total,
        });

        this.listView.endRefreshing(RefreshState.Idle);
    };

    onLoadMore = (page) => {
        if (this.state.index === 1) {
            this.getInTheaters(page);
        } else if (this.state.index === 3) {
            this.getComingSoon(page);
        }
    };

    onLoadMoreEnd = (res) => {
        let subjectArr = _.clone(this.state.subjects);

        this.setState({
            subjects: _.concat(subjectArr, res.subjects),
            total: res.total,
        });

        this.listView.endRefreshing(RefreshState.Idle);
    };

    onSwitch = (index) => {
        this.listView.endRefreshing(RefreshState.Idle);

        this.setState({
            index,
            subjects: null,
            total: 99,
        });

        if (index === 1) {
            this.getInTheaters(0);
        } else if (index === 3) {
            this.getComingSoon(0);
        }

        Animated.timing(this.state.distance, {
            toValue: index * deviceParameter.pw / 5 + 10,
            duration: 300,
        }).start();

    };

    showMovieInfo = (item) => {

        let res = ` ${item.year} /`;
        for (let genre of item.genres) {
            res += `${genre} `;
        }

        for (let cast of item.casts) {
            res += ` ${cast.name} /`;
        }

        return res.substr(0, res.length - 1);
    };


    onDetailsPress = (item) => {
        this.props.setMovieId(item.id);
        this.props.navigation.push('MovieDetails');
    };

    onTicketPress = (item) => {
    };

    render() {
        const {index, distance, subjects, total} = this.state;

        return (
            <View style={BaseStyle.content}>

                <View style={styles.title}>
                    <TouchableOpacity style={styles.titleItem} onPress={() => {
                        this.onSwitch(1);
                    }}>
                        <Text
                            style={{
                                color: index === 1 ? Color.cFFFFFF : Color.cEBF6EB,
                                fontSize: index === 1 ? Dimen.s16 : Dimen.s14,
                            }}>影院热映</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.titleItem} onPress={() => {
                        this.onSwitch(3);
                    }}>
                        <Text
                            style={{
                                color: index === 3 ? Color.cFFFFFF : Color.cEBF6EB,
                                fontSize: index === 3 ? Dimen.s16 : Dimen.s14,
                            }}>即将上映</Text>
                    </TouchableOpacity>
                </View>

                <Animated.View style={[styles.interval, {marginLeft: distance}]}/>

                <RefreshFlatList
                    ref={ref => this.listView = ref}
                    data={subjects}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                    total={total}
                    renderSeparator={() => <View style={styles.separator}/>}
                    renderItem={({item, index}) => <InTheatersItem
                        uri={item.images.small}
                        title={item.title} stars={item.rating.stars / 10} average={item.rating.average}
                        movieInfo={this.showMovieInfo(item)} seen={item.collect_count / 10000}
                        onDetailsPress={this.onDetailsPress.bind(this, item)}
                        onTicketPress={this.onTicketPress.bind(this, item)}
                    />}
                />
            </View>
        );
    }
}

class InTheatersItem extends Component {

    static propTypes = {
        uri: PropTypes.string,
        title: PropTypes.string,
        stars: PropTypes.number,
        average: PropTypes.number,
        movieInfo: PropTypes.string,
        seen: PropTypes.number,
        onDetailsPress: PropTypes.func,
        onTicketPress: PropTypes.func,
    };

    static defaultProps = {
        uri: '',
        title: '',
        stars: 0,
        average: 0,
        movieInfo: '',
        seen: 0,
        onDetailsPress: null,
        onTicketPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {uri, title, stars, average, movieInfo, seen, onDetailsPress, onTicketPress} = this.props;

        return (
            <TouchableOpacity onPress={onDetailsPress} style={styles.theatersContent}>
                <Image style={styles.movieIcon}
                       source={{uri: uri}}
                       resizeMode={'cover'}/>

                <View style={styles.movieInfo}>
                    <Text style={BaseStyle.s16c333333}>{title} </Text>

                    <View style={styles.starScore}>
                        {[1, 2, 3, 4, 5].map((data, index) => {
                            return (<Image key={data + index} style={styles.starIcon}
                                           resizeMode={'cover'}
                                           source={index < stars ? require('../../../images/douBan/movie/rating_star_small_on.png') :
                                               require('../../../images/douBan/movie/rating_star_small_off.png')}/>
                            )
                        })}
                        <Text style={[BaseStyle.s10c999999, styles.score]}>{average}</Text>
                    </View>
                    <Text style={BaseStyle.s12c999999}>{movieInfo}</Text>

                </View>

                <View style={styles.segmentation}/>

                <View style={styles.movieRight}>
                    <TouchableOpacity onPress={onTicketPress}>
                        <View style={styles.ticket}>
                            <Text style={BaseStyle.s12cEC7D86}>购票</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={BaseStyle.s10c999999}>{seen}万人看过</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: Color.c6CB962,
    },

    titleItem: {
        height: 44,
        width: deviceParameter.pw / 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: deviceParameter.pw / 5,
    },

    interval: {
        width: deviceParameter.pw / 5 - 20,
        height: 1,
        marginTop: -5,
        backgroundColor: Color.cFFFFFF
    },


    theatersContent: {
        paddingHorizontal: 15,
        paddingTop: 10,
        flexDirection: 'row',
    },

    movieIcon: {
        width: 65,
        height: 85,
    },

    movieInfo: {
        flex: 1,
        height: 80,
        marginHorizontal: 10,
    },

    starScore: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },

    starIcon: {
        width: 15,
        height: 15,
    },

    score: {
        marginLeft: 5,
    },

    segmentation: {
        width: 0.5,
        height: 80,
        backgroundColor: Color.cD8D8D8,
    },

    movieRight: {
        width: 70,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ticket: {
        borderWidth: 1,
        borderColor: Color.cEC7D86,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 22,
        marginBottom: 5,
    },

    separator: {
        height: 0.5,
        marginHorizontal: 15,
        backgroundColor: Color.cEDEDED,
    }
});

export default withNavigation(HomeContentComponent);