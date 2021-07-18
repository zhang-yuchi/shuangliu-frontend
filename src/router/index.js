import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from "../views/Home.vue"
import Map from "../views/map.vue"
import Point from "../views/point.vue"
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
	path:"/map",
	name:"Map",
	component:Map
  },
  {
	path:"/point/:id",
	name:"Point",
	component:Point
  },
  {
	  path:"/userinfo",
	  name:"userinfo",
	  component:()=>import("../views/userinfo.vue")
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
