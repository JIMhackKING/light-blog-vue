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
                    <b-button href="#" variant="outline-secondary" size="sm">
                        <b-icon-pencil-square></b-icon-pencil-square>
                        编辑
                    </b-button>
                    <b-button variant="outline-secondary" size="sm" v-on:click="hideTopic(index)">
                        <b-icon-eye v-if="topic.hidden"></b-icon-eye>
                        <b-icon-eye-slash v-else></b-icon-eye-slash>
                        <span><span v-if="topic.hidden">取消</span>隐藏</span>
                    </b-button>
                </b-button-group>
            </b-list-group-item>
            <b-list-group-item v-if="loading">加载中...</b-list-group-item>
            <b-list-group-item v-else-if="!topics.length">还没有主题</b-list-group-item>
        </b-list-group>

        <h3><a href="#">添加一个主题</a></h3>
    </div>
</template>

<script>
    export default {
        name: "Topics",
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
            }).finally(function () {
                vue.loading = false;
            });
        },
        methods: {
            hideTopic: function (index) {
                let vue = this;
                let topic = this.topics[index];
                this.axios.put('/blog/topic/' + topic.id + '/', {hidden: !topic.hidden});
                vue.topics[index].hidden = !topic.hidden;
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