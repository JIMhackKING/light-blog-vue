<template>
    <div>
        <div class="page-header">
            <b-link v-on:click="$router.go(-1)">←返回上一页</b-link>
        </div>
        <BlogCard v-bind:blog="blog" v-on:remove="removeBlog" :showTopicLink="false" :summary="false"
                  v-if="!loading"></BlogCard>
    </div>
</template>

<script>
    import BlogCard from "./BlogCard";

    export default {
        name: "EntryDetail",
        data() {
            return {
                blog: {},
                loading: true
            }
        },
        components: {
            BlogCard
        },
        mounted() {
            let vue = this;
            this.axios.get('/blog/entry/' + this.$route.params.entry_id + '/detail/').then(function (response) {
                vue.blog = response.data;
                vue.loading = false;
            });
        },
        methods: {
            removeBlog: function () {
                // 替换路由
                this.$router.replace({name: 'TopicEntries', params: {topic_id: this.blog.topic}});
            }
        }
    }
</script>

<style scoped>

</style>