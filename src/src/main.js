// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCodemirror from 'vue-codemirror'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'codemirror/lib/codemirror.css'
import '../static/css/main.css'
Vue.config.productionTip = false
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

Vue.use(iView);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
