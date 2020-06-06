<template>
    <div id="app">
        <HeaderBar style="margin-bottom: 40px;"></HeaderBar>
        <div class="container">
            <BlogCard v-for="(blog, index) in blogs" v-bind:key="blog.id" v-bind:blog="blog" v-on:remove="blogs.splice(index, 1)"></BlogCard>
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
                blogs: []
            }
        },
        mounted: function () {
            let vue = this;
            this.axios.get("blog/entry/").then(function (response) {
                vue.blogs = response.data;
            })
        },
    };
</script>
