<template>
    <button ref="btn" @click="$emit('push')"
            class="tw_button"
            :style="{
                width: width,
                height: height,
                color: textColor,
                backgroundColor: bgc,
                borderColor: borderColor,
                borderWidth: borderWidth,
                borderRadius: borderRadius,
                borderStyle: borderType,
            }"
            :class="{success,warn,error,disabled}">
        <slot/>
    </button>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
const btn = ref()

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
    borderType?: string,

}>()
defineEmits<{
    (e: 'push'): void
}>()


onMounted(() => {
    if(props.bgcHover) {
        btn.value.addEventListener('mouseover', () => {
            btn.value.style.backgroundColor = props.bgcHover
        })
        btn.value.addEventListener('mouseout', () => {
            btn.value.style.backgroundColor = props.bgc
        })
    }
})

</script>