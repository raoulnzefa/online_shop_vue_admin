import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css"
import qs from 'qs'

const service = axios.create({
    timeout: 5000,
    baseURL: 'http://localhost:8080/'
})

// request interceptor
service.interceptors.request.use(
    config => {
        nprogress.start()
        config.data = qs.stringify(config.data)
        return config
    },
    error => {
        console.log(error) // for debug
    })

service.interceptors.response.use(
    response => {
        nprogress.done()
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        // if (response.status === 200) {
        return response
        // } else {
        //     return Promise.reject(response);
        // }
    }, error => {
        console.log(error)
        // if (error.response.status) {
        //     switch (error.response.status) {
        //         // 401: 未登录
        //         // 未登录则跳转登录页面，并携带当前页面的路径
        //         // 在登录成功后返回当前页面，这一步需要在登录页操作。
        //         case 401:
        //             window.alert("身份验证失败，请关闭重新进入。")
        //             break;

        //         // 403 token过期
        //         // 登录过期对用户进行提示
        //         // 清除本地token和清空vuex中token对象
        //         // 跳转登录页面
        //         case 403:
        //             window.alert("登录过期，请关闭重新进入。")
        //             break;

        //         // 404请求不存在
        //         case 404:
        //             window.alert("您访问的网页不存在。")
        //             break;

        //         // 500后台请求失败
        //         case 500:
        //             window.alert("后台请求失败")
        //             break;
        //         // 其他错误，直接抛出错误提示
        //         default:
        //             window.alert(error.response.data.message)
        //     }
        // }
    })

export default service