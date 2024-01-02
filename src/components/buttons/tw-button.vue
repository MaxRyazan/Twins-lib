<template>
    <button @click="$emit('push')"
            class="tw_button"
            :style="{
                width: props.width,
                height: props.height,
                border: props.border,
                backgroundColor: props.bgc,
                color: props.text_color,
            }"
            :class="{
                success,
                warn,
                error,
                disabled,
                outline,
                round,
                rounded,
                default_hover : !success && !warn && !error && !bgc_hover
            }">
        <i class="pi" :class="prime_icon" v-if="prime_icon"></i>
        <span class="tw_button_slot" :class="{tw_round_img: props.round}">
            <slot/>
        </span>
    </button>
</template>

<script setup lang="ts">

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


// onMounted(() => {
//     if (props.width) {
//         document.body.style.setProperty('--tw_button_width', props.width)
//     }
//     if (props.height) {
//         document.body.style.setProperty('--tw_button_height', props.height)
//     }
//     if (props.border) {
//         document.body.style.setProperty('--tw_button_border', props.border)
//     }
//     if (props.outline) {
//         document.body.style.setProperty('--tw_button_bgc', 'transparent')
//     }
//     if (props.bgc_hover) {
//         document.body.style.setProperty('--tw_button_bgc_hover', props.bgc_hover)
//     }
//     if (props.bgc) {
//         document.body.style.setProperty('--tw_button_bgc', props.bgc)
//     }
//     if (props.text_color) {
//         document.body.style.setProperty('--tw_button_text_color', props.text_color)
//     }
//     if(props.color_gamma && props.outline) {
//         document.body.style.setProperty('--tw_button_text_color', props.color_gamma)
//         document.body.style.setProperty('--tw_button_border', `1px solid ${props.color_gamma}`)
//         document.body.style.setProperty('--tw_button_bgc', 'transparent')
//         document.body.style.setProperty('--tw_button_default_hover_color', props.color_gamma)
//     }
//     if(props.color_gamma && !props.outline) {
//         document.body.style.setProperty('--tw_button_text_color', 'white')
//         document.body.style.setProperty('--tw_button_border', props.color_gamma)
//         document.body.style.setProperty('--tw_button_bgc', props.color_gamma)
//         document.body.style.setProperty('--tw_button_default_hover_color', props.color_gamma)
//     }
//     if(props.success && !props.outline && !props.text_color) {
//         document.body.style.setProperty('--tw_button_success_text_color', 'white')
//         document.body.style.setProperty('--tw_button_success_hover_color', 'white')
//     }
//     if(props.warn && !props.outline && !props.text_color) {
//         document.body.style.setProperty('--tw_button_warn_text_color', 'white')
//         document.body.style.setProperty('--tw_button_warn_hover_color', 'white')
//     }
//     if(props.error && !props.outline && !props.text_color) {
//         document.body.style.setProperty('--tw_button_error_text_color', 'white')
//         document.body.style.setProperty('--tw_button_error_hover_color', 'white')
//     }
//
//     if(props.success && props.text_color) {
//         document.body.style.setProperty('--tw_button_success_text_color', props.text_color)
//     }
//     if(props.warn && props.text_color) {
//         document.body.style.setProperty('--tw_button_warn_text_color', props.text_color)
//     }
//     if(props.error && props.text_color) {
//         document.body.style.setProperty('--tw_button_error_text_color', props.text_color)
//     }
// })


</script>