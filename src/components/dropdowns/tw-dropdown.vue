<script setup lang="ts">
import {ref, watch} from "vue";

type T = number | string
const dropdownItem = ref()

const props = defineProps<{
    modelValue: T
    variants: Array<T>
    width?: string
    items_height?: string
    padding?: string
    color?: string
    border?: string
    text_center?: boolean
    bgc?: string
    hover_color?: string
    font_size?: string
    font_family?: string
    font_weight?: string

}>()
const emit = defineEmits<{
    (e: 'update:modelValue', param: T)
}>()
const isOpen = ref(false)

function chooseVariant(variant: T) {
    emit('update:modelValue', variant)
    isOpen.value = false
}

watch(dropdownItem, () => {
    if(props.hover_color && dropdownItem.value) {
        dropdownItem.value.forEach((item: HTMLElement) => item.addEventListener('mouseover', () => {
            item.style.backgroundColor = props.hover_color
        }))
        dropdownItem.value.forEach((item:HTMLElement) => item.addEventListener('mouseout', () => {
            item.style.backgroundColor = props.bgc ?? ''
        }))
    }
})
watch(isOpen, (value) => {
    if(!value) {
        dropdownItem.value.forEach((item: HTMLElement) => item.removeEventListener('mouseover', () => {
            item.style.backgroundColor = props.hover_color
        }))
        dropdownItem.value.forEach((item:HTMLElement) => item.removeEventListener('mouseout', () => {
            item.style.backgroundColor = props.bgc ?? ''
        }))
        dropdownItem.value = null
    }
})

</script>

<template>
    <div class="tw_dropdown" :style="{width: width}">
        <div class="tw_dropdown__title"
             @click="isOpen = !isOpen"
             :style="{
                height: items_height,
                paddingTop: padding,
                paddingBottom: padding,
                paddingLeft: padding,
                border: border,
                borderBottomWidth : isOpen ? '0px' : '',
                backgroundColor: bgc
             }">
            <input :style="{
                      color: color,
                      textAlign: text_center ? 'center' : 'start',
                      backgroundColor: bgc,
                      fontSize: font_size,
                      fontFamily: font_family,
                      fontWeight: font_weight
                    }"
                    class="tw_dropdown__value"
                    :value="modelValue" readonly
                    type="text">
            <div class="tw_icon">
                <div class="tw_icon__left"
                     :style="{ transform: isOpen ? 'rotate(60deg)' : 'rotate(-60deg)'}"></div>
                <div class="tw_icon__right"
                     :style="{transform: isOpen ? 'rotate(-60deg)' : 'rotate(60deg)'}"></div>
            </div>
        </div>
        <div class="tw_dropdown__variants"
             v-if="isOpen"
             :style="{
                 borderLeft: border,
                 borderRight: border,
                 borderBottom: border,
             }"
        >
            <ul class="tw_dropdown__list"
                v-for="variant in variants" :key="variant"
                :style="{
                    backgroundColor: bgc
                }"
            >
                <li @click="chooseVariant(variant)"
                    ref="dropdownItem"
                    :style="{
                        height: items_height,
                        padding: padding,
                        color: color,
                        justifyContent: text_center ? 'center' : 'start',
                        fontSize: font_size,
                        fontFamily: font_family,
                        fontWeight: font_weight
                    }">
                    <span>{{ variant }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
