/**
 * 路由统一出口
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import index from './routes/index.js'

let routes = [].concat(index)


export default new Router({
  routes,
})
