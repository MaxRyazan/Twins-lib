<template>
    <button @click="$emit('push')"
            class="tw_button"
            :style="{
                width: width,
                height: height,
                color: textColor,
                backgroundColor: bgc,
                borderColor: borderColor,
                borderWidth: borderWidth,
                borderRadius: borderRadius,

            }"
            :class="{success,warn,error,disabled}">
        <slot/>
    </button>
</template>

<script setup lang="ts">

import {onMounted} from "vue";

const props = defineProps<{
    success?: boolean
    error?: boolean
    warn?: boolean
    disabled?: boolean,

    width?: string,
    height?: string,
    bgc?: string,
    bgcHover?: string,
    textColor?: string,
    borderColor?: string,
    borderWidth?: string,
    borderRadius?: string,

}>()
defineEmits<{
    (e: 'push'): void
}>()

function setColor(property: string, value: string) {
    let variables: HTMLElement = document.querySelector(':root');
    variables.style.setProperty(property, value);
}

onMounted(() => {
    if (props.bgc) {
        setColor('--color-bg', props.bgc)
    }
    if (props.textColor) {
        setColor('--color-text', props.textColor)
    }
    if (props.borderColor) {
        setColor('--color-border', props.borderColor)
    }
    if (props.bgcHover) {
        setColor('--color-bg-hover', props.bgcHover)
    }
})

</script>