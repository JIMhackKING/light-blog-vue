<template>
    <b-popover
            :target="target"
            triggers="click"
            :show.sync="popoverShow"
            :placement="position"
            container="topic-container"
            @show="onShow"
            @shown="onShown"
    >
        <div>
            <b-form-group
                    label="主题名"
                    label-for="text-input"
                    label-cols="3"
                    :state="textState"
                    class="mb-1"
                    invalid-feedback="请填写主题名"
            >
                <b-form-input
                        ref="textInputer"
                        v-model="textInput"
                        :state="textState"
                        size="sm"
                ></b-form-input>
            </b-form-group>

            <b-button-group>
                <b-button @click="onOk" size="sm" variant="primary">保存</b-button>
                <b-button @click="onClose" size="sm" variant="default">取消</b-button>
            </b-button-group>
        </div>
    </b-popover>
</template>

<script>
    export default {
        name: "TopicPopover",
        props: {
            target: {
                type: String
            },
            position: {
                type: String,
                default() {
                    return 'auto'
                }
            },
            text: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        data() {
            return {
                textInput: this.text || '',
                textState: null,
                textInputReturn: '',
                popoverShow: false
            }
        },
        methods: {
            onClose() {
                this.popoverShow = false
            },
            onOk() {
                if (!this.textInput) {
                    this.textState = false
                } else {
                    this.onClose()
                    // Return our popover form results
                    this.textInputReturn = this.textInput;
                }
                this.$emit('submit');
            },
            onShow() {
                // This is called just before the popover is shown
                // Reset our popover form variables
                this.textState = null
            },
            onShown() {
                // Called just after the popover has been shown
                // Transfer focus to the first input
                this.focusRef(this.$refs.textInputer)
            },
            focusRef(ref) {
                // Some references may be a component, functional component, or plain element
                // This handles that check before focusing, assuming a `focus()` method exists
                // We do this in a double `$nextTick()` to ensure components have
                // updated & popover positioned first
                this.$nextTick(() => {
                    this.$nextTick(() => {
                        (ref.$el || ref).focus()
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>