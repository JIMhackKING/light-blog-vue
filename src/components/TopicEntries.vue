<template>
    <div>
        <div class="page-header">
            <h2 v-if="loading">加载中...</h2>
            <h2 v-else>{{ topic.text }}</h2>
            <b-button-group class="btn-right" v-if="!loading">
                <b-button :to="'/new_entry/' + topic.id" variant="outline-secondary" size="sm">
                    <b-icon-plus></b-icon-plus>
                    添加条目
                </b-button>
                <b-button variant="outline-secondary" size="sm" id="topic-editor" ref="button">
                    <b-icon-pencil-square></b-icon-pencil-square>
                    编辑
                </b-button>
                <b-button variant="outline-secondary" size="sm" v-on:click="hideTopic">
                    <b-icon-eye v-if="topic.hidden"></b-icon-eye>
                    <b-icon-eye-slash v-else></b-icon-eye-slash>
                    <span><span v-if="topic.hidden">取消</span>隐藏</span>
                </b-button>
                <!--主题编辑表单-->
                <TopicPopover target="topic-editor" position="bottom" v-on:submit="editTopic"
                              :topic.sync="topic"></TopicPopover>
            </b-button-group>
        </div>
        <BlogCard v-for="(blog, index) in blogs" v-bind:key="blog.id" v-bind:blog="blog"
                  v-on:remove="blogs.splice(index, 1)" :showTopicLink="false"></BlogCard>
        <span v-if="!loading && !blogs.length">该主题下还没有任何内容。</span>
        <div class="overflow-auto" v-if="blogs.length">
            <b-pagination
                    v-model="currentPage"
                    :total-rows="totalBlogs"
                    :per-page="perPage"
                    align="center"
                    v-on:change="changePage"
            ></b-pagination>
        </div>
    </div>
</template>

<script>
    import BlogCard from "./BlogCard";
    import TopicPopover from "./TopicForm/TopicPopover";

    export default {
        name: "TopicEntries",
        components: {
            BlogCard,
            TopicPopover
        },
        data() {
            return {
                topic: {},
                blogs: [],
                loading: true,
                currentPage: 1,
                totalBlogs: 0,
                perPage: 10
            }
        },
        mounted() {
            let vue = this;
            this.axios.get('/blog/topic/' + this.$route.params.topic_id + '/detail/').then(function (response) {
                vue.topic = response.data;
                vue.loading = false;
            });
            this.axios.get('/blog/topic/' + this.$route.params.topic_id + '/').then(function (response) {
                vue.blogs = response.data.entries;
                vue.totalBlogs = response.data.total;
            });
            document.onkeydown = function (event) {
                let e = event || window.event;
                let current = vue.currentPage, perpage = vue.perPage, total = vue.totalBlogs;
                // 键盘翻页
                if (e && e.keyCode === 39 && current * perpage <= total) {
                    vue.changePage(current + 1);
                    vue.currentPage = current + 1;
                } else if (e && e.keyCode === 37 && (current - 1) > 0) {
                    vue.changePage(current - 1);
                    vue.currentPage = current - 1;
                }
            }
        },
        destroyed: function () {
            document.onkeydown = null;
        }
        methods: {
            hideTopic: function () {
                let vue = this;
                this.axios.put('/blog/topic/' + vue.topic.id + '/', {hidden: !vue.topic.hidden});
                vue.topic.hidden = !vue.topic.hidden;
            },
            editTopic: function () {
                let vue = this;
                this.axios.put('/blog/topic/' + this.$route.params.topic_id + '/detail/', {text: this.topic.text}).then(function (response) {
                    vue.topic = response.data;
                })
            },
            // 分页获取内容
            changePage: function (page) {
                let vue = this;
                this.axios.get('/blog/topic/' + this.$route.params.topic_id + '/', {
                    params: {page: page, per_page: this.perPage}
                }).then(function (response) {
                    vue.blogs = response.data.entries;
                    vue.totalBlogs = response.data.total;
                })
            }
        }
    }
</script>

<style scoped>

</style>