<template>
    <div id="app">
        <HeaderBar style="margin-bottom: 40px;"></HeaderBar>
        <div class="container">
            <BlogCard v-for="(blog, index) in blogs" v-bind:key="blog.id" v-bind:blog="blog"
                      v-on:remove="blogs.splice(index, 1)"></BlogCard>
            <div class="overflow-auto">
                <b-pagination
                        v-model="currentPage"
                        :total-rows="totalBlogs"
                        :per-page="perPage"
                        align="center"
                        v-on:change="changePage"
                ></b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from './components/Header';
    import BlogCard from "./components/BlogCard";

    export default {
        name: "App",
        components: {
            HeaderBar,
            BlogCard
        },
        data() {
            return {
                blogs: [],
                currentPage: 1,
                totalBlogs: 0,
                perPage: 10
            }
        },
        methods: {
            // 分页获取内容
            changePage: function (page) {
                let vue = this;
                this.axios.get("blog/entry/", {
                    params: {page: page, per_page: this.perPage}
                }).then(function (response) {
                    vue.blogs = response.data.entries;
                    vue.totalBlogs = response.data.total;
                })
            }
        },
        mounted: function () {
            let vue = this;
            this.axios.get("blog/entry/").then(function (response) {
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
    };
</script>

<style>
    #app {
        margin-bottom: 20px;
    }

    .disabled {
        cursor: not-allowed;
    }
</style>