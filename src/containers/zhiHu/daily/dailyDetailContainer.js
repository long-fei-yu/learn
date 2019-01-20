import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
    WebView,
    ScrollView,
    Image
} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from '../../../lib/baseStyle';
import Http from '../../../lib/http';
import {URLS} from '../../../lib/urls';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Color from '../../../lib/color';
import {connect} from 'react-redux';

@connect(
    state => (
        {
            dailyDetailReducer: state.dailyDetailReducer
        }
    ),
    null
)
export default class DailyDetailContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            extraData: {},
        };
        this.setParams({title: ''})
    }

    componentDidMount() {
        Http.get({url: `${URLS.news + this.props.dailyDetailReducer.id}`}, (res) => {
            this.setState({
                data: res,
            });
            this.setParams({title: res.title})
        });

        Http.get({url: `${URLS.storyExtra + this.props.dailyDetailReducer.id}`}, (res) => {
            this.setState({
                extraData: res,
            });
        });
    }

    /**
     * 评论
     */
    comment = () => {
        const {id} = this.state.data;
        const {long_comments, short_comments} = this.state.extraData;
        this.push('DailyComment', {id, long_comments, short_comments});
    };

    /**
     * 点赞
     */
    praise = () => {

    };

    /**
     * 分享
     */
    share = () => {

    };

    /**
     * 加载css和js
     * @param body
     * @returns {string}
     */
    htmlStr = () => {
        const {body, css: cssArray, js: jsArray} = this.state.data;

        let cssStr = '';
        if (_.isArray(cssArray)) {
            for (let css of cssArray) {
                cssStr += `<link rel="stylesheet" type="text/css" href="${css}"/>`
            }
        }

        let jsStr = '';
        if (_.isArray(jsArray)) {
            for (let js of jsArray) {
                jsStr += `<script src="${js}" type="text/javascript" charSet="utf-8"/>`
            }
        }

        let meta = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0"/>`;

        let htmlData = `<html><head>${meta + cssStr + jsStr}</head> <body>${body}</body></html>`;
        return htmlData;
    };

    render() {
        const {image, title, image_source} = this.state.data;

        const {popularity, comments} = this.state.extraData;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    <ScrollView style={BaseStyle.content}>
                        <ImageBackground source={{uri: image}} style={styles.wrapper} resizeMode={'cover'}>
                            <View style={styles.head}>
                                <Text style={[BaseStyle.s18cFFFFFF, styles.title]}>{title}</Text>
                                <Text style={[BaseStyle.s12cD9D9D9, styles.source]}>图片:{image_source}</Text>
                            </View>
                        </ImageBackground>

                        <WebView source={{html: this.htmlStr()}} originWhitelist={["*"]}
                                 javaScriptEnabled={true}
                                 style={styles.webBody}/>
                    </ScrollView>

                    <View style={styles.bottom}>
                        <Option text={comments} path={require('../../../images/zhiHu/message_more.png')}
                                onPress={this.comment}/>

                        <Option text={popularity} path={require('../../../images/zhiHu/comment_vote.png')}
                                onPress={this.praise}/>

                        <TouchableOpacity style={styles.option} onPress={this.share}>
                            <Image source={require('../../../images/zhiHu/browser_share.png')} style={styles.optionIcon}
                                   resizeMode={'cover'}/>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

class Option extends Component {

    static propTypes = {
        text: PropTypes.number,
        path: PropTypes.number,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        text: 0,
        path: '',
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {text, path, onPress} = this.props;

        return (
            <TouchableOpacity style={styles.option} onPress={onPress}>
                <View>
                    <Image source={path}
                           style={styles.optionIcon}
                           resizeMode={'cover'}/>
                    <Text style={styles.optionText}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        height: 200,
        width: deviceParameter.pw,
    },
    head: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        paddingLeft: 15,
        paddingRight: 30,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    source: {
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
        marginBottom: 10,
    },

    webBody: {
        height: deviceParameter.ph - 230,
    },

    bottom: {
        height: 30,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: Color.cD9D9D9,
        paddingTop: 8
    },
    option: {
        flex: 1,
        alignItems: 'center'
    },
    optionText: {
        alignSelf: 'flex-end',
        marginTop: -35,
        marginRight: -18
    },
    optionIcon: {
        width: 30,
        height: 30,
    },


});
