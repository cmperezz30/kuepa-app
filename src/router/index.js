import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '../stores'



const routes = [

    {
        path: '/login',
        component: () => import('../presentation/pages/login/LoginPage.vue'),
        name: 'login'
    },
    {
        path: '/register',
        component: () => import('../presentation/pages/register/RegisterPage.vue'),
        name: 'register'
    },
    {
        path: '/streaming',
        component: () => import('../presentation/pages/streaming/StreamingPage.vue'),
        name: 'streaming'
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {

    const store = userStore();

    if(to.path === '/' || to.path === '/home'){
        return {
            name: 'login'
        }
    }

    if((to.path === '/login' || to.path === '/register') && store.$state.user){
        return {
            name: 'streaming'
        }
    }

    if(to.path === '/streaming' && !store.$state.user){
        return {
            name: 'login'
        }
    }

});

export default router; 