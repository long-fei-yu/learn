import {loadingRef} from "../app";
import fetch from './fetch';

export default class HttpUtil {

    //豆瓣请求key
    static apikey = '0b2bdeda43b5688921839c8ecb20399b';

    //默认请求超时
    static fetchTime = 25000;

    static async get(options, successCallback, errorCallBack) {
        const params = Object.assign({}, options.param);
        let str = '';
        for (let key in params) {
            str += `${key}=${params[key]}&`;
        }
        str = str.substr(0, str.length - 1);

        let result;

        //loading为false表示显示加载框，为true表示不显示加载框
        let loading = options.loading || false;
        if (!loading) {
            loadingRef.showLoading();
        }

        //超时时长
        let timeout = options.timeout || HttpUtil.fetchTime;

        try {
            result = await fetch(`${options.url}?${str}`, {method: 'GET', timeout})
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        errorCallBack && errorCallBack(response);
                    }
                })
                .catch((error) => {
                    errorCallBack && errorCallBack(error);
                });
        } catch (error) {
            errorCallBack && errorCallBack(error);
        }

        if (!loading) {
            loadingRef.hideLoading();
        }

        console.log('url:', `${options.url}?${str}`);
        console.log('result:', result);

        if (result) {
            successCallback && successCallback(result);
        }
    }


    static async getDouBan(options, successCallback, errorCallBack) {
        const params = Object.assign({}, {apikey: HttpUtil.apikey, city: '北京'}, options.param);

        let str = '';
        for (let key in params) {
            str += `${key}=${params[key]}&`;
        }
        str = str.substr(0, str.length - 1);

        let result;

        //loading为false表示显示加载框，为true表示不显示加载框
        let loading = options.loading || false;
        if (!loading) {
            loadingRef.showLoading();
        }

        //超时时长
        let timeout = options.timeout || HttpUtil.fetchTime;

        try {
            result = await fetch(`${options.url}?${str}`, {method: 'GET', timeout})
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        errorCallBack && errorCallBack(response);
                    }
                })
                .catch((error) => {
                    errorCallBack && errorCallBack(error);
                });
        } catch (error) {
            errorCallBack && errorCallBack(error);
        }

        if (!loading) {
            loadingRef.hideLoading();
        }

        console.log('url:', `${options.url}?${str}`);
        console.log('result:', result);

        if (result) {
            successCallback && successCallback(result);
        }
    }

}