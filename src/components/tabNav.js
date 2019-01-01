import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import BaseStyle from '../lib/baseStyle';
import Color from '../lib/color';

const homeIconNormal = require('../images/douBan/ic_tab_home_normal.png');
const homeIconSelected = require('../images/douBan/ic_tab_home_active.png');
const movieIconNormal = require('../images/douBan/ic_tab_group_normal.png');
const movieIconSelected = require('../images/douBan/ic_tab_group_active.png');
const readIconNormal = require('../images/douBan/ic_tab_shiji_normal.png');
const readIconSelected = require('../images/douBan/ic_tab_shiji_active.png');
const mineIconNormal = require('../images/douBan/ic_tab_profile_normal.png');
const mineIconSelected = require('../images/douBan/ic_tab_profile_active.png');

/**
 * 自定义底部导航标签
 */
export default class TabNav extends Component<Props> {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        focused: PropTypes.bool,
    };

    static defaultProps = {
        name: '',
    };

    render() {

        let {name, focused} = this.props;

        let selected, normal;

        if (name === 'Home') {
            name = '首页';
            normal = homeIconNormal;
            selected = homeIconSelected;
        } else if (name === 'Movie') {
            name = '电影';
            normal = movieIconNormal;
            selected = movieIconSelected;
        } else if (name === 'Read') {
            name = '读书';
            normal = readIconNormal;
            selected = readIconSelected;
        } else if (name === 'Mine') {
            name = '我的';
            normal = mineIconNormal;
            selected = mineIconSelected;
        } else {
            name = '首页';
            normal = homeIconNormal;
            selected = homeIconSelected;
        }

        return (
            <View style={styles.tab}>
                <Image source={focused ? selected : normal} resizeMode={'contain'} style={styles.icon}/>
                <Text style={[BaseStyle.s16c333333, {color: focused ? Color.c67BB62 : Color.c939393}]}>{name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        height: 48,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    icon: {
        width: 40,
        height: 40
    },
});
