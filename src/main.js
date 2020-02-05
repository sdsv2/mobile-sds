import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_CENTER_MOBILE
axios.interceptors.request.use(
  function(config){
    config.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
    config.headers.common['x-otp-token'] = 'Bearer '+localStorage.getItem('otpToken')
    return config
  },
  function(error){
    return Promise.reject(error)
  }
)

Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App),
  mounted: function() {
    if (localStorage.getItem('token')) {
        this.$router.replace({ path: '/canvasser' });
    } else {
        this.$router.replace({ path: '/getOtp' });
        //this.$router.replace({ path: '/login' });
    }
  }
}).$mount('#app')
