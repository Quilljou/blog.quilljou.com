import Router from 'vue-router';
import Vue from 'vue';

import Login from './routes/Login.vue'
import Admin from './routes/Admin.vue'

Vue.use(Router);


const routes = [
  {path: '/login', component: Login},
  {path: '/', component: Admin},
]

const router = new Router({routes})

// router.beforeEach(( to, from, next) => {
//     if( to.path !== '/login') {
//         // 不检测/login 页面
//         checkLogin().then( (response) => {
//             if(response && response.data.code === 0) {
//                 next()
//             }else {
//                 next({
//                     path: '/login'
//                 })
//             }
//         })
//     }else {
//         // /login 直接进入
//         next()
//     }
// })


export default router;
