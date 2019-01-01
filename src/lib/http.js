let token = '';

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


    static get(url) {

        fetch(url, {
            method: 'GET',
        })
            .then(response => {
                console.log('response', response._bodyText);
                return JSON.parse(response._bodyText);
            })
            .catch(error => {
                console.log(error);
            })
    }

}