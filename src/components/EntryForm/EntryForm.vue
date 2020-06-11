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
            <b-form-textarea
                    required
                    id="textInput"
                    v-model="entry.text"
                    placeholder="内容"
                    rows="6"
            ></b-form-textarea>
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
        methods: {
            onSubmit: function (event, type='save') {
                this.$emit('submit', event, type);
            }
        }
    }
</script>

<style scoped>
    #entryForm .form-group {
        font-weight: 700;
    }
</style>