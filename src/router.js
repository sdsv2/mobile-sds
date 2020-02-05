import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Transaction from './views/Transaction.vue'
import Account from './views/Account.vue'
import Login from './views/Login.vue'
import Page from './views/Page.vue'
import Otp from './views/Otp.vue'
import Menu from './views/MenuCanvasser.vue'
import ListRS from './views/RsNumber.vue'
import SearchRS from './views/SearchRsNumber.vue'
import Product from './views/OrderProduct.vue'
import AboutApp from './views/AboutApp.vue'
import DetailSales from './views/DetailSales.vue'
import Mutation from './views/Mutation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/canvasser',
      name: 'canvasser',
      component: Page,
      redirect: '/canvasser/dashboard',
      children:[
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        { path: 'dashboard', name: 'dashboard', component: Dashboard},
        { path: 'transaction', name: 'transaction', component: Transaction },
        { path: 'account', name: 'account', component: Account },
      ]
    },
    { path: '/getOtp', name: 'otp', component: Otp},
    { path: '/login', name:'login', component: Login},
    { path: '/menuCanvasser', name: 'menuCanvasser', component: Menu },
    { path: '/listrsNumber', name:'rsNumber', component: ListRS},
    { path: '/searchrsNumber', name:'searchrsNumber', component: SearchRS},
    { path: '/orderProduct/:rsNumber/:outletName/:rsChipType/:rsTypeId', name: 'orderProduct', component: Product},
    { path: '/about', name:'aboutApp', component: AboutApp},
    { path: '/detailSales/:rsNumber/:keyword/:qty/:tpTs/:tpStatus/:errorMsg', name:'detailSales', component: DetailSales},
    { path: '/mutation/:backHome', name:'mutation', component: Mutation}
  ]
})
