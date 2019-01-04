import {Component} from 'react';
import _ from 'lodash';
import {NavigationActions, StackActions} from 'react-navigation';

export default class BaseComponent extends Component {

    constructor(props) {
        super(props);
        console.log('Component props', props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
    }

    /**
     * 获取当前路由对应的key
     *
     * @returns {*}
     */
    getRouteKey() {
        return this.props.navigation.state.key;
    }

    /**
     * 对路由的参数进行更改
     * @param obj
     */
    setParams(params) {
        this.props.navigation.setParams(params);
    }

    /**
     * 获取当前路由的参数
     *
     * @returns {GetPhotosParams}
     */
    getRouteParams() {
        return this.props.navigation.state.params;
    }

    /**
     * 获取当前路由的名称
     *
     * @returns {*}
     */
    getRouteName() {
        return this.props.navigation.state.routeName;
    }


    /**
     * 链接到其它页面
     *
     * Navigation
     *
     * @param routeName
     * @param params
     * @param action
     */
    navigate(routeName, params, action) {
        this.props.navigation.navigate(routeName, params, action);
    }

    /**
     * 关闭当前页面并返回上一个页面
     *
     * Navigation
     *
     * @param key
     */
    back(key = null) {
        this.props.navigation.goBack(key);
    }


    /**
     * 推一个新的路由到堆栈
     *
     * StackNavigator
     *
     * @param routeName
     * @param params
     * @param action
     */
    push(routeName, params, action) {
        this.props.navigation.push(routeName, params, action);
    }

    /**
     * 返回堆栈中的上一个页面
     *
     * StackNavigator
     *
     * @param n
     */
    pop(n) {
        this.props.navigation.pop(n);
    }

    /**
     * 返回到堆栈中的第一个页面
     *
     * StackNavigator
     */
    popToTop() {
        this.props.navigation.popToTop();
    }

    /**
     *用新路由替换当前路由
     *
     * StackNavigator
     *
     * @param routeName
     * @param params
     * @param action
     */
    replace(routeName, params, action) {
        this.props.navigation.replace(routeName, params, action);
    }

    /**
     * 操作会擦除整个导航状态，并将其替换为多个操作的结果
     *
     * StackNavigator
     *
     * @param routeName
     * @param params
     * @param action
     */
    reset(index, ...routeNames) {
        let actions = [];
        for (let routeName of routeNames) {
            actions.push(NavigationActions.navigate({routeName}));
        }

        const resetAction = StackActions.reset({index, actions});
        this.props.navigation.dispatch(resetAction);
    }

    /**
     * 关闭当前堆栈
     *
     * StackNavigator
     */
    dismiss() {
        this.props.navigation.dismiss();
    }


    /**
     * 打开
     *
     *DrawerNavigator
     */
    openDrawer() {
        this.props.navigation.openDrawer();
    }

    /**
     * 关闭
     *
     * DrawerNavigator
     */
    closeDrawer() {
        this.props.navigation.closeDrawer();
    }

    /**
     * 切换
     *
     * DrawerNavigator
     */
    toggleDrawer() {
        this.props.navigation.toggleDrawer();
    }

}