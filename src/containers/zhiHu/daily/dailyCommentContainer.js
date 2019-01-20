import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Animated,
    FlatList
} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from '../../../lib/baseStyle';
import Http from '../../../lib/http';
import {URLS} from '../../../lib/urls';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Color from '../../../lib/color';
import {strToDate} from '../../../lib/public';

export default class DailyDetailContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            type: 'long',
            distance: new Animated.Value(0),
            longData: [],
            shortData: [],
        };
    }

    componentDidMount() {
        //新闻对应长评论查看
        Http.get({url: `${URLS.comments + this.getRouteParams().id}/long-comments`}, (res) => {
            this.setState({
                longData: res.comments,
            });
        });

        //新闻对应短评论查看
        Http.get({url: `${URLS.comments + this.getRouteParams().id}/short-comments`}, (res) => {
            this.setState({
                shortData: res.comments,
            });
        });
    }

    onTitlePress = (index) => {
        Animated.timing(this.state.distance, {
            toValue: index * deviceParameter.pw / 2,
            duration: 300,
        }).start();

        this.setState({
            type: index === 0 ? 'long' : 'short',
        });
    };

    render() {
        const {type, distance, longData, shortData} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    <View style={styles.title}>

                        <TouchableOpacity style={styles.titleItem} onPress={this.onTitlePress.bind(this, 0)}>
                            <Text
                                style={[BaseStyle.s16c333333, {color: type === 'long' ? Color.c2EBDED : Color.c333333}]}>长评论{this.getRouteParams().long_comments}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.titleItem} onPress={this.onTitlePress.bind(this, 1)}>
                            <Text
                                style={[BaseStyle.s16c333333, {color: type === 'short' ? Color.c2EBDED : Color.c333333}]}>短评论{this.getRouteParams().short_comments}</Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={[styles.interval, {marginLeft: distance}]}/>

                    <FlatList
                        keyExtractor={(item, index) => item + index}
                        data={type === 'long' ? longData : shortData}
                        ItemSeparatorComponent={() => <View style={styles.separator}/>}
                        renderItem={({item, index}) => <ShortItem author={item.author} avatar={item.avatar}
                                                                  content={item.content} time={item.time}
                                                                  reply_to={item.reply_to}/>}
                    />


                </View>
            </SafeAreaView>
        );
    }
}


class ShortItem extends Component {

    static propTypes = {
        avatar: PropTypes.string,
        author: PropTypes.string,
        content: PropTypes.string,
        time: PropTypes.number,
        reply_to: PropTypes.object,
    };

    static defaultProps = {
        avatar: '',
        author: '',
        content: '',
        reply_to: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {avatar, author, content, time, reply_to} = this.props;

        return (
            <View style={styles.short}>
                <Image source={{uri: avatar}} style={styles.shortIcon}/>
                <View style={BaseStyle.content}>
                    <Text style={[BaseStyle.s12c000000,]}>{author}</Text>
                    <Text style={[BaseStyle.s12c333333, styles.shortText]}>{content}</Text>

                    {reply_to && (
                        <Text style={[BaseStyle.s12c000000, styles.shortText]}>{reply_to.author} :
                            <Text style={[BaseStyle.s12c999999]}>{reply_to.content}</Text>
                        </Text>
                    )}

                    <Text style={[BaseStyle.s12c999999, styles.shortText]}>{strToDate(time)}</Text>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        height: 44,
        borderBottomColor: Color.cD9D9D9,
        borderBottomWidth: 1,
    },
    titleItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    interval: {
        width: deviceParameter.pw / 2,
        height: 1,
        marginTop: -2,
        backgroundColor: Color.c2EBDED
    },

    short: {
        flexDirection: 'row',
        marginHorizontal: 15,
        paddingVertical: 10,
    },
    shortIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    shortText: {
        marginTop: 10,
        paddingRight: 5,
    },

    separator: {
        height: 1,
        marginHorizontal: 15,
        backgroundColor: Color.cD9D9D9,
    }

});
