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


const AppContainer = createAppContainer(AppNavigator);

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


    render() {
        return <AppContainer
            onNavigationStateChange={(prevState, newState, action) => {
                //console.log('prevState', prevState);
                //console.log('newState', newState);
                //console.log('action', action);
            }}
        />;
    }
}


