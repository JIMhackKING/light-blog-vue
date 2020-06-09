<template>
    <b-popover
            :target="target"
            triggers="focus"
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
                <b-button @click="onClose" size="sm" :variant="resetButtonType">{{resetButtonText}}</b-button>
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
            topic: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                textInput: this.topic.text || '',
                textInputReturn: this.topic.text || '',
                textState: null,
                popoverShow: false,
            }
        },
        computed: {
            resetButtonType: function () {
                return this.textInput === this.textInputReturn ? 'default' : 'danger';
            },
            resetButtonText: function () {
                return this.textInput === this.textInputReturn ? '取消' : '重置';
            }
        },
        methods: {
            onClose() {
                if (this.resetButtonType === 'default') {
                    this.popoverShow = false;
                } else {
                    this.textInput = this.textInputReturn;
                }
            },
            onOk() {
                if (!this.textInput) {
                    this.textState = false
                } else {
                    this.popoverShow = false;
                    this.textInputReturn = this.textInput;
                }

                let newTopic = this.topic;
                newTopic.text = this.textInputReturn
                this.$emit('update:topic', newTopic)
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