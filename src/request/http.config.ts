import axios from 'axios'
// 配置项
import { Toast } from 'vant';
const service = axios.create({
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config: any) => {
    var token = localStorage.getItem("token")
    if (!config.headers.Authorization)
        config.headers.Authorization = token;
    return config
}, (err: any) => {
    return Promise.reject(err)
})
// 响应拦截器
service.interceptors.response.use((res: any) => {
    if (res.status === 200) {
        return res
    }else if(res.status === 401){
        localStorage.clear()
    }
}, function (err: any) {
    return Promise.reject(err)
})

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url: string, params?: any) {
    return new Promise((response, reject) => {
        service({ url, method: 'get', params }).then((res: unknown) => {
            response(res)
        }).catch((err: any) => {
            reject(err)
        })
    })
}

/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url: string, data = {}) {
    return new Promise((response, reject) => {
        service({ url, method: 'post', data }).then((res: unknown) => {
            response(res)
        }).catch((err: any) => {
            reject(err)
        })
    })
}