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
                <b-navbar-nav v-if="verified">
                    <b-nav-item to="/topics">主题</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="/blog/statistics_center/">统计中心</b-nav-item>
                    <b-nav-item href="/blog/search_center/">搜索中心</b-nav-item>
                    <b-nav-item v-if="verified">你好，{{username}}</b-nav-item>
                    <b-nav-item v-on:click="logout" v-if="verified">注销</b-nav-item>
                    <b-nav-item v-on:click="$bvModal.show('LoginModal')" v-else>登录</b-nav-item>
                </b-navbar-nav>
                <LoginModal v-on:login="login"></LoginModal>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
    import LoginModal from './User/LoginModal'

    export default {
        name: "HeaderBar",
        components: {LoginModal},
        data() {
            return {
                verified: false,
                userInfo: {}
            }
        },
        computed: {
            username: function () {
                if (this.userInfo.first_name && this.userInfo.last_name) {
                    return this.userInfo.first_name + ' ' + this.userInfo.last_name;
                } else {
                    return this.userInfo.username;
                }
            }
        },
        mounted() {
            let vue = this;
            let token = localStorage.getItem('token');
            let user = localStorage.getItem('user');
            if (!token || !user) return;
            user = JSON.parse(user);

            this.axios.get('/users/', {params: {token: token}}).then(function () {
                // 记录用户信息和Token
                vue.axios.defaults.headers['Authorization'] = 'Token ' + token;
                vue.userInfo = user;
                vue.verified = true;
            })
        },
        methods: {
            logout: function () {
                delete this.axios.defaults.headers['Authorization'];
                this.verified = false;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.$router.push("/");
            },
            login: function (response) {
                this.userInfo = response.user;
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                this.verified = true;
                // 重定向
                this.$router.push("/");
            }
        }
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
