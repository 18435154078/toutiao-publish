import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Content from '@/views/Content'
import Material from '@/views/Material'
import Article from '@/views/Article'
import Comment from '@/views/Comment'
import Fans from '@/views/Fans'
import Personal from '@/views/Personal'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/content',
          name: 'Content',
          component: Content
        },
        {
          path: '/material',
          name: 'Material',
          component: Material
        },
        {
          path: '/article',
          name: 'Article',
          component: Article
        },
        {
          path: '/comment',
          name: 'Comment',
          component: Comment
        },
        {
          path: '/fans',
          name: 'Fans',
          component: Fans
        },
        {
          path: '/personal',
          name: 'Personal',
          component: Personal
        }
      ]
    }
  ]
})

export default router

router.beforeEach((to, form, next) => {
  var user = window.localStorage.getItem('user')
  if (to.path === '/login') {
    next()
  } else {
    if (user) {
      next()
    } else {
      next('/login')
    }
  }
})
