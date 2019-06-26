import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import home from '@/components/home'
import search from '@/components/search'
import my from '@/components/my'
import list from '@/components/pages2/list'
import play from '@/components/pages2/play'
import comment from '@/components/pages2/comment'
import phb from '@/components/pages2/phb'
import login from '@/components/login/login'
import jingpin from '@/components/pages2/jingpin'
import day from '@/components/pages2/day'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      //重定向 默认展示第一个子路由
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/search',
          name: 'search',
          component: search
        },
        {
          path: '/my',
          name: 'my',
          component: my
        }
      ]
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/play',
      name: 'play',
      component: play
    },
    {
      path: '/comment',
      name: 'comment',
      component: comment
    },
    {
      path: '/phb',
      name: 'phb',
      component: phb
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/jingpin',
      name: 'jingpin',
      component: jingpin
    },
    {
      path: '/day',
      name: 'day',
      component: day
    }
  ]
})
