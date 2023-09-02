import { createRouter, createWebHistory } from 'vue-router';

import quizPage from '@/components/quizPage.vue'
import Results from '@/components/resultsPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/questions' },
        { path: '/questions', component: quizPage },
        { path: '/results', component: Results }
    ]
});

export default router;