import Vue from "vue";
import Router from 'vue-router';
import Index from "../components/Index";
import Topics from "../components/Topics";
import TopicEntries from "../components/TopicEntries";

Vue.use(Router)

export default new Router({
    name: 'router',
    routes: [{
        path: '/',
        component: Index
    }, {
        path: '/topics',
        component: Topics
    }, {
        path: '/topic/:topic_id',
        component: TopicEntries
    }]
})