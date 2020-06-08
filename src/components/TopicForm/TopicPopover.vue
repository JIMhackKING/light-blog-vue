<template>
    <b-popover
            target="popover-reactive-1"
            triggers="click"
            :show.sync="popoverShow"
            placement="auto"
            container="topic-container"
            ref="topicPopover"
            @show="onShow"
            @shown="onShown"
            @hidden="onHidden"
    >
        <template v-slot:title>
            <b-button @click="onClose" class="close" aria-label="Close">
                <span class="d-inline-block" aria-hidden="true">x</span>
            </b-button>
            Interactive Content
        </template>

        <div>
            <b-form-group
                    label="Name"
                    label-for="popover-input-1"
                    label-cols="3"
                    :state="input1state"
                    class="mb-1"
                    description="Enter your name"
                    invalid-feedback="This field is required"
            >
                <b-form-input
                        ref="input1"
                        id="popover-input-1"
                        v-model="input1"
                        :state="input1state"
                        size="sm"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                    label="Color"
                    label-for="popover-input-2"
                    label-cols="3"
                    :state="input2state"
                    class="mb-1"
                    description="Pick a color"
                    invalid-feedback="This field is required"
            >
                <b-form-select
                        id="popover-input-2"
                        v-model="input2"
                        :state="input2state"
                        :options="options"
                        size="sm"
                ></b-form-select>
            </b-form-group>

            <b-alert show class="small">
                <strong>Current Values:</strong><br>
                Name: <strong>{{ input1 }}</strong><br>
                Color: <strong>{{ input2 }}</strong>
            </b-alert>

            <b-button @click="onClose" size="sm" variant="danger">Cancel</b-button>
            <b-button @click="onOk" size="sm" variant="primary">Ok</b-button>
        </div>
    </b-popover>
</template>

<script>
    export default {
        name: "TopicPopover",
        data() {
            return {
                input1: '',
                input1state: null,
                input2: '',
                input2state: null,
                options: [{ text: '- Choose 1 -', value: '' }, 'Red', 'Green', 'Blue'],
                input1Return: '',
                input2Return: '',
                popoverShow: false
            }
        },
        watch: {
            input1(val) {
                if (val) {
                    this.input1state = true
                }
            },
            input2(val) {
                if (val) {
                    this.input2state = true
                }
            }
        },
        methods: {
            onClose() {
                this.popoverShow = false
            },
            onOk() {
                if (!this.input1) {
                    this.input1state = false
                }
                if (!this.input2) {
                    this.input2state = false
                }
                if (this.input1 && this.input2) {
                    this.onClose()
                    // Return our popover form results
                    this.input1Return = this.input1
                    this.input2Return = this.input2
                }
            },
            onShow() {
                // This is called just before the popover is shown
                // Reset our popover form variables
                this.input1 = ''
                this.input2 = ''
                this.input1state = null
                this.input2state = null
                this.input1Return = ''
                this.input2Return = ''
            },
            onShown() {
                // Called just after the popover has been shown
                // Transfer focus to the first input
                this.focusRef(this.$refs.input1)
            },
            onHidden() {
                // Called just after the popover has finished hiding
                // Bring focus back to the button
                this.focusRef(this.$refs.button)
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