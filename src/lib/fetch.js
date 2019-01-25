/**
 * Created by huhaibin on 2019/1/24.
 */

/**
 * fetch 封装请求超时
 *
 * @param input
 * @param init
 */
export default function fetchApi(input, init) {
    let fetchPromise = fetch(input, init);

    let timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('fetch timeout');
        }, init.timeout);
    });

    return Promise.race([fetchPromise, timeoutPromise]);
};
