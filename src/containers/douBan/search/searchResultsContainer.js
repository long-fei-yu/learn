import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from '../../../lib/baseStyle';
import Http from '../../../lib/http';
import {URLS} from '../../../lib/urls';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RefreshFlatList from '../../../components/refreshFlatList';
import {connect} from 'react-redux';
import * as movieDetailsAction from '../../../redux/actions/movieDetailsAction';
import Color from '../../../lib/color';

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
export default class SearchResultsContainer extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            subjects: null,
            total: 0,
            count: 10,
            start: 0,
            title: '',

            isRefreshing: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.onRefresh();
    }

    //标签搜索
    getSearch = (page) => {
        Http.getDouBan({
            url: URLS.search,
            param: {tag: this.getRouteParams().text, start: page, count: PAGE_SIZE, client: '', udid: ''}
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
        this.getSearch(0);
    };

    onRefreshEnd = (res) => {
        this.setState({
            subjects: res.subjects,
            total: res.total,
            count: res.count,
            start: res.start,
            title: res.title,
            isRefreshing: false
        });
    };

    onLoadMore = (page) => {
        this.setState({
            isLoading: true
        });
        this.getSearch(page);
    };

    onLoadMoreEnd = (res) => {
        let subjectArr = _.clone(this.state.subjects);

        this.setState({
            subjects: _.concat(subjectArr, res.subjects),
            total: res.total,
            count: res.count,
            start: res.start,
            title: res.title,
            isLoading: false
        });
    };


    onDetailsPress = (item) => {
        this.props.setMovieId(item.id);
        this.push('MovieDetails');
    };

    showSubtypeTitle = (subtype) => {
        switch (subtype) {
            case'movie':
                return '电影';
            case'tv':
                return '音乐';
            default:
                return '';
        }
    };

    showMovieInfo = (item) => {
        let res = `${item.rating.average}分 /${item.year} / `;

        for (let genre of item.genres) {
            res += `${genre} `;
        }

        for (let cast of item.casts) {
            res += ` ${cast.name} / `;
        }

        return res.substr(0, res.length - 2);
    };

    render() {
        const {subjects, total, isRefreshing, isLoading} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>
                    <RefreshFlatList
                        data={subjects}
                        onRefresh={this.onRefresh}
                        onLoadMore={this.onLoadMore}
                        total={total}
                        isRefreshing={isRefreshing}
                        isLoading={isLoading}
                        renderSeparator={() => <View style={styles.separator}/>}
                        renderItem={({item, index}) => <SearchItem uri={item.images.small}
                                                                   subtype={this.showSubtypeTitle(item.subtype)}
                                                                   has_video={item.has_video}
                                                                   title={item.title} year={item.year}
                                                                   movieInfo={this.showMovieInfo(item)}
                                                                   onDetailsPress={this.onDetailsPress.bind(this, item)}/>}
                    />


                </View>
            </SafeAreaView>
        );
    }
}


class SearchItem extends Component {

    static propTypes = {
        uri: PropTypes.string,
        subtype: PropTypes.string,
        has_video: PropTypes.bool,
        title: PropTypes.string,
        year: PropTypes.string,
        movieInfo: PropTypes.string,
        onDetailsPress: PropTypes.func,
    };

    static defaultProps = {
        uri: '',
        subtype: '',
        has_video: false,
        title: '',
        year: '',
        movieInfo: '',
        onDetailsPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {uri, subtype, has_video, title, year, movieInfo, onDetailsPress} = this.props;

        return (
            <TouchableOpacity onPress={onDetailsPress} style={styles.theatersContent}>
                <Image style={styles.movieIcon}
                       source={{uri: uri}}
                       resizeMode={'cover'}/>

                <View style={styles.movieInfo}>
                    <Text style={BaseStyle.s12c999999}>{subtype} </Text>

                    <View style={styles.movieNameYear}>
                        {has_video && <Image style={styles.play} resizeMode={'center'}
                                             source={require('../../../images/douBan/movie/ic_can_play_17.png')}/>}
                        <Text style={[BaseStyle.s16c333333, styles.movieName]}>{title}
                            <Text style={BaseStyle.s14c999999}>{`(${year})`}</Text>
                        </Text>
                    </View>

                    <Text style={BaseStyle.s12c999999}>{movieInfo}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({

    theatersContent: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
    },


    movieIcon: {
        width: 65,
        height: 85,
    },

    movieInfo: {
        flex: 1,
        height: 80,
        marginLeft: 10,
    },

    movieNameYear: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },

    play: {
        width: 15,
        height: 15,
        marginRight: 5,
    },

    movieName: {
        paddingRight: 5,
    },

    separator: {
        height: 0.5,
        marginHorizontal: 15,
        backgroundColor: Color.cEDEDED,
    }
});
