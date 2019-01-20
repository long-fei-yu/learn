import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from '../../../lib/baseStyle';
import _ from 'lodash';
import http from '../../../lib/http';
import {URLS} from '../../../lib/urls';
import PropTypes from 'prop-types';
import Color from '../../../lib/color';

export default class ColumnContainer extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        http.get({url: URLS.sections}, (res) => {
            this.setState({
                data: res.data,
            });
        })
    }

    onPress = (item) => {
        this.navigate('ColumnDetail', {id: item.id});
    };

    render() {
        const {data} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    <FlatList
                        keyExtractor={(item, index) => item + index}
                        columnWrapperStyle={styles.columnWrapper}
                        horizontal={false}
                        numColumns={2}
                        data={data}
                        renderItem={({item, index}) => <ColumnItem name={item.name} thumbnail={item.thumbnail}
                                                                   index={index}
                                                                   onPress={this.onPress.bind(this, item)}/>}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

class ColumnItem extends Component {

    static propTypes = {
        name: PropTypes.string,
        thumbnail: PropTypes.string,
        index: PropTypes.number,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        name: '',
        thumbnail: '',
        index: 0,
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {name, thumbnail, index, onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View
                    style={[styles.item, {marginLeft: index % 2 === 0 ? 0 : 5, marginRight: index % 2 === 0 ? 5 : 0}]}>
                    <Text style={[styles.name, BaseStyle.s16c999999]} ellipsizeMode={'tail'}
                          numberOfLines={1}>{name}</Text>
                    <Image style={styles.icon} source={{uri: thumbnail}} resizeMode={'cover'}/>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    columnWrapper: {
        paddingHorizontal: 15,
        marginBottom: 15,
        marginTop: 10
    },
    item: {
        width: (deviceParameter.pw - 40) / 2,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: Color.c939393,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    icon: {
        flex: 1,
        height: (deviceParameter.pw - 60) / 2,
    },
    name: {
        flex: 1,
        marginBottom: 5,
        paddingRight: 15,
    }

});
