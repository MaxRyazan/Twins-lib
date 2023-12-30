<template>
    <button @click="$emit('push')"
            class="tw_button"
            :class="{
                success,
                warn,
                error,
                disabled,
                outline,
                round,
                rounded,
                default_hover : color_gamma,
                default: !color_gamma && !text_color && !success && !error && !warn
            }">
        <i class="pi" :class="prime_icon" v-if="prime_icon"></i>
        <span class="tw_button_slot">
            <slot/>
        </span>
    </button>
</template>

<script setup lang="ts">

import {onMounted} from "vue";

const props = defineProps<{
    width?: string,
    height?: string,

    success?: boolean
    error?: boolean
    warn?: boolean

    outline?: boolean
    rounded?: boolean
    round?: boolean
    disabled?: boolean,

    border?: string,
    bgc?: string,
    bgc_hover?: string,
    text_color?: string,
    color_gamma?: string,

    prime_icon?: string
}>()
defineEmits<{
    (e: 'push'): void
}>()


onMounted(() => {
    if (props.width) {
        document.body.style.setProperty('--tw_button_width', props.width)
    }
    if (props.height) {
        document.body.style.setProperty('--tw_button_height', props.height)
    }
    if (props.border) {
        document.body.style.setProperty('--tw_button_border', props.border)
    }
    if (props.outline) {
        document.body.style.setProperty('--tw_button_bgc', 'transparent')
    }
    if (props.bgc_hover) {
        document.body.style.setProperty('--tw_button_bgc_hover', props.bgc_hover)
    }
    if (props.bgc) {
        document.body.style.setProperty('--tw_button_bgc', props.bgc)
    }
    if (props.text_color) {
        document.body.style.setProperty('--tw_button_text_color', props.text_color)
    }
    if(props.color_gamma && props.outline) {
        document.body.style.setProperty('--tw_button_text_color', props.color_gamma)
        document.body.style.setProperty('--tw_button_border', props.color_gamma)
        document.body.style.setProperty('--tw_button_bgc', 'transparent')
        document.body.style.setProperty('--tw_button_default_hover_color', props.color_gamma)
    }
    if(props.color_gamma && !props.outline) {
        document.body.style.setProperty('--tw_button_text_color', 'white')
        document.body.style.setProperty('--tw_button_border', props.color_gamma)
        document.body.style.setProperty('--tw_button_bgc', props.color_gamma)
        document.body.style.setProperty('--tw_button_default_hover_color', props.color_gamma)
    }
})


</script>