import axios from 'axios';
import router from '../router'



function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }


  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


function alertMessage(response,options) {
  if(options.message !== false) {

  }
  return response;
}


export  function request (options) {
    const defaultOptions = {
      message: true
    }

    options = {  ...defaultOptions, ...options}

    if(router.history.current.path !== '/login') {
      // login 页面不检测
      checkLogin().then( (response) => {
        if(response && !response.data.success) {
          router.push('/login')
        }
      })
    }


    return axios(options)
    .then(checkStatus)
    // 为promise的链式调用传入额外参数
    .then((response) => alertMessage(response,options))
    .catch((err) => {
      Message({
        type: 'error',
        message: '网络错误，请稍后重试'
      });
    })

}

export function checkLogin() {
    return axios({
      url: getUrl('/checkLogin'),
      method: 'get'
    })
    .then(checkStatus)
}


export function getUrl(url) {
    const base = "/api/blog/admin";
    return base + url;
}
