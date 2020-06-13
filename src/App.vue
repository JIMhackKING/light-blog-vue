<template>
    <div id="app">
        <HeaderBar style="margin-bottom: 40px" ref="header" v-on:login="loginSuccess" v-on:logout="logout"></HeaderBar>
        <div class="container" style="/*margin-top: 100px*/">
            <router-view v-if="isAuthorized" :username="$refs.header.username"></router-view>
            <div v-else>
                <b-jumbotron header="记录你的生活点滴" lead="记录生活，写下学习的笔记，在这里，你可以畅所欲言"></b-jumbotron>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from './components/Header';

    export default {
        name: "App",
        data() {
            return {
                pageHeader: '',
                isAuthorized: false,
            }
        },
        components: {
            HeaderBar,
        },
        methods: {
            loginSuccess: function () {
                this.isAuthorized = true;
            },
            logout: function () {
                this.isAuthorized = false;
            }
        }
    };
</script>

<style>
    #app {
        margin-bottom: 20px;
    }

    .disabled {
        cursor: not-allowed;
    }

    .page-header {
        padding-bottom: 9px;
        margin: 40px 0 20px;
        border-bottom: 1px solid #eee;
    }
</style>
