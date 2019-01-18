import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import BaseStyle from "../../../lib/baseStyle";
import Color from '../../../lib/color';
import _ from "lodash";

export default class SearchComponent extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }


    onDeletePress = () => {

    };

    onMorePress = () => {

    };

    render() {

        return (
            <View style={styles.content}>
                {1 > 0 ? (
                    <View>
                        <View style={styles.lately}>
                            <Text style={BaseStyle.s16c333333}>最近搜索</Text>
                            <TouchableOpacity onPress={this.onDeletePress.bind(this)}>
                                <Image style={styles.delete}
                                       source={require('../../../images/douBan/home/ic_offline_album_delete.png')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.history}>
                            <Text style={[BaseStyle.s14c333333, styles.historyText]}>搜索记录</Text>
                        </View>
                    </View>) : null
                }

                <View style={styles.lately}>
                    <Text style={BaseStyle.s16c333333}>热门搜索</Text>
                    <TouchableOpacity onPress={this.onMorePress.bind(this)}>
                        <Image style={styles.delete}
                               source={require('../../../images/douBan/mine/ic_forum_arrow_right.png')}/>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    content: {
        flex: 1,
        paddingHorizontal: 15,
    },

    lately: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    delete: {
        width: 15,
        height: 15,
    },

    history: {
        marginTop: 10,

    },

    historyText: {
        backgroundColor: Color.cF7F7F7,
        paddingHorizontal: 5,
        paddingVertical: 5,
    }

});
