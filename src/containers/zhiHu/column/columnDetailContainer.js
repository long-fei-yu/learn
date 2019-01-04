import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import _ from "lodash";
import http from '../../../lib/http';
import {URLS} from "../../../lib/urls";
import PropTypes from 'prop-types';
import Color from "../../../lib/color";
import {substrData} from '../../../lib/public';

export default class ColumnDetailContainer extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
        };
    }

    componentDidMount() {
        http.get({url: `${URLS.section + this.getRouteParams().id}`}, (res) => {
            this.setState({
                data: res,
            });

            this.setParams({title: res.name})
        })
    }

    onPress = (id) => {
        this.navigate('DailyDetail', {id});
    };

    render() {
        const {data} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>
                    <FlatList
                        keyExtractor={(item, index) => item + index}
                        data={data.stories}
                        renderItem={({item, index}) => <ColumnDetailItem images={item.images[0]} date={item.date}
                                                                         onPress={this.onPress.bind(this, item.id)}
                                                                         title={item.title}/>}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

class ColumnDetailItem extends Component {

    static propTypes = {
        title: PropTypes.string,
        images: PropTypes.string,
        date: PropTypes.string,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        title: '',
        images: '',
        date: '',
        onPress: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {title, images, date, onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.item}>
                    <Image source={{uri: images}} style={styles.icon} resizeMode={'cover'}/>
                    <View style={styles.right}>
                        <Text style={BaseStyle.s16c333333} ellipsizeMode={'tail'} numberOfLines={2}>{title}</Text>

                        <Text style={[BaseStyle.s12c999999, styles.data]}>{substrData(date)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({

    item: {
        flexDirection: 'row',
        marginHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Color.cD9D9D9,
    },

    right: {
        justifyContent: 'space-between',
        flex: 1,
    },

    icon: {
        width: 80,
        height: 80,
        marginRight: 15,
    },

    data: {
        alignSelf: 'flex-end'
    }
});

