<template>
    <button @click="$emit('push')"
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
        <slot/>
    </button>
</template>

<script setup lang="ts">
defineProps<{
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

    prime_icon?: string
}>()
defineEmits<{
    (e: 'push'): void
}>()

</script>
