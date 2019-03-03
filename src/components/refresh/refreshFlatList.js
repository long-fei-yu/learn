import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {View, FlatList} from 'react-native';
import RefreshState from './refreshState';
import RefreshFooter from './refreshFooter';

export default class RefreshFlatList extends Component {

    static propTypes = {
        data: PropTypes.array,
        extraData: PropTypes.array,

        renderItem: PropTypes.func,
        renderEmpty: PropTypes.object,
        renderHeader: PropTypes.object,
        renderSeparator: PropTypes.func,

        onRefresh: PropTypes.func,
        onLoadMore: PropTypes.func,

        total: PropTypes.number,
    };

    static defaultProps = {
        // 数据
        data: null,
        // 额外的的数据
        extraData: null,

        // 列表项组件
        renderItem: () => <View/>,
        // 空列表组件
        renderEmpty: null,
        // 列表头组件
        renderHeader: null,
        // 行与行之间的分隔线组件,不会出现在第一行之前和最后一行之后
        renderSeparator: null,

        // 下拉刷新回调
        onRefresh: () => {
        },
        // 上拉加载回调
        onLoadMore: () => {
        },

        // 数据总量
        total: 99,
    };

    shouldComponentUpdate(nextProps, nextState) {

        if (!nextProps.isLoading && nextState.footerState === RefreshState.Refreshing) {
            this.LoadLock = false;
        }

        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    constructor(props) {
        super(props);

        this.state = {
            isRefreshing: false,                // 头部是否正在刷新
            isLoading: false,                   // 尾部是否正在刷新
            footerState: RefreshState.Idle,     // 尾部当前的状态，默认为Idle，不显示控件
        };

        this.PageCount = 0;//当前页
        this.LoadLock = false; // 加载锁
    }

    componentWillReceiveProps(nextProps) {

    }

    /**
     * 开始下拉刷新
     */
    beginHeaderRefresh = () => {
        const {isRefreshing, isLoading, footerState} = this.state;

        if (footerState !== RefreshState.Refreshing &&
            !isRefreshing &&
            !isLoading) {
            this.PageCount = 0;

            this.setState({isRefreshing: true});
            this.props.onRefresh(this.PageCount);
        }
    };

    _renderFooter = () => {
        const {footerState} = this.state;

        return (
            <RefreshFooter
                state={footerState}
                onRetryLoading={() => {
                    this.beginFooterRefresh()
                }}
            />
        )
    };

    /**
     * 开始上拉加载更多
     */
    beginFooterRefresh = () => {
        if (!this.canAction) return;

        if (this.shouldStartFooterRefreshing()) {
            this.startFooterRefreshing();
        }
    };

    /**
     * 当前是否可以进行上拉加载更多
     * @returns {boolean}
     *
     * 如果底部已经在刷新，返回false
     * 如果底部状态是没有更多数据了，返回false
     * 如果头部在刷新，则返回false
     * 如果列表数据为空，则返回false（初始状态下列表是空的，这时候肯定不需要上拉加载更多，而应该执行下拉刷新）
     *
     */
    shouldStartFooterRefreshing() {
        const {data, total} = this.props;

        this.setState({
            footerState: data.length < total ? RefreshState.CanLoadMore : RefreshState.NoMoreData,
        });

        const {isRefreshing, isLoading, footerState} = this.state;

        console.log('hhb', `footerState:${footerState} ,isRefreshing:${isRefreshing} ,isLoading:${isLoading} ,this.LoadLoc:${this.LoadLock}`);

        if (footerState === RefreshState.Refreshing ||
            footerState === RefreshState.NoMoreData ||
            isRefreshing ||
            isLoading || this.LoadLock) {
            return false;
        }
        return true;
    }

    /**
     *上拉加载更多
     *
     * 将底部刷新状态改为正在刷新，然后调用刷新方法
     */
    startFooterRefreshing() {
        console.log('hhb', 'onLoadMore');
        this.PageCount++;
        this.LoadLock = true;
        this.setState({isLoading: true, footerState: RefreshState.Refreshing});
        this.props.onLoadMore(this.PageCount);
    };

    /**
     * 根据尾部组件状态来停止刷新
     * @param footerState
     *
     * 如果刷新完成，当前列表数据源是空的，就不显示尾部组件了
     * 这里这样做是因为通常列表无数据时，我们会显示一个空白页，如果再显示尾部组件如"没有更多数据了"就显得很多余
     */
    endRefreshing(footerState: RefreshState.Idle) {

        console.log('footerState', footerState);

        this.setState({
            footerState: footerState,
            isRefreshing: false,
            isLoading: false
        })
    }

    render() {
        const {isRefreshing} = this.state;
        const {data, extraData, renderItem, renderEmpty, renderHeader, renderSeparator,} = this.props;

        return (
            <View style={{height: '100%'}}>
                {data && data.length > 0 ? (
                    <FlatList
                        {...this.props}
                        keyExtractor={(item, index) => item + index}
                        data={data}
                        bounces={true}
                        extraData={extraData}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={this._renderFooter}
                        ListEmptyComponent={renderEmpty}
                        refreshing={isRefreshing}
                        onRefresh={this.beginHeaderRefresh}
                        onEndReached={this.beginFooterRefresh}
                        onEndReachedThreshold={0.1}
                        ItemSeparatorComponent={renderSeparator}


                        onScrollBeginDrag={() => {
                            //console.log('onScrollBeginDrag');
                            this.canAction = true;
                        }}
                        onScrollEndDrag={() => {
                            //console.log('onScrollEndDrag');
                            this.canAction = false;
                        }}
                        onMomentumScrollBegin={() => {
                            //console.log('onMomentumScrollBegin');
                            this.canAction = true;
                        }}
                        onMomentumScrollEnd={() => {
                            //console.log('onMomentumScrollEnd');
                            this.canAction = false;
                        }}
                    />
                ) : null}
            </View>
        );
    }
}