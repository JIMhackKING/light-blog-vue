import Vue from "vue";
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
    name: 'router',
    routes: [{
        path: '/',
        component: resolve => require(['../components/Index'], resolve)
    }, {
        path: '/topics',
        component: resolve => require(['../components/Topics'], resolve)
    }, {
        name: 'TopicEntries',
        path: '/topic/:topic_id',
        component: resolve => require(['../components/TopicEntries'], resolve)
    }, {
        path: '/entry/:entry_id',
        component: resolve => require(['../components/EntryDetail'], resolve)
    }]
})