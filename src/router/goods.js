
import Router from 'vue-router'
import goodsDetail from '@/screens/goods/goodsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: goodsDetail,
    }
  ]
})
