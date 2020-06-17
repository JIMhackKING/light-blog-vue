import Vue from "vue";
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
    name: 'router',
    routes: [{
        path: '/',
        component: () => import(/* webpackChunkName: "index" */'../components/Index.vue')
    }, {
        path: '/topics',
        component: () => import(/* webpackChunkName: "topics" */'../components/Topics.vue')
    }, {
        name: 'TopicEntries',
        path: '/topic/:topic_id',
        component: () => import(/* webpackChunkName: "topic_entries" */'../components/TopicEntries.vue')
    }, {
        path: '/entry/:entry_id/detail',
        component: () => import(/* webpackChunkName: "entry_detail" */'../components/EntryDetail.vue')
    }, {
        path: '/new_entry/:topic_id',
        component: () => import(/* webpackChunkName: "edit_entry" */'../components/EditEntry.vue')
    }, {
        path: '/entry/:entry_id',
        component: () => import(/* webpackChunkName: "edit_entry" */'../components/EditEntry.vue')
    }]
})