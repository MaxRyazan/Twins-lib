<template>
    <button ref="btn" @click="$emit('push')"
            class="tw_button"
            :style="{
                width: width,
                height: height,
                color: textColor ? textColor : (color_gamma ? (outline ? color_gamma : 'white') : (outline ? (success ? 'forestgreen': (error ? 'crimson' : (warn ? 'orange' : 'white'))) : 'white')),
                backgroundColor: bgc ? bgc : color_gamma,
                border: border,
                borderColor: color_gamma
            }"
            :class="{
                success,
                warn,
                error,
                disabled,
                outline,
                round,
                rounded,
                default_hover : color_gamma,
                default: !color_gamma && !textColor && !success && !error && !warn
            }">
        <i class="pi" :class="prime_icon" v-if="prime_icon"></i>
        <slot/>
    </button>
</template>

<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";

const btn = ref()

const props = defineProps<{
    success?: boolean
    error?: boolean
    warn?: boolean
    color_gamma?: string,

    outline?: boolean

    rounded?: boolean
    round?: boolean
    disabled?: boolean,

    width?: string,
    height?: string,
    bgc?: string,
    bgcHover?: string,
    textColor?: string,
    border?: string,

    prime_icon?: string
}>()
defineEmits<{
    (e: 'push'): void
}>()


onMounted(() => {
    if (props.bgcHover) {
        btn.value.addEventListener('mouseover', () => {
            btn.value.style.backgroundColor = props.bgcHover
        })
        btn.value.addEventListener('mouseout', () => {
            btn.value.style.backgroundColor = props.bgc
        })
    }
})

onUnmounted(() => {
    if (props.bgcHover) {
        btn.value.removeEventListener('mouseover', () => {
            btn.value.style.backgroundColor = props.bgcHover
        })
        btn.value.removeEventListener('mouseout', () => {
            btn.value.style.backgroundColor = props.bgc
        })
    }
})

</script>