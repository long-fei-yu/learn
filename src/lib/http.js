let token = '';

const SUCCESS_CODE = 0;//成功
const TIMEOUT_CODE = 1;//连接超时
const ERROR_CODE = 2;//连接错误

export default class HttpUtil {


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
        for (let param in params) {
            str += `${i}=${param[i]}&`;
        }
        let result;

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

        console.log('url:', options.url);
        console.log('result:', result);

        if (result) {
            successCallback && successCallback(result);
        }
    }

}