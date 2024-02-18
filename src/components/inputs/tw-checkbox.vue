<script setup lang="ts">

import {onMounted, ref} from "vue";
import {generateUUID} from '@/helpers'
const emits = defineEmits<{
    (e: 'update:modelValue', param:boolean): void
}>()

let uuid = ref("")
let twCheckbox = ref()
let twInnerWrapper = ref()
let errorMessage = ref("Это поле обязательно!")

const props = defineProps<{
    modelValue: boolean
    label?: string
    border?: string
    size?: string
    bgc?: string
    checkedColor?: string
    gap?: string
    font_size?: string
    color?: string
    font_family?: string
    font_weight?: string
    invalid?: boolean
    error_message?: string
}>()

function check() {
    if(props.modelValue) {
        emits('update:modelValue', false)
        twCheckbox.value.checked = false
        twInnerWrapper.value.classList.add('tw_checkbox__hide')
    }
    else {
        emits('update:modelValue', true)
        twCheckbox.value.checked = true
        twInnerWrapper.value.classList.remove('tw_checkbox__hide')
    }
}
onMounted(() => {
    uuid.value = generateUUID()
    if(props.modelValue) {
        twCheckbox.value.checked = true
        twInnerWrapper.value.classList.remove('tw_checkbox__hide')
    }
    if(props.error_message) {
        errorMessage.value = props.error_message
    }

})
</script>

<template>
    <div style="display: flex; flex-direction: column; position: relative">
        <div class="tw_checkbox__wrapper" :style="{gap: gap}">
            <div @click="check"
                 class="tw_checkbox__inner-wrapper"
                 :class="{invalid}"
                 :style="{
                    border: border,
                    width: size,
                    height: size,
                    backgroundColor: bgc,
                 }"
            >
                <div ref="twInnerWrapper"
                     class="tw_checkbox__check-symbol tw_checkbox__hide"
                     :style="{
                        border: `2px solid ${checkedColor}`,
                        borderWidth: '0 2px 2px 0'
                     }"
                ></div>
                <input ref="twCheckbox" type="checkbox" :id="uuid">
            </div>
            <span @click="check"
                  class="tw_checkbox__text"
                  :style="{
                     color: color,
                     fontFamily: font_family,
                     fontSize: font_size,
                     fontWeight: font_weight
                  }"
            >{{label}}</span>
        </div>
        <span v-if="invalid" class="tw_checkbox__message">{{errorMessage}}</span>
    </div>
</template>
