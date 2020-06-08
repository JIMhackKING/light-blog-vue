<template>
    <b-navbar toggleable="lg" type="white" id="header">
        <div class="container">
            <b-navbar-brand to="/" variant="secondary">卷积云博客</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse" style="border: 1px solid #cecece">
                <template v-slot:default="{ expanded }">
                    <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                    <b-icon v-else icon="chevron-bar-down"></b-icon>
                </template>
            </b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/topics">主题</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="/blog/statistics_center/">统计中心</b-nav-item>
                    <b-nav-item href="/blog/search_center/">搜索中心</b-nav-item>
                    <b-nav-item href="/users/information/">你好，username</b-nav-item>
                    <b-nav-item href="/users/logout/">注销</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
    export default {
        name: "HeaderBar",
    }
</script>

<style scoped>
    #header {
        border-bottom: 1px solid #e7e7e7;
        /*position: fixed;*/
        /*top: 0;*/
        /*width: 100%;*/
        /*z-index: 100;*/
        /*background-color: white;*/
    }

    #header a {
        color: #777;
    }
</style>
