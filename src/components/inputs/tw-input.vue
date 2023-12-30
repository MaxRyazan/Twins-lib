<script setup lang="ts">
import {onMounted} from "vue";

const props = defineProps<{
    modelValue: any,

    width?: string
    height?: string

    input_width?: string
    input_font_size?: string
    input_font_family?: string

    type?: string
    min?: number
    max?: number
    step?: number
    max_length?: number
    vertical?: boolean
    text_align?: string
    border_radius?: string
    padding?: string
    placeholder?: string
    disabled?: boolean
    prefix?: string
    postfix?: string

    bgc?: string
    border?: string
    border_bottom_color?: string
    caret_color?: string
    input_color?: string

    prefix_color?:string
    postfix_color?:string
    prefix_fz?: string
    postfix_fz?: string
    prefix_ff?: string
    postfix_ff?: string

}>()
const emits = defineEmits<{
    (e:'update:modelValue', value: any)
}>()
function handleAction($event: any){
    if(props.type==='number'){
        emits('update:modelValue', +$event.target.value)
    } else {
        emits('update:modelValue', $event.target.value)
    }
}

onMounted(() => {
    if (props.input_width) {
        document.body.style.setProperty('--tw_input_width', props.input_width)
    }
    if (props.input_font_family) {
        document.body.style.setProperty('--tw_input_font_family', props.input_font_family)
    }
    if (props.input_font_size) {
        document.body.style.setProperty('--tw_input_font_size', props.input_font_size)
    }
    if (props.prefix_color) {
        document.body.style.setProperty('--tw_input_prefix_color', props.prefix_color)
    }
    if (props.prefix_fz) {
        document.body.style.setProperty('--tw_input_prefix_font_size', props.prefix_fz)
    }
    if (props.prefix_ff) {
        document.body.style.setProperty('--tw_input_prefix_font_family', props.prefix_ff)
    }
    if (props.postfix_color) {
        document.body.style.setProperty('--tw_input_postfix_color', props.postfix_color)
    }
    if (props.postfix_fz) {
        document.body.style.setProperty('--tw_input_postfix_font_size', props.postfix_fz)
    }
    if (props.postfix_ff) {
        document.body.style.setProperty('--tw_input_postfix_font_family', props.postfix_ff)
    }
    if (props.height) {
        document.body.style.setProperty('--tw_input_height', props.height)
    }
    if (props.border) {
        document.body.style.setProperty('--tw_input_border', props.border)
    }
    if (props.border_radius) {
        document.body.style.setProperty('--tw_input_border_radius', props.border_radius)
    }
    if (props.padding) {
        document.body.style.setProperty('--tw_input_padding', props.padding)
    }
    if (props.text_align) {
        document.body.style.setProperty('--tw_input_text_align', props.text_align)
    }
    if (props.bgc) {
        document.body.style.setProperty('--tw_input_bgc', props.bgc)
    }
    if (props.border_bottom_color) {
        document.body.style.setProperty('--tw_border_bottom_color', props.border_bottom_color)
    }
    if (props.caret_color) {
        document.body.style.setProperty('--tw_input_caret_color', props.caret_color)
    }
    if (props.input_color) {
        document.body.style.setProperty('--tw_input_color', props.input_color)
    }
    if (props.width) {
        document.body.style.setProperty('--tw_input_component_width', props.width)
    }
    if (props.height) {
        document.body.style.setProperty('--tw_input_component_height', props.height)
    }
})
</script>

<template>
    <div class="tw_input_component">
        <div class="tw_input_wrap" :class="{'tw_input_vertical':vertical}">
            <span class="tw_input_prefix" v-if="prefix">{{ prefix }}</span>
            <div class="tw_input_wrapper" :class="{'tw_input_w100': !prefix}">
                <input  :value="modelValue"
                        @input="handleAction"
                        class="tw_input"
                        :class="{'tw_input_disabled': disabled}"
                        :type="type ?? 'text'"
                        :min="min"
                        :max="max"
                        :step="step"
                        :maxlength="max_length"
                        :placeholder="placeholder"
                        :disabled="disabled"
                />
                <span  class="tw_input_postfix" v-if="postfix">{{ postfix }}</span>
            </div>
        </div>
        <span>
            <slot name="validator"/>
        </span>
    </div>
</template>
