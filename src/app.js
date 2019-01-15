/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import './lib/deviceParameter';
import {AppNavigator} from './routers';
import {createAppContainer} from 'react-navigation';
import {Provider} from 'react-redux';
import {store} from './redux/store/index';
import {View} from 'react-native';
import BaseStyle from "./lib/baseStyle";
import Loading from './components/loading';

const AppContainer = createAppContainer(AppNavigator);

let loadingRef;

export default class App extends Component<Props> {

    constructor(props) {
        super(props);

        /**
         * 正式环境替换系统原有的console实现
         */
        if (!__DEV__) {
            global.console = {
                info: () => {
                },
                log: () => {
                },
                warn: () => {
                },
                debug: () => {
                },
                error: () => {
                }
            };
        }
    }

    componentDidMount() {
        loadingRef = this.loading;
    }


    render() {
        return (
            <Provider store={store}>
                <View style={BaseStyle.content}>

                    <Loading
                        ref={loading => {
                            this.loading = loading
                        }}/>

                    <AppContainer
                        onNavigationStateChange={(prevState, newState, action) => {
                            //console.log('prevState', prevState);
                            //console.log('newState', newState);
                            //console.log('action', action);
                        }}
                    />
                </View>
            </Provider>
        );
    }
}

export {loadingRef};