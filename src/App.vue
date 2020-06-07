<template>
    <div id="app">
        <HeaderBar style="margin-bottom: 40px"></HeaderBar>
        <div class="container" style="/*margin-top: 100px*/">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import HeaderBar from './components/Header';

    export default {
        name: "App",
        data() {
            return {
                pageHeader: ''
            }
        },
        components: {
            HeaderBar
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
