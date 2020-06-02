<template>
    <div id="app">
        <HeaderBar style="margin-bottom: 40px;"></HeaderBar>
        <div class="container">
            <b-card header-tag="header" style="margin-bottom: 20px" v-for="blog in blogs" v-bind:key="blog.id">
                <b-card-header><b-link href="#" class="secondary-link"><h4>{{ blog.title }}</h4></b-link></b-card-header>
                <b-card-text>
                    <div class="card-body" style="overflow:visible">
                        <!-- <mavon-editor v-model="value" :ishljs="true"/> -->
                        <span v-html="convertHtml(blog.content)"></span>
                    </div>
                </b-card-text>
            </b-card>
        </div>
    </div>
</template>

<script>
    import HeaderBar from './components/Header';
    import marked from 'marked';
    import axios from 'axios';

    marked.setOptions({ // marked 设置
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    })

    export default {
        name: "App",
        components: {
            HeaderBar,
        },
        data() {
            return {
                value: marked("```javascript\nvar a = 'xfdsa';\nconsole.log(a);```"),
                blogs: []
            }
        },
        methods: {
            convertHtml: function (markdown) {
                return marked(markdown);
            }
        },
        mounted: function () {
            let vue = this;
            axios.get("http://127.0.0.1:8000/blog/").then(function (response) {
                vue.blogs = response.data;
            })
        }
    };
</script>

<style scoped>
.secondary-link {
    color: black;
}
.secondary-link:visited {
    color: #969696;
}
</style>
