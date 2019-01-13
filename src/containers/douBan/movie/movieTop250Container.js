import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList, ScrollView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import Color from '../../../lib/color';
import _ from "lodash";
import PropTypes from 'prop-types';
import Http from '../../../lib/http';
import {URLS} from "../../../lib/urls";

export default class MovieTop250Container extends BaseComponent {


    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            total: 0,
            count: 10,
            start: 0,
        }
    }

    componentDidMount() {

        Http.getDouBan({url: URLS.top250, param: {start: 0, count: 10, client: '', udid: ''}}, (res) => {
            this.setState({
                subjects: res.subjects,
                total: res.total,
                count: res.count,
                start: res.start,
            });
        });
    }

    showMovieInfo = (item) => {

        let res = ' ';
        for (let genre of item.genres) {
            res += `${genre} `;
        }

        for (let cast of item.casts) {
            res += ` ${cast.name} /`;
        }

        return res.substr(0, res.length - 1);
    };

    onPress = () => {
        this.push('MovieDetails');
    };

    render() {
        const {subjects} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <ScrollView style={BaseStyle.content}>

                    <FlatList
                        keyExtractor={(item, index) => item + index}
                        data={subjects}
                        renderItem={({item, index}) => <Top250Item number={1} uri={item.images.small}
                                                                   has_video={item.has_video}
                                                                   title={item.title} year={item.year}
                                                                   average={item.rating.average}
                                                                   movieInfo={this.showMovieInfo(item)}
                                                                   index={index}
                                                                   stars={item.rating.stars / 10}
                                                                   onPress={this.onPress.bind(this, item)}/>}
                    />

                </ScrollView>
            </SafeAreaView>
        );
    }
}

class Top250Item extends Component {

    static propTypes = {
        number: PropTypes.number,
        uri: PropTypes.string,
        has_video: PropTypes.bool,
        title: PropTypes.string,
        year: PropTypes.string,
        average: PropTypes.number,
        movieInfo: PropTypes.string,
        index: PropTypes.number,
        stars: PropTypes.number,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        number: 1,
        uri: '',
        has_video: true,
        title: '',
        year: '',
        average: 0,
        movieInfo: '',
        index: 0,
        stars: 0,
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {number, uri, has_video, title, year, average, movieInfo, index, stars, onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress} style={[styles.top, {
                borderTopWidth: index === 0 ? 0 : 10,
                borderTopColor: index === 0 ? Color.cFFFFFF : Color.cD9D9D9
            }]}>

                <View style={styles.topNo}>
                    <Text style={BaseStyle.s14c93611F}>{`No.${number}`}</Text>
                </View>

                <View style={styles.topContent}>
                    <Image style={styles.movieIcon}
                           source={{uri: uri}}
                           resizeMode={'cover'}/>

                    <View style={styles.movieInfo}>
                        <View style={styles.movieNameYear}>
                            {has_video && <Image style={styles.play} resizeMode={'center'}
                                                 source={require('../../../images/douBan/movie/ic_can_play_17.png')}/>}
                            <Text style={[BaseStyle.s16c333333, styles.movieName]}>{title}
                                <Text style={BaseStyle.s14c999999}>{`(${year})`}</Text>
                            </Text>
                        </View>

                        <View style={styles.starScore}>
                            {[1, 2, 3, 4, 5].map((data, index) => {
                                return ( <Image key={data + index} style={styles.starIcon}
                                                resizeMode={'cover'}
                                                source={index < stars ? require('../../../images/douBan/movie/rating_star_xxsmall_on.png') :
                                                    require('../../../images/douBan/movie/rating_star_xxsmall_off.png')}/>
                                )
                            })}
                            <Text style={[BaseStyle.s10c999999, styles.score]}>{average}</Text>
                        </View>
                        <Text style={BaseStyle.s12c999999}>{movieInfo}</Text>

                    </View>

                    <View style={styles.interval}/>

                    <View style={styles.movieRight}>
                        <Image style={styles.wish} resizeMode={'center'}
                               source={require('../../../images/douBan/movie/ic_info_wish.png')}/>
                        <Text style={BaseStyle.s14cF6C77E}>想看</Text>
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


    top: {
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    topNo: {
        backgroundColor: Color.cF6C77E,
        width: 40,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    topContent: {
        flexDirection: 'row',
        marginVertical: 10,
    },

    movieIcon: {
        width: 80,
        height: 100,
    },

    movieInfo: {
        flex: 1,
        height: 80,
        marginHorizontal: 10,
    },

    movieNameYear: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    movieName: {
        marginHorizontal: 5,
    },

    starScore: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },

    score: {
        marginLeft: 5,
    },

    starIcon: {
        width: 15,
        height: 15,
    },

    interval: {
        width: 0.5,
        height: 80,
        backgroundColor: Color.cD8D8D8,
    },

    play: {
        width: 15,
        height: 15
    },

    movieRight: {
        width: 60,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    wish: {
        width: 15,
        height: 15,
        marginBottom: 5,
    }
});

