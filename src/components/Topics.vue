<template>
    <div>
        <div class="page-header">
            <h1>主题</h1>
        </div>
        <b-list-group style="margin-bottom: 20px">
            <b-list-group-item v-for="(topic, index) in topics" v-bind:key="topic.id">
                <span class="h3-inline">
                    <b-link :to="'/topic/' + topic.id" v-bind:class="{ 'hidden-link': topic.hidden }">
                        {{ topic.text }}
                    </b-link>
                </span>
                <b-button-group class="btn-right">
                    <b-button href="#" variant="outline-secondary" size="sm">
                        <b-icon-plus></b-icon-plus>
                        添加条目
                    </b-button>
                    <b-button href="#" variant="outline-secondary" size="sm" :id="'topic_' + topic.id">
                        <b-icon-pencil-square></b-icon-pencil-square>
                        编辑
                    </b-button>
                    <b-button variant="outline-secondary" size="sm" v-on:click="hideTopic(index)">
                        <b-icon-eye v-if="topic.hidden"></b-icon-eye>
                        <b-icon-eye-slash v-else></b-icon-eye-slash>
                        <span><span v-if="topic.hidden">取消</span>隐藏</span>
                    </b-button>
<!--                    sync修饰符可以动态修改父组件某个值，子组件用事件触发-->
                    <TopicPopover :target="'topic_' + topic.id" position="bottom"
                                  :topic.sync="topic" v-on:submit="editTopic(index)"></TopicPopover>
                </b-button-group>
            </b-list-group-item>
            <b-list-group-item v-if="loading">加载中...</b-list-group-item>
            <b-list-group-item v-else-if="!topics.length">还没有主题</b-list-group-item>
        </b-list-group>

        <h3><a href="#">添加一个主题</a></h3>
    </div>
</template>

<script>
    import TopicPopover from "./TopicForm/TopicPopover";

    export default {
        name: "Topics",
        components: {
            TopicPopover
        },
        data() {
            return {
                topics: [],
                loading: true
            }
        },
        mounted() {
            let vue = this;
            this.axios.get('/blog/topic/').then(function (response) {
                vue.topics = response.data;
                vue.loading = false;
            });
        },
        methods: {
            hideTopic: function (index) {
                let vue = this;
                let topic = this.topics[index];
                this.axios.put('/blog/topic/' + topic.id + '/', {hidden: !topic.hidden});
                vue.topics[index].hidden = !topic.hidden;
            },
            editTopic: function (index) {
                let vue = this;
                let topic = this.topics[index]
                this.axios.put('/blog/topic/' + topic.id + '/detail/', {text: topic.text}).then(function (response) {
                    // 替换数组某个值
                    vue.topics.splice(index, 1, response.data);
                })
            }
        }
    }
</script>

<style scoped>
    .btn-right {
        margin-left: 3em;
    }

    .h3-inline {
        font-size: 24px;
        vertical-align: middle;
    }

    .hidden-link {
        text-decoration: line-through;
    }
</style>