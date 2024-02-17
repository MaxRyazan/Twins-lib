<script setup lang="ts">

import {onMounted, ref} from "vue";
import {generateUUID} from '@/helpers'
const emits = defineEmits<{
    (e: 'update:modelValue', param:boolean): void
}>()

let uuid = ref("")
let twCheckbox = ref()

const props = defineProps<{
    modelValue: boolean
    label?: string
    border?: string
    size?: string
    bgc?: string
    checkedColor?: string
    gap?: string
}>()

function check() {
    if(props.modelValue) {
        emits('update:modelValue', false)
        twCheckbox.value.checked = false
            console.log(window.getComputedStyle(
        document.querySelector(`#${uuid.value}`), ':before'
    ))
    }
    else {
        emits('update:modelValue', true)
        twCheckbox.value.checked = true
            console.log(window.getComputedStyle(
        document.querySelector(`#${uuid.value}`), ':before'
    ))
    }
}
onMounted(() => {
    uuid.value = generateUUID()
    if(props.modelValue) twCheckbox.value.checked = true

})
</script>

<template>
    <div class="tw_checkbox__wrapper">
        <input ref="twCheckbox" @click="check" type="checkbox" :id="uuid">
        <label :for="uuid"></label>
        <span @click="check" class="tw_checkbox__text">{{label}}</span>
    </div>
</template>
