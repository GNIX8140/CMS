import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/Welcome.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../components/Dashboard.vue')
    },
    {
        path: '/classroom',
        name: 'Classroom',
        component: () => import('../components/Classroom.vue')
    },
    {
        path: '/control',
        name: 'Control',
        component: () => import('../components/Control.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;