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

export default router
