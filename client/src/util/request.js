import axios from 'axios';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


axios.defaults.baseURL = '/api';
axios.defaults.timeout = 25000;



export  default function request (options) {

    return axios(options)
    .then(checkStatus)
    .then((response) => {
      if(options.nofilter === true) {
        return response;
      }else {
        return response.data;
      }
    })
    .catch((err) => {
      alert('网络错误，请稍后重试')
    })
}
