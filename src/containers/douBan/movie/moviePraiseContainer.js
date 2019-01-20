import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ImageBackground,
    FlatList
} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from '../../../lib/baseStyle';
import Color from '../../../lib/color';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Http from '../../../lib/http';
import {URLS} from '../../../lib/urls';
import {connect} from 'react-redux';
import * as movieDetailsAction from '../../../redux/actions/movieDetailsAction';

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
export default class MoviePraiseContainer extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            subjects: null,
            title: '',
        }
    }

    componentDidMount() {
        Http.getDouBan({url: URLS.weekly, param: {client: '', udid: ''}}, res => {
            this.setState({
                subjects: res.subjects,
                title: res.title,
            });
        });
    }

    renderHeader = () => {
        return (
            <ImageBackground style={styles.head}
                             resizeMode={'cover'}
                             source={{uri: 'https://img3.doubanio.com/img/files/file-1543564940.png'}}>

                <Image style={styles.headIcon}
                       source={{uri: 'https://img3.doubanio.com/img/roboport/files/file-movie_top250-big_cover.png'}}
                       resizeMode={'cover'}/>

                <View>
                    <Text style={BaseStyle.s18cFFFFFF}>一周口碑电影榜</Text>
                    <Text style={[BaseStyle.s12cABABAE, styles.headText]}>每周五更新 . 共10部</Text>
                </View>

            </ImageBackground>
        )
    };

    showMovieInfo = (item) => {
        let res = '';
        for (let genre of item.genres) {
            res += `${genre} `;
        }

        res += `${res} /`;

        for (let cast of item.casts) {
            res += ` ${cast.name} /`;
        }

        return res.substr(0, res.length - 1);
    };

    onPress = (item) => {
        this.props.setMovieId(item.id);
        this.push('MovieDetails');
    };

    render() {
        const {subjects} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <FlatList
                    keyExtractor={(item, index) => item + index}
                    data={subjects}
                    ListHeaderComponent={this.renderHeader()}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    renderItem={({item, index}) => <PraiseItem number={index + 1}
                                                               uri={item.subject.images.small}
                                                               title={item.subject.title} year={item.subject.year}
                                                               average={item.subject.rating.average}
                                                               movieInfo={this.showMovieInfo(item.subject)}
                                                               stars={item.subject.rating.stars / 10}
                                                               details={item.subject.rating.details}
                                                               onPress={this.onPress.bind(this, item.subject)}/>}
                />
            </SafeAreaView>
        );
    }
}

class PraiseItem extends Component {

    static propTypes = {
        number: PropTypes.number,
        uri: PropTypes.string,
        title: PropTypes.string,
        year: PropTypes.string,
        average: PropTypes.number,
        movieInfo: PropTypes.string,
        stars: PropTypes.number,
        details: PropTypes.object,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        number: 1,
        uri: '',
        title: '',
        year: '',
        average: 0,
        movieInfo: '',
        stars: 0,
        details: [],
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {number, uri, title, year, average, movieInfo, stars, details, onPress} = this.props;

        let total = 0;
        for (let key in details) {
            total += details[key];
        }

        return (
            <TouchableOpacity onPress={onPress} style={styles.top}>

                <View style={styles.topNo}>
                    <Text style={[BaseStyle.s14c93611F, styles.topNoText]}>{`No.${number}`}</Text>
                </View>

                <View style={styles.topContent}>
                    <Image style={styles.movieIcon}
                           source={{uri: uri}}
                           resizeMode={'cover'}/>

                    <View style={styles.movieInfo}>
                        <View style={styles.movieNameYear}>
                            <Text style={[BaseStyle.s16c333333, styles.movieName]}>{title}
                                <Text style={BaseStyle.s14c999999}>{`(${year})`}</Text>
                            </Text>
                        </View>

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

                    <View style={styles.interval}/>

                    <View style={styles.movieRight}>
                        <Image style={styles.wish} resizeMode={'center'}
                               source={require('../../../images/douBan/movie/ic_info_wish.png')}/>
                        <Text style={BaseStyle.s14cF6C77E}>想看</Text>
                    </View>
                </View>

                <View style={styles.evaluation}>
                    <Text style={BaseStyle.s12c999999}>{`${total}评价`}</Text>
                </View>

            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 15,
    },


    head: {
        flexDirection: 'row',
        height: 140,
        width: deviceParameter.pw,
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    headIcon: {
        width: 80,
        height: 80,
        marginRight: 15,
    },

    headText: {
        marginTop: 5,
    },

    top: {
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    topNo: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    topNoText: {
        backgroundColor: Color.cF6C77E,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
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
        marginRight: 5,
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
    },

    separator: {
        height: 10,
        backgroundColor: Color.cEDEDED,
    },

    evaluation: {
        justifyContent: 'center',
        height: 40,
        backgroundColor: Color.cD9D9D9,
        paddingLeft: 10,
        marginBottom: 20,
    }
});

