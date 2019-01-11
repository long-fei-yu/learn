import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import BaseStyle from "../../lib/baseStyle";
import Color from '../../lib/color';
import PropTypes from 'prop-types';
import _ from "lodash";

export default class NewsComponent extends Component {

    static propTypes = {
        index: PropTypes.number,
        url: PropTypes.string,
        title: PropTypes.string,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        index: 0,
        url: '',
        title: '',
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {index, url, title, onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.item, {
                    borderTopWidth: index === 0 ? 0 : 1,
                    borderTopColor: index === 0 ? Color.cFFFFFF : Color.cD9D9D9
                }]}>
                    <Image style={styles.icon}
                           resizeMode={'cover'}
                           source={{uri: url}}/>
                    <Text ellipsizeMode={'tail'} numberOfLines={2}
                          style={[BaseStyle.s16c333333, styles.title]}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        height: 110,
        marginHorizontal: 15,
        paddingVertical: 15,
    },

    icon: {
        width: 80,
        height: 80,
        marginRight: 15,
    },

    title: {
        height: 80,
        flex: 1,
    }
});