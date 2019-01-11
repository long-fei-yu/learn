import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import Color from '../../../lib/color';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import NewsComponent from '../newsComponent';
import Http from "../../../lib/http";
import {URLS} from "../../../lib/urls";
import _ from "lodash";
import {formatDate} from '../../../lib/public';
import {connect} from 'react-redux';
import * as dailyDetailAction from '../../../redux/actions/dailyDetailAction';

@connect(
    null,
    dispatch => (
        {
            setId: id => {
                dispatch(dailyDetailAction.setId(id))
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
            isShowTop: false,
            topText: '',
            dataHigh: [200],
        };
    }

    componentDidMount() {
        let {dataStories, dataHigh} = this.state;
        let copyStories = _.clone(dataStories);
        let copyDataHigh = _.clone(dataHigh);
        let length = copyDataHigh.length;

        Http.get({url: URLS.latest}, (res) => {
            copyDataHigh.push(copyDataHigh[length - 1] + res.stories.length * 110);

            this.setState({
                topStories: res.top_stories,
                date: res.date,
                dataStories: _.concat(copyStories, {
                    date: res.date,
                    stories: res.stories,
                }),
                dataHigh: copyDataHigh,
            });
        });
    }

    getBefore = () => {
        let {date, dataStories, dataHigh} = this.state;
        let copyStories = _.clone(dataStories);
        let copyDataHigh = _.clone(dataHigh);
        let length = copyDataHigh.length;

        Http.get({url: `${URLS.before + date}`}, (res) => {
            copyDataHigh.push(copyDataHigh[length - 1] + res.stories.length * 110 + 40);

            this.setState({
                date: res.date,
                dataStories: _.concat(copyStories, res),
                dataHigh: copyDataHigh,
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
        this.props.setId(id);
        this.push('DailyDetail');
    };

    onContentScroll = e => {
        let {dataStories, dataHigh} = this.state;

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

        console.log('dataHigh', dataHigh);
        for (let i = 0; i < dataHigh.length; i++) {
            let j = (i === dataHigh.length - 1 ? dataHigh.length - 1 : i + 1);
            if (offsetY > dataHigh[i] && offsetY < dataHigh[j]) {
                this.setState(
                    {
                        isShowTop: true,
                        topText: dataStories[i].date === formatDate(new Date(), 'yyyyMMdd') ? '今日新闻' : this.strToWeeks(dataStories[i].date),
                    }
                );
                return;
            } else {
                this.setState(
                    {
                        isShowTop: false,
                        topText: '',
                    }
                );
            }
        }
    };

    showTop = () => {
        const {topText} = this.state;
        return (
            <View style={styles.time}>
                <Text
                    style={BaseStyle.s14cFFFFFF}>{topText}</Text>
            </View>
        )
    };

    render() {
        const {isShowTop, topStories, dataStories} = this.state;

        return (
            <View style={BaseStyle.content}>

                {isShowTop && this.showTop()}

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
                                                        <NewsComponent
                                                            index={index}
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
            </View>
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
