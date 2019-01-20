import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from '../../../lib/baseStyle';
import Color from '../../../lib/color';
import _ from 'lodash';
import {connect} from 'react-redux';
import HttpUtil from '../../../lib/http';
import {URLS} from '../../../lib/urls';

const PAGE_SIZE = 10;

@connect(
    state => (
        {
            movieDetailsReducer: state.movieDetailsReducer
        }
    ),
    null
)
export default class MovieDetailsContainer extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }

    componentDidMount() {

        this.getMovieReviews(0);
        this.getMovieComments(0);
    }

    /**
     * 电影条目长评
     * @param page
     */
    getMovieReviews = page => {
        HttpUtil.getDouBan({
            url: URLS.subject + this.props.movieDetailsReducer.id + '/reviews',
            param: {start: page, count: PAGE_SIZE, client: '', udid: ''}
        }, res => {

        });
    };

    /**
     * 电影条目短评
     * @param page
     */
    getMovieComments = page => {
        HttpUtil.getDouBan({
            url: URLS.subject + this.props.movieDetailsReducer.id + '/comments',
            param: {start: page, count: PAGE_SIZE, client: '', udid: ''}
        }, res => {

        });
    };

    showInfo = (data) => {
        let res = '';

        if (_.isArray(data.countries)) {
            for (let countrie of data.countries) {
                res += countrie + ' ';
            }
            res += '/ ';
        }

        if (_.isArray(data.genres)) {
            for (let genre of data.genres) {
                res += genre + ' ';
            }

            res += '/ ';
        }

        if (_.isArray(data.pubdates)) {
            res += data.pubdates[0] + '上映';
            res += '/ ';
        }

        if (_.isArray(data.durations)) {
            for (let duration of data.durations) {
                res += '片长' + duration + ' ';
            }
        }

        return res;
    };

    render() {
        const {data} = this.state;

        let total = 0;
        let details = data.rating && data.rating.details;
        for (let key in details) {
            total += details[key];
        }

        return (
            <SafeAreaView style={BaseStyle.container}>
                <ScrollView>
                    <View style={styles.content}>
                        <Text>长评论</Text>
                        <Text>短评乱</Text>
                    </View>



                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({});

