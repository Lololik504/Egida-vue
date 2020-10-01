import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/districts',
            name: 'districts',
            component: () => import('./views/Districts')
        },
        {
            path: '/districts/:district',
            name: 'one_district',
            component: () => import('./views/OneDistrict'),
            props: true
        }
    ],
})