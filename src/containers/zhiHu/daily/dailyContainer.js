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

export default class DailyContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            topStories: [],
            stories: [],
        };
    }

    componentDidMount() {
        Http.get({url: URLS.latest}, (res) => {
            this.setState({
                topStories: res.top_stories,
                stories: res.stories,
            });
        });
    }

    onPress = (id) => {
        this.push('DailyDetail', {id});
    };

    render() {
        const {topStories, stories} = this.state;

        return (
            <ScrollView style={BaseStyle.content}
                        bounces={false}
                        scrollEnabled={true}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={10}>
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

                    <View style={styles.time}>
                        <Text style={BaseStyle.s14cFFFFFF}>今日新闻</Text>
                    </View>

                    {stories.map((data, index) => {
                        return <NewsCcomponent key={data + index}
                                               url={data.images[0]}
                                               title={data.title}
                                               onPress={this.onPress.bind(this, data.id)}/>

                    })}
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
