/**
 * 主页面路由
 */

export default [
  {
    path: '/',
    name: 'index',
    component: () => import("@/pages/index/index.vue")
  }
]
