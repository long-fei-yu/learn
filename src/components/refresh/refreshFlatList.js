import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {View, FlatList} from 'react-native';
import RefreshState from './refreshState';

export default class RefreshFlatList extends Component {

    static propTypes = {
        data: PropTypes.array,
        extraData: PropTypes.array,

        renderItem: PropTypes.func,
        renderEmpty: PropTypes.object,
        renderHeader: PropTypes.object,
        renderSeparator: PropTypes.func,

        onHeaderRefresh: PropTypes.func,
        onFooterRefresh: PropTypes.func,

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
        //行与行之间的分隔线组件,不会出现在第一行之前和最后一行之后
        renderSeparator: null,

        // 下拉刷新回调
        onHeaderRefresh: () => {
        },
        // 上拉加载回调
        onFooterRefresh: () => {
        },

        // 数据总量
        total: 99,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    constructor(props) {
        super(props);

        this.state = {
            isHeaderRefreshing: false,  // 头部是否正在刷新
            isFooterRefreshing: false,  // 尾部是否正在刷新
            footerState: RefreshState.Idle, // 尾部当前的状态，默认为Idle，不显示控件
        };

        this.PageCount = 0;//当前页
    }

    /**
     * 当前是否可以进行下拉刷新
     * @returns {boolean}
     *
     * 如果列表尾部正在执行上拉加载，就返回false
     * 如果列表头部已经在刷新中了，就返回false
     *
     */
    shouldStartHeaderRefreshing = () => {
        const {isHeaderRefreshing, isFooterRefreshing} = this.state;

        if (isHeaderRefreshing || isFooterRefreshing) {
            return false;
        }
        return true;
    };

    /**
     * 开始下拉刷新
     */
    beginHeaderRefresh = () => {
        this.PageCount = 0;

        if (this.shouldStartHeaderRefreshing()) {
            this.setState({
                isHeaderRefreshing: true
            });
            this.startHeaderRefreshing();
        }
    };

    /**
     *下拉刷新
     * 设置完刷新状态后再调用刷新方法
     */
    startHeaderRefreshing = async () => {
        await this.props.onHeaderRefresh(this.PageCount);

        this.setState({
            isHeaderRefreshing: false
        });
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
    beginFooterRefresh() {
        if (this.shouldStartFooterRefreshing()) {
            this.setState({
                isFooterRefreshing: true,
            });
            this.startFooterRefreshing();
        }
    }

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
            footerState: data.length < total ? RefreshState.Refreshing : RefreshState.NoMoreData,
        });

        const {isHeaderRefreshing, isFooterRefreshing, footerState} = this.state;

        if (footerState === RefreshState.NoMoreData ||
            isHeaderRefreshing ||
            isFooterRefreshing) {
            return false;
        }
        return true;
    }

    /**
     *上拉加载更多
     *
     * 将底部刷新状态改为正在刷新，然后调用刷新方法
     */
    startFooterRefreshing = async () => {
        this.PageCount++;
        await this.props.onFooterRefresh(this.PageCount);
        this.setState({
            footerState: RefreshState.Refreshing,
            isFooterRefreshing: false
        });

    };

    /**
     * 根据尾部组件状态来停止刷新
     * @param footerState
     *
     * 如果刷新完成，当前列表数据源是空的，就不显示尾部组件了
     * 这里这样做是因为通常列表无数据时，我们会显示一个空白页，如果再显示尾部组件如"没有更多数据了"就显得很多余
     */
    endRefreshing(footerState: RefreshState) {
        let footerRefreshState = footerState;
        if (this.props.data.length === 0) {
            footerRefreshState = RefreshState.Idle;
        }
        this.setState({
            footerState: footerRefreshState,
            isHeaderRefreshing: false,
            isFooterRefreshing: false
        })
    }


    render() {
        const {isHeaderRefreshing} = this.state;
        const {data, extraData, renderItem, renderEmpty, renderHeader, renderSeparator} = this.props;

        return (
            <View style={{flex: 1}}>
                {data && data.length > 0 ? (
                    <FlatList
                        {...this.props}
                        keyExtractor={(item, index) => item + index}
                        data={data}
                        extraData={extraData}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                        ListEmptyComponent={renderEmpty}
                        refreshing={isHeaderRefreshing}
                        onRefresh={() => this.beginHeaderRefresh()}
                        onEndReached={() => this.beginFooterRefresh()}
                        onEndReachedThreshold={0.1}
                        ItemSeparatorComponent={renderSeparator}
                    />
                ) : null}
            </View>
        );
    }
}