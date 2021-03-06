<template>
    <b-form @submit="onSubmit" id="entryForm">
        <b-form-group
                label="简介"
                label-for="commentInput"
                description="可写下关于文章的简介，非必填"
        >
            <b-form-input
                    id="commentInput"
                    v-model="entry.comment"
                    type="text"
                    placeholder="简介"
            ></b-form-input>
        </b-form-group>

        <b-form-group label="内容" label-for="textInput">
            <mavon-editor
                    ref="editor"
                    style="z-index: 1;max-height: 500px"
                    v-model="entry.text"
                    :ishljs="true"
                    :toolbars="toolbars"
                    @save="onSubmit(null, 'saveAndEdit')"
                    @imgAdd="$imgAdd"
                    @imgDel="$imgDel"
            />
        </b-form-group>

        <b-button type="submit" variant="primary">保存</b-button>
        <b-button variant="primary" style="margin-left: 10px" id="saveAndEdit"
                  v-on:click="onSubmit($event, 'saveAndEdit')">保存并继续编辑
        </b-button>
    </b-form>
</template>

<script>
    export default {
        name: "EntryForm",
        props: {
            entry: {
                type: Object,
                default() {
                    return {text: '', comment: ''}
                }
            }
        },
        data() {
            return {
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: false, // 展示html源码
                    help: false, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: false, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                }
            }
        },
        methods: {
            getUrlRelativePath: function (url) {
                /* 获取当前地址，如http://www.xxx.com */
                let arrUrl;
                if (url) {
                    arrUrl = url.split("//");
                } else {
                    arrUrl = document.location.toString().split("//");
                }

                var start = arrUrl[1].indexOf("/");
                var relUrl = arrUrl[1].substring(0, start);
                return arrUrl[0] + '//' + relUrl;
            },
            onSubmit: function (event, type='save') {
                this.$emit('submit', event, type);
            },
            $imgAdd: function (pos, $file) {
                // 将图片上传到服务器
                let vue = this;
                let formdata = new FormData();
                formdata.append('image', $file);
                this.axios.post("/blog/upload_img/", formdata, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((response) => {  // ES6的写法
                    vue.$refs.editor.$img2Url(pos, (process.env.NODE_ENV === 'development' ? vue.getUrlRelativePath(process.env.VUE_APP_BASE_URL) : '') + response.data.link);  // 修改图片链接
                })
            },
            $imgDel: function (pos) {
                // 如果是编辑，可以在后端保存当前条目id到文件名中，然后去搜索和删除
                // 如果是新建，则可以在保存的时候将editor的图片链接改掉，并且将本地临时保存的图片名字也做修改，记录上条目ID
                console.log(pos);
            }
        }
    }
</script>

<style scoped>
    #entryForm .form-group {
        font-weight: 700;
    }
</style>