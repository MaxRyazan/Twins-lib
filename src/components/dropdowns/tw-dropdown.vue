<script setup lang="ts">
import {ref} from "vue";

type T = number | string


defineProps<{
    modelValue: T
    variants: Array<T>
    width?: string
    items_height?: string
    padding?: string
    color?: string
    border?: string
    text_center?: boolean

}>()
const emit = defineEmits<{
    (e: 'update:modelValue', param: any)
}>()
const isOpen = ref(false)

function chooseVariant(variant: any) {
    emit('update:modelValue', variant)
    isOpen.value = false
}


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
             }">
            <input :style="{
                      color: color,
                      textAlign: text_center ? 'center' : 'start'
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
            <ul class="tw_dropdown__list" v-for="variant in variants" :key="variant">
                <li @click="chooseVariant(variant)"
                    :style="{
                        height: items_height,
                        padding: padding,
                        color: color,
                        justifyContent: text_center ? 'center' : 'start'
                    }">
                    <span>{{ variant }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
