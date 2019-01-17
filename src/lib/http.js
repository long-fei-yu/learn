import {loadingRef} from "../app";

let token = '';

const apikey = '0b2bdeda43b5688921839c8ecb20399b';

export default class HttpUtil {

    static requestNumber = 0;  //请求数量

    static post() {

        fetch('http://39.98.69.210:8080/admin/login', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": "admin",
                "password": "123456"
            })
        })
            .then(response => {
                console.log('response', response);
                console.log('response._bodyText', response._bodyText);

                let _bodyText = JSON.parse(response._bodyText);

                console.log('_bodyText.data', _bodyText.data);
                console.log('r_bodyText.data.token', _bodyText.data.token);
                token = _bodyText.data.token;
            })
            .catch(error => {
                console.log(error);
            })


    }


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

        try {
            result = await fetch(`${options.url}?${str}`, {method: 'GET'})
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

        console.log('url:', options.url);
        console.log('result:', result);

        if (result) {
            successCallback && successCallback(result);
        }
    }


    static async getDouBan(options, successCallback, errorCallBack) {
        const params = Object.assign({}, {apikey: '0b2bdeda43b5688921839c8ecb20399b', city: '北京'}, options.param);

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

        try {
            result = await fetch(`${options.url}?${str}`, {method: 'GET'})
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

        console.log('url:', options.url);
        console.log('result:', result);

        if (result) {
            successCallback && successCallback(result);
        }
    }

}