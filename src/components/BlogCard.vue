<template>
    <div>
        <b-modal title="确认删除？" :id="'deleteModal_' + blog.id">
            <div class="modal-body">
                <p>请确认是否删除如下条目:</p>
                <ul>
                    <li>ID: {{ blog.id }}</li>
                    <li>简介: {{ blog.comment||'无' }}</li>
                    <li>内容: {{ blog.text|strSlice(50) }}</li>
                </ul>
            </div>
            <template v-slot:modal-footer="{cancel}">
                <b-button variant="info" @click="cancel()">放弃</b-button>
                <b-button variant="danger" v-on:click="deleteEntry(blog.id)">是的</b-button>
            </template>
        </b-modal>
        <b-card style="margin-bottom: 20px">
            <template v-slot:header>
                <h3>
                    <span title="点击查看更多信息" v-b-toggle="'info_' + blog.id">{{ blog.date_added|dateFormat("Y M月 DD日 hh:mm") }}</span>
                    <small style="margin-left: 20px" v-if="showTopicLink">
                    <span>
                        <b-link :to="'/topic/' + blog.topic">
                            {{blog.topic_text}}
                        </b-link>
                    </span>
                    </small>
                    <small style="float: right">
                        <b-button-group>
                            <b-button variant="outline-secondary" :to="'/entry/' + blog.id">
                                <b-icon-pencil-square></b-icon-pencil-square>
                                编辑
                            </b-button>
                            <!-- Button trigger modal -->
                            <b-button v-b-modal="'deleteModal_' + blog.id" variant="outline-danger">
                                <b-icon-trash></b-icon-trash>
                                删除
                            </b-button>
                        </b-button-group>
                    </small>
                </h3>
                <b-collapse class="mt-2" v-bind:id="'info_' + blog.id">
                    <span style="font-size: 12px; color: #8c8c8cbd;">最后修改于 {{ blog.last_modified|dateFormat("Y M月 DD日 hh:mm") }}</span>
                    <p style="color: #999">简介：{{ blog.comment||'无' }}</p>
                </b-collapse>
            </template>
            <b-card-text>
                <div class="card-body" style="overflow:visible">
                    <!-- 仅预览模式 -->
                    <mavon-editor :toolbarsFlag="false" :subfield="false" defaultOpen="preview"
                                  :value="summary ? this.$options.filters['strSlice'](blog.text, 200) : blog.text"
                                  :boxShadow="false"
                                  :ishljs="true"
                                  style="min-height: 0;min-width: 0;border: 0;position:unset"
                    />
                </div>
                <div style="margin-left: 20px;" v-if="summary">
                    <p>
                        <b-link :to="'/entry/' + blog.id + '/detail'">查看详情...</b-link>
                    </p>
                </div>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "BlogCard",
        props: {
            // 提供默认值
            blog: {type: Object},
            showTopicLink: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            summary: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        methods: {
            deleteEntry: function (entry_id) {
                let vue = this;
                this.axios.delete("/blog/entry/" + entry_id + "/detail/").then(function () {
                    // 触发父组件remove事件，在调用组件的时候传入
                    vue.$emit('remove');
                })
            }
        },
        filters: {
            // 日期格式化
            dateFormat: function (dateStr, formatStr = 'YYYY-MM-DD HH:mm:ss') {
                return moment(dateStr).local('zh').format(formatStr)
            },
            // 字符串切割
            strSlice: function (str, length = 50) {
                if (str.length <= length) return str;
                else return str.slice(0, length) + '...';
            }
        }
    }
</script>

<style scoped>
/*深度选择器，可以修改子组件样式*/
    >>> .v-show-content {
        padding: 0 !important;
        background-color: unset !important;
    }
    /*
    >>> .markdown-body img {
        max-height: 300px;
    }
    */
</style>