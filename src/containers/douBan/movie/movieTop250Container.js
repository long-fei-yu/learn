import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ImageBackground, ScrollView} from 'react-native';
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
    }

    componentDidMount() {

        Http.getDouBan({url: URLS.top250, param: {start: 0, count: 10, client: '', udid: '111'}}, (res) => {
        });
        
    }

    render() {
        return (
            <SafeAreaView style={BaseStyle.container}>
                <ScrollView style={BaseStyle.content}>

                    <Text>束带结发副书记</Text>

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
        average: PropTypes.string,
        movieInfo: PropTypes.string,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        number: 1,
        uri: '',
        has_video: true,
        title: '',
        year: '',
        average: '',
        movieInfo: '',
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {number, uri, has_video, title, year, average, movieInfo, onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress}>

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
                        <Text style={[BaseStyle.s10c999999, styles.movieScore]}>{average}</Text>

                        <Text style={BaseStyle.s14c999999}>{movieInfo}</Text>

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
        width: 70,
        height: 90,
        backgroundColor: '#ff0000'
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

    movieScore: {
        marginVertical: 5,
        marginLeft: 15,
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

