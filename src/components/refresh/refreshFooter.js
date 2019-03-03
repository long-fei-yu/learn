/**
 * Created by huhaibin on 2019/1/25.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import BaseStyle from '../../lib/baseStyle';
import RefreshState from './refreshState';

export default class RefreshFooter extends Component {

    static propTypes = {
        onLoadMore: PropTypes.func,     // 加载更多数据的方法
        onRetryLoading: PropTypes.func, // 重新加载的方法
    };

    static defaultProps = {
        footerRefreshingText: "努力加载中",
        footerLoadMoreText: "上拉加载更多",
        footerFailureText: "点击重新加载",
        footerNoMoreDataText: "已全部加载完毕"
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }


    render() {
        let {state} = this.props;
        let footer = null;

        switch (state) {
            case RefreshState.Idle:
                // Idle情况下为null，不显示尾部组件
                break;
            case RefreshState.Refreshing:
                // 显示一个loading视图
                footer =
                    <View style={styles.loadingView}>
                        <ActivityIndicator size="small"/>
                        <Text style={styles.refreshingText}>{this.props.footerRefreshingText}</Text>
                    </View>;
                break;

            case RefreshState.CanLoadMore:
                // 显示上拉加载更多的文字
                footer =
                    <View style={styles.loadingView}>
                        <Text style={styles.footerText}>{this.props.footerLoadMoreText}</Text>
                    </View>;
                break;
            case RefreshState.NoMoreData:
                // 显示没有更多数据的文字，内容可以自己修改
                footer =
                    <View style={styles.loadingView}>
                        <Text style={styles.footerText}>{this.props.footerNoMoreDataText}</Text>
                    </View>;
                break;
            case RefreshState.Failure:
                // 加载失败的情况使用TouchableOpacity做一个可点击的组件，外部调用onRetryLoading重新加载数据
                footer =
                    <TouchableOpacity style={styles.loadingView} onPress={() => {
                        this.props.onRetryLoading && this.props.onRetryLoading();
                    }}>
                        <Text style={styles.footerText}>{this.props.footerFailureText}</Text>
                    </TouchableOpacity>;
                break;

            default:
                footer = <View style={styles.loadingView}/>;
        }

        return footer;
    }
}


const styles = StyleSheet.create({
    loadingView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    refreshingText: {
        fontSize: 12,
        color: "#666666",
        paddingLeft: 10,
    },
    footerText: {
        fontSize: 12,
        color: "#666666"
    },
});