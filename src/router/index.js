import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/user.vue'

Vue.use(VueRouter)
const router= new VueRouter({
    routes:[
        {path:'/',redirect:'/login'},
       {path:'/login',component:Login},
       {path:'/home',component:Home,
       redirect:'/Welcome',
       children:[
           {path:'/welcome',component:Welcome},
           {path:'/users',component:User}
          ]
        }

    ]
})
// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
    // to将要访问的路径 from代表从哪个路径跳转而来 next是一个函数,表示放行
    // next()放行 next('/login') 强制跳转
    if(to.path === '/login')return next()
    // 获取token
    const tokenStr=window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
})

export default router