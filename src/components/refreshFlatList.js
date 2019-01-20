import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import {View, FlatList, Text, StyleSheet} from 'react-native';
import BaseStyle from "../lib/baseStyle";

export default class RefreshFlatList extends Component {

    static propTypes = {
        data: PropTypes.array,
        extraData: PropTypes.array,

        renderItem: PropTypes.func,
        renderEmpty: PropTypes.object,
        renderHeader: PropTypes.object,
        renderFooter: PropTypes.object,
        renderSeparator: PropTypes.func,

        onRefresh: PropTypes.func,
        onLoadMore: PropTypes.func,

        isRefreshing: PropTypes.bool,
        isLoading: PropTypes.bool,

        total: PropTypes.number,
    };

    static defaultProps = {
        //数据
        data: null,
        //额外的的数据
        extraData: null,

        //列表项组件
        renderItem: () => <View/>,
        // 空列表组件
        renderEmpty: null,
        // 列表头组件
        renderHeader: null,
        // 列表尾组件
        renderFooter: null,
        //行与行之间的分隔线组件,不会出现在第一行之前和最后一行之后
        renderSeparator: null,

        // 下拉刷新回调
        onRefresh: () => {
        },
        // 上拉加载回调
        onLoadMore: () => {
        },

        // 是否刷新中
        isRefreshing: false,
        // 是否加载中
        isLoading: false,

        // 数据总量
        total: 0,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoading) {
            this.LoadLock = false;
        }
    }

    constructor(props) {
        super(props);

        this.PageCount = 0;//当前页
        this.LoadLock = false;//加载锁
    }

    onRefresh = () => {
        this.PageCount = 0;
        this.props.onRefresh(this.PageCount);
    };

    onLoadMore = () => {
        console.log('onLoadMore');

        const loadStatus = this.getLoadStatus();

        if (loadStatus === 'hasMore' && !this.LoadLock) {
            this.LoadLock = true;
            this.PageCount++;

            this.props.onLoadMore(this.PageCount);
        }
    };

    getLoadStatus = () => {
        const {data, isLoading, total} = this.props;
        return isLoading || this.LoadLock ? 'loading' : data.length < total ? 'hasMore' : 'noMore';
    };

    renderFooter = () => {
        const {renderFooter, data, isRefreshing, isLoading, total} = this.props;

        if (renderFooter) {
            return renderFooter;
        } else if (data && !isRefreshing) {
            const loadMoreStatus = isLoading ? 'loading' : data.length < total ? 'hasMore' : 'noMore';
            return <MoreView loadMoreStatus={loadMoreStatus}/>
        } else {
            return null;
        }
    };

    render() {
        const {data, extraData, renderItem, renderEmpty, renderHeader, renderSeparator, isRefreshing} = this.props;

        return (
            <View style={{flex: 1}}>
                {data === null ? (
                    <View style={styles.loadBox}>
                        <MoreView loadMoreStatus={'loading'}/>
                    </View>
                ) : null}
                {data && data.length > 0 ? (
                    <FlatList
                        {...this.props}
                        keyExtractor={(item, index) => item + index}
                        data={data}
                        extraData={extraData}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={this.renderFooter}
                        ListEmptyComponent={renderEmpty}
                        refreshing={isRefreshing}
                        onRefresh={this.onRefresh}
                        onEndReached={this.onLoadMore}
                        onEndReachedThreshold={0.1}
                        ItemSeparatorComponent={renderSeparator}
                    />
                ) : null}
            </View>
        );
    }
}


export class MoreView extends Component {

    static propTypes = {
        loadMoreStatus: PropTypes.string,
        loadText: PropTypes.string,
    };
    static defaultProps = {
        /*
         hasMore 可加载更多
         noMore 没有更多
         loading 加载中
         */
        loadMoreStatus: 'hasMore',
        // 加载文本
        loadText: '加载中',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    render() {
        const {loadMoreStatus, loadText} = this.props;

        return (
            <View style={styles.moreTextBox}>
                <Text style={BaseStyle.s14c999999}>
                    {loadMoreStatus === 'loading' ? loadText : loadMoreStatus === 'hasMore' ? '加载更多' : '已经到底部'}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    loadBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    moreTextBox: {
        marginLeft: 10,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
});