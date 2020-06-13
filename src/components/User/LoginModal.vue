<template>
    <b-modal id="LoginModal" centered title="登录" @ok="login">    
        <b-form ref="loginForm">
            <b-form-group
                    label="用户名"
                    label-for="username"
            >
                <b-form-input
                        id="username"
                        type="text"
                        placeholder="用户名"
                        v-model="username"
                        required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                    label="密码"
                    label-for="password"
            >
                <b-form-input
                        id="password"
                        type="password"
                        placeholder="密码"
                        v-model="password"
                        required
                ></b-form-input>
            </b-form-group>
        </b-form>
        <b-alert variant="danger" v-if="validateCallback" show>{{validateCallback}}</b-alert>
        <template v-slot:modal-footer="{ok}">
            <b-button variant="primary" v-on:click="ok()">登录</b-button>
        </template>
    </b-modal>
</template>

<script>
    export default {
        name: "EntryForm",
        data() {
            return {
                username: '',
                password: '',
                validateCallback: '',
                loginResponse: {}
            }
        },
        methods: {
            async checkFormValidity() {
                let vue = this;
                let loginValidated = true;

                if (!this.username) {
                    this.validateCallback = '请填写用户名';
                    return false;
                }
                if (!this.password) {
                    this.validateCallback = '请填写密码';
                    return false;
                }
                await this.axios.post('/users/', {username: this.username, password: this.password}).then(function (response) {
                    let data = response.data;
                    if (data.code !== 2000) {
                        vue.validateCallback = data.message;
                        loginValidated = false;
                        return;
                    }
                    vue.loginResponse = data;
                })

                if (loginValidated) this.validateCallback = '';
                return loginValidated;
            },
            login: function (bvModalEvent) {
                let vue = this;

                // Prevent modal from closing
                bvModalEvent.preventDefault();
                this.checkFormValidity().then(function (response) {
                    if (response) {
                        // Hide the modal manually
                        vue.$nextTick(() => {
                            vue.$bvModal.hide('LoginModal');
                        })
                        vue.username = '';
                        vue.password = '';
                        vue.$emit('login', vue.loginResponse);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #entryForm .form-group {
        font-weight: 700;
    }
</style>