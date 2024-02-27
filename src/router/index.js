import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import SearchView from '../views/SearchView.vue'
import NovelView from '../views/NovelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      meta: {
        hasBar: false
      }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: {
        hasBar: false
      }
    },
    {
      path: '/novel/:id',
      name: 'novel',
      component: NovelView,
      meta: {
        hasBar: true,
        title: 'Novemia'
      }
    }
  ]
})
// TODO: LEFT&RIGHT slde in 进来更合适
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})
export default router
