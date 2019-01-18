import React, {Component} from 'react';
import _ from "lodash";

export default class SeparatorComponent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        return (
            <View></View>
        )
    }
}