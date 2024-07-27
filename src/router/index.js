import { createRouter, createWebHistory } from 'vue-router';

import LoginForm from '@/components/LoginForm.vue';
import CadastroUsuarioForm from '@/components/CadastroUsuarioForm.vue';
import TelaPrincipal from '@/components/TelaPrincipal.vue';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
    {
        path: '/login',
        name: 'Login',
        component: LoginForm,
    },
    {
        path: '/cadastro_usuario',
        name: 'CadastroUsuario',
        component: CadastroUsuarioForm,
    },
    {
        path: '/tela_principal',
        name: 'TelaPrincipal',
        component: TelaPrincipal,
        beforeEnter: authGuard 
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login', 
    },
    ],
});

function authGuard(to, from, next) {
    const token = localStorage.getItem('token');
    if (token) {
        next();
    } else {
        next('/login');
    }
}


export default router;
