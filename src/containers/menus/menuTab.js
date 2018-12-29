import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import BaseStyle from '../../lib/baseStyle';
import Color from "../../lib/color";
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class MenuTab extends Component {

    static propTypes = {
        text: PropTypes.string,
        path: PropTypes.number,
        onPress: PropTypes.func,
        isSelect: PropTypes.bool,
    };

    static defaultProps = {
        text: '',
        isSelect: false,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {text, path, onPress, isSelect} = this.props;

        return (
            <TouchableOpacity onPress={onPress}
                              style={[styles.container, {backgroundColor: isSelect ? Color.cE8E8E8 : Color.cFFFFFF}]}>
                <Image style={styles.icon} source={path} resizeMode={'center'}/>
                <Text style={BaseStyle.s16c333333}>{text}</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        width: 40,
        height: 40,
        marginHorizontal: 20,
    }

});
