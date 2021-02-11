import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import BaseStyle from '../../../lib/baseStyle';
import Color from '../../../lib/color';
import _ from 'lodash';
import {keys, load, clear} from '../../../lib/storage';
import {withNavigation} from 'react-navigation';

class SearchComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recordData: [],
        };

        this._loadHistory = props.navigation.addListener('didFocus', this.loadHistory);
    }

    componentWillUnmount() {
        this._loadHistory.remove();
    }

    loadHistory = async () => {
        let value = await load(keys.history);

        if (value) {
            this.setState({
                recordData: value.split(','),
            });
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }


    onDeletePress = async () => {
        await clear([keys.history]);

        this.setState({
            recordData: [],
        });
    };

    onMorePress = () => {

    };

    render() {
        const {recordData} = this.state;

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

                            {recordData.map((record, index) => {
                                return (
                                    <View key={record + index} style={[styles.historyText, {
                                        width: record.length * 14 + 8,
                                    }]}>
                                        <Text
                                            style={BaseStyle.s14c333333}>{record}</Text>
                                    </View>
                                )
                            })}
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
        flexDirection: 'row',
        marginTop: 10,
        flexWrap: 'wrap',
    },

    historyText: {
        height: 25,
        backgroundColor: Color.cF7F7F7,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 3,
    }

});

export default withNavigation(SearchComponent);
