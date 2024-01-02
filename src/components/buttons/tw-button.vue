<template>
    <button ref="tw_lib_Button"
            @click="$emit('push')"
            :style="{
                width: width,
                height: height,
                border: border,
                backgroundColor: bgc,
                color: text_color
            }"
            class="tw_button"
            :class="{
                success,
                warning,
                error,
                disabled,
                outline,
                rounded,
                round,
            }">
        <span class="tw_button_slot">
            <slot/>
        </span>
    </button>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps<{
    width?: string,
    height?: string,

    success?: boolean
    warning?: boolean
    error?: boolean
    outline?: boolean
    rounded?: boolean
    round?: boolean
    disabled?: boolean,

    border?: string,
    bgc?: string,
    text_color?: string,
    hover?: string
    prime_icon?: string
}>()
defineEmits<{
    (e: 'push'): void
}>()

const tw_lib_Button = ref()

onMounted(() => {
    let initialColor = props.bgc ?? document.body.style.getPropertyValue('--tw_button_default_background_color')
    if(props.success) initialColor = document.body.style.getPropertyValue('--tw_button_success_background_color')
    if(props.warning) initialColor = document.body.style.getPropertyValue('--tw_button_warning_background_color')
    if(props.error) initialColor = document.body.style.getPropertyValue('--tw_button_error_background_color')
    if(props.outline) initialColor = document.body.style.getPropertyValue('--tw_button_outline_background_color')
    if(props.hover) {
        tw_lib_Button.value.addEventListener('mouseover', () => {
            tw_lib_Button.value.style.backgroundColor = props.hover
        })
        tw_lib_Button.value.addEventListener('mouseout', () => {
            tw_lib_Button.value.style.backgroundColor = initialColor
        })
    }
})

onUnmounted(() => {
    if(props.hover){
        tw_lib_Button.value.replaceWith(tw_lib_Button.value.cloneNode(true));
    }
})

</script>
