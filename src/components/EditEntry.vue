<template>
    <div>
        <div class="page-header">
            <h3>
                <b-link :to="'/topic/' + topic.id">{{ topic.text }}</b-link>
            </h3>
        </div>
        <b-overlay :show="uploading" rounded="sm" v-if="!loading">
            <EntryForm :entry="entry" v-on:submit="onSubmit"></EntryForm>
        </b-overlay>
        <h3 v-else>加载中...</h3>
    </div>
</template>

<script>
    import EntryForm from "./EntryForm/EntryForm";

    export default {
        name: "EditEntry",
        data() {
            return {
                entry: {},
                topic: {},
                loading: true,
                created: true,  // 初次创建
                uploading: false
            }
        },
        components: {EntryForm},
        mounted() {
            let entry_id = this.$route.params.entry_id;
            let topic_id = this.$route.params.topic_id;
            let vue = this;
            if (entry_id) {
                this.created = false;
                this.axios.get('/blog/entry/' + entry_id + '/detail/').then(function (response) {
                    let data = response.data;
                    vue.entry = data;
                    vue.topic = {id: data.topic, text: data.topic_text};
                    vue.loading = false;
                })
            } else {
                this.axios.get('/blog/topic/' + topic_id + '/detail/').then(function (response) {
                    vue.topic = response.data;
                    vue.loading = false;
                })
            }
        },
        methods: {
            onSubmit: function (event, entry, type) {
                event.preventDefault();
                this.uploading = true;

                let entry_id = this.$route.params.entry_id;
                let topic_id = this.$route.params.topic_id;
                let vue = this;

                if (!vue.entry.text || entry.text) {
                    vue.makeToast("保存失败", "内容是必填项", 'danger');
                    this.uploading = false;
                    return false;
                }
                // 创建或修改
                if (topic_id) {
                    this.axios.post('/blog/topic/' + topic_id + '/', vue.entry).then(function (response) {
                        vue.entry = response.data;
                        if (type !== 'saveAndEdit') {
                            vue.redirect();
                        } else {
                            vue.makeToast("保存成功", "保存成功");
                        }

                        // 替换路径，让用户刷新时还在新的文章编写界面
                        vue.$router.replace({path: '/entry/' + response.data.id})
                    }).catch(function () {
                        vue.makeToast("保存失败", "保存失败，请重试，如仍然失败请自行备份并联系管理员处理", 'danger');
                    }).finally(function () {
                        vue.uploading = false;
                    })
                } else if (entry_id) {
                    this.axios.put('/blog/entry/' + entry_id + '/detail/', entry).then(function (response) {
                        vue.entry = response.data;
                        if (type !== 'saveAndEdit') {
                            vue.redirect();
                        } else {
                            vue.makeToast("保存成功", "保存成功");
                        }
                    }).catch(function () {
                        vue.makeToast("保存失败", "保存失败，请重试，如仍然失败请自行备份并联系管理员处理", 'danger');
                    }).finally(function () {
                        vue.uploading = false;
                    })
                }
            },
            redirect: function () {
                this.$router.push({path: '/topic/' + this.topic.id});
            },
            makeToast: function (title, message, variant = 'success') {
                this.$bvToast.toast(message, {
                    title: title,
                    autoHideDelay: 3000,
                    variant: variant,
                    appendToast: true
                })
            }
        }
    }
</script>

<style scoped>

</style>