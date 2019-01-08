import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import {View, FlatList} from 'react-native';

export default class Class extends Component {

    static propTypes = {
        data: PropTypes.array,
        renderItem: PropTypes.func,
    };

    static defaultProps = {
        data: [],
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }


    render() {

        const {data, renderItem} = this.props;

        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                />
            </View>
        );
    }


}