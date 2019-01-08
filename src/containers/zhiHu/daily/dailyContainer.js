import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import Color from '../../../lib/color';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import NewsCcomponent from '../newsCcomponent';
import Http from "../../../lib/http";
import {URLS} from "../../../lib/urls";
import _ from "lodash";
import {formatDate} from '../../../lib/public';
import {connect} from 'react-redux';
import * as dailyAction from '../../../redux/actions/dailyAction';

@connect(
    state => ({}),
    dispatch => (
        {
            slide: title => {
                dispatch(dailyAction.onSlide(title))
            }
        }
    )
)
export default class DailyContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            topStories: [],
            date: '',
            dataStories: [],
        };
    }

    componentDidMount() {
        let {dataStories} = this.state;
        let copyStories = _.clone(dataStories);

        Http.get({url: URLS.latest}, (res) => {
            this.setState({
                topStories: res.top_stories,
                date: res.date,
                dataStories: _.concat(copyStories, {
                    date: res.date,
                    stories: res.stories
                }),
            });
        });
    }

    getBefore = () => {
        let {date, dataStories} = this.state;
        let copyStories = _.clone(dataStories);

        Http.get({url: `${URLS.before + date}`}, (res) => {
            this.setState({
                date: res.date,
                dataStories: _.concat(copyStories, res),
            });
        });
    };

    strToWeeks = (str) => {
        let years = Number(str.substr(0, 4));
        let month = Number(str.substr(4, 2));
        let day = Number(str.substr(6, 2));

        return formatDate(new Date(years, month - 1, day), 'MM月dd日 EEE');
    };

    onPress = (id) => {
        this.push('DailyDetail', {id});
    };

    onContentScroll = e => {
        let {dataStories} = this.state;

        this.props.slide(this.strToWeeks(dataStories[dataStories.length - 1].date));

        //滑动距离
        let offsetY = e.nativeEvent.contentOffset.y;
        //scrollView contentSize高度
        let contentSizeHeight = e.nativeEvent.contentSize.height;
        //scrollView高度
        let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height;


        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            //滑动到底部
            this.getBefore();
        }
    };

    render() {
        const {topStories, dataStories} = this.state;

        return (
            <ScrollView style={BaseStyle.content}
                        bounces={false}
                        scrollEnabled={true}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={10}
                        onScroll={this.onContentScroll}>

                <View style={BaseStyle.container}>

                    <View style={styles.wrapper}>
                        <Swiper height={200} paginationStyle={{bottom: 10}} index={0} autoplay={true}
                                key={topStories.length}>

                            {topStories.map((data, index) => {
                                return (
                                    <View key={data + index}>
                                        <Carousel
                                            onPress={this.onPress.bind(this, data.id)}
                                            title={data.title}
                                            image={data.image}/>
                                    </View>)
                            })}
                        </Swiper>
                    </View>

                    {
                        dataStories.map((data, index) => {
                            return (
                                <View key={data + index}>
                                    {data.date !== formatDate(new Date(), 'yyyyMMdd') ?
                                        (<View style={styles.time}>
                                            <Text
                                                style={BaseStyle.s14cFFFFFF}>{this.strToWeeks(data.date)}</Text>
                                        </View>) : null}

                                    {data.stories.map((data, index) => {
                                            return (
                                                <View key={data + index}>
                                                    <NewsCcomponent
                                                        url={data.images[0]}
                                                        title={data.title}
                                                        onPress={this.onPress.bind(this, data.id)}/>
                                                </View>
                                            )
                                        }
                                    )}
                                </View>
                            )
                        })
                    }
                    <View/>
                </View>
            </ScrollView>
        );
    }
}

class Carousel extends Component {

    static propTypes = {
        image: PropTypes.string,
        title: PropTypes.string,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        image: '',
        title: '',
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {image, title, onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <ImageBackground source={{uri: image}} style={styles.wrapper} resizeMode={'cover'}>
                    <View style={styles.txt}>
                        <Text style={[BaseStyle.s18cFFFFFF, styles.title]}>{title}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 200,
        width: deviceParameter.pw,
    },

    txt: {
        flex: 1,
        justifyContent: 'flex-end',
        fontWeight: 'bold',
    },

    title: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },

    time: {
        backgroundColor: Color.c2EBDED,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
