import Vue from 'vue'
import App from './App.vue'
import router from './router'
import style from './assets/sass/main.sass'
// require('./assets/sass/main.sass')
import Message from './components/Message/'
import Button from './components/Button/index.vue'

Vue.component(Button.name,Button)
Vue.prototype.$message = Message;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
