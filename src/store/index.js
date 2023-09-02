import { createStore } from 'vuex';

import questionsModule from './questions/index.js';


const store = createStore({
    modules: {
        questions: questionsModule,
    },
});

export default store;