import Vue from 'vue'
import VueRouter from 'vue-router'


import Index from 'pages/index/index.vue'
import SortBrowserDetail from 'pages/sortbrowserdetail.vue'
import BookDetail from 'pages/bookdetail.vue'
import Search from 'pages/search.vue'
import MoreBookStore from 'pages/morebookstore.vue'
import BookorderDetail from 'components/morebookstore/bookorder/bookorderdetail.vue'
import ActiveDetail from 'components/morebookstore/active/activedetail.vue'
import Cart from 'pages/cart.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path:'/index',
    name:'index',
    component:Index
  },
  {
    path:'/sortbrowserdetail/:type',
    name:'sortbrowserdetail',
    component:SortBrowserDetail,
    props:true
  }, 
  {
    path:'/bookdetail/:id',
    name:'bookdetail',
    component:BookDetail
  }, 
  {
    path:'/search/:keyword',
    name:'search',
    component:Search,
    props:true
  },
  {
    path:'/morebookstore/:type',
    name:'morebookstore',
    component:MoreBookStore,
    props:true
  },
  {
    path:'/bookorderdetail',
    name:'bookorderdetail',
    component:BookorderDetail
  },
  {
    path:'/activedetail',
    name:'activedetail',
    component:ActiveDetail,
    props:true
  },
  {
    path:'/cart',
    name:'cart',
    component:Cart,
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


export default router
