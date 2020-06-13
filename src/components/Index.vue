<template>
    <div>
        <div>
            <b-jumbotron header="记录你的生活点滴" lead="记录生活，写下学习的笔记，在这里，你可以畅所欲言"></b-jumbotron>
        </div>
        <BlogCard v-for="(blog, index) in blogs" v-bind:key="blog.id" v-bind:blog="blog"
                  v-on:remove="blogs.splice(index, 1)"></BlogCard>
        <div class="overflow-auto" v-if="blogs.length">
            <b-pagination
                    v-model="currentPage"
                    :total-rows="totalBlogs"
                    :per-page="perPage"
                    align="center"
                    v-on:change="changePage"
            ></b-pagination>
        </div>
<!--        没有博客时显示的文字-->
        <div v-if="!loading && totalTopic && !blogs.length">
            <h2>欢迎回来，<span class="username">{{username}}</span></h2>
            <h2>快去写一篇属于你自己的博客吧</h2>
        </div>
        <div v-else-if="!loading && !totalTopic">
            <h2>欢迎回来，{{username}}</h2>
            <h2>快去<b-link to="/topics">创建</b-link>一个属于你的主题吧</h2>
        </div>
    </div>
</template>

<script>
    import BlogCard from "./BlogCard";

    export default {
        name: "Index",
        components: {
            BlogCard
        },
        props: ['username'],
        data() {
            return {
                blogs: [],
                currentPage: 1,
                totalBlogs: 0,
                perPage: 10,
                loading: true,
                totalTopic: 0
            }
        },
        methods: {
            // 分页获取内容
            changePage: function (page) {
                let vue = this;
                this.axios.get("/blog/entry/", {
                    params: {page: page, per_page: this.perPage}
                }).then(function (response) {
                    vue.blogs = response.data.entries;
                    vue.totalBlogs = response.data.total;
                });
            }
        },
        mounted: function () {
            let vue = this;
            this.axios.get("/blog/entry/").then(function (response) {
                vue.blogs = response.data.entries;
                vue.totalBlogs = response.data.total;
            });
            this.axios.get('/blog/topic/').then(function (response) {
                vue.totalTopic = response.data.length;
            }).finally(function () {
                vue.loading = false;
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
        }
    }
</script>

<style scoped>

</style>