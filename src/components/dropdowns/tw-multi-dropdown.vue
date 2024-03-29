<script setup lang="ts">
import {Ref, ref, watch} from "vue";



type T = number | string
const dropdownMultiItem = ref()
const dropdownMultiItemLast = ref()
const currentSelectedItem: Ref<T> = ref()

interface TwDropDownMultiValues {
    [key: T]: Array<T>
}


const props = defineProps<{
    modelValue: T
    variants: Array<TwDropDownMultiValues>
    width?: string
    items_height?: string
    color?: string
    border?: string
    text_center?: boolean
    bgc?: string
    hover_color?: string
    font_size?: string
    font_family?: string
    font_weight?: string
    arrow_color?: string
    orientation_left?: boolean
    horizontal_padding?: string
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', param: T)
}>()
const isOpen = ref(false)

function chooseVariant(variant: T) {
    emit('update:modelValue', variant)
    isOpen.value = false
}

function changeVisible() {
    isOpen.value = !isOpen.value
    if (!isOpen.value) currentSelectedItem.value = null
}

function showSubVariants(variant: T) {
    dropdownMultiItemLast.value = null
    currentSelectedItem.value = variant
}

watch(dropdownMultiItem, () => {
    if (props.hover_color && dropdownMultiItem.value) {
        dropdownMultiItem.value.forEach((item: HTMLElement) => item.addEventListener('mouseover', () => {
            item.style.backgroundColor = props.hover_color
        }))
        dropdownMultiItem.value.forEach((item: HTMLElement) => item.addEventListener('mouseout', () => {
            item.style.backgroundColor = props.bgc ?? ''
        }))
    }
})
watch(dropdownMultiItemLast, () => {
    if (props.hover_color && dropdownMultiItemLast.value) {
        dropdownMultiItemLast.value.forEach((item: HTMLElement) => item.addEventListener('mouseover', () => {
            item.style.backgroundColor = props.hover_color
        }))
        dropdownMultiItemLast.value.forEach((item: HTMLElement) => item.addEventListener('mouseout', () => {
            item.style.backgroundColor = props.bgc ?? ''
        }))
    }
})
watch(isOpen, (value) => {
    if (!value) {
        if (dropdownMultiItem.value) {
            dropdownMultiItem.value.forEach((item: HTMLElement) => item.removeEventListener('mouseover', () => {
                item.style.backgroundColor = props.hover_color
            }))
            dropdownMultiItem.value.forEach((item: HTMLElement) => item.removeEventListener('mouseout', () => {
                item.style.backgroundColor = props.bgc ?? ''
            }))
            dropdownMultiItem.value = null
        }
        if (dropdownMultiItemLast.value) {
            dropdownMultiItemLast.value.forEach((item: HTMLElement) => item.removeEventListener('mouseover', () => {
                item.style.backgroundColor = props.hover_color
            }))
            dropdownMultiItemLast.value.forEach((item: HTMLElement) => item.removeEventListener('mouseout', () => {
                item.style.backgroundColor = props.bgc ?? ''
            }))
            dropdownMultiItemLast.value = null
        }
    }
})

</script>

<template>
    <div class="tw_dropdown_multi" :style="{width: width}">
        <div class="tw_dropdown_multi__title"
             :class="{bb_transparent: isOpen}"
             @click="changeVisible"
             :style="{
                height: items_height,
                border: border,
                backgroundColor: bgc
             }">
            <input :style="{
                      color: color,
                      textAlign: text_center ? 'center' : (orientation_left ? 'end' : 'start'),
                      backgroundColor: bgc,
                      fontSize: font_size,
                      fontFamily: font_family,
                      fontWeight: font_weight,
                      paddingLeft:  horizontal_padding,
                      paddingRight: horizontal_padding
                    }"
                   class="tw_dropdown_multi__value"
                   :value="modelValue"
                   readonly
                   type="text">
            <div :style="{left: orientation_left ? '5px' : ''}" class="tw_icon">
                <div class="tw_icon__left"
                     :style="{
                        transform: isOpen ? 'rotate(60deg)' : 'rotate(-60deg)',
                        borderLeftColor: arrow_color
                     }"></div>
                <div class="tw_icon__right"
                     :style="{
                        transform: isOpen ? 'rotate(-60deg)' : 'rotate(60deg)',
                        borderRightColor: arrow_color
                     }"></div>
            </div>
        </div>
        <div class="tw_dropdown_multi__variants"
             v-if="isOpen"
             :style="{
                 borderLeft: border,
                 borderRight: border,
                 borderBottom: border,
             }"
        >
            <div v-for="variant in variants"
                 :key="Object.keys(variant)[0]"
                 :style="{ backgroundColor: bgc }">
                <div class="tw_dropdown_multi__first-title"
                     v-if="typeof variant !== 'object' && (typeof variant === 'string' || typeof variant === 'number')">
                    <span @mouseover="currentSelectedItem = null"
                          @click="chooseVariant(variant)"
                          ref="dropdownMultiItem"
                          style="width: 100%; height: 100%;"
                          :style="{
                               color: color,
                               height: items_height,
                               justifyContent: text_center ? 'center' : (orientation_left ? 'end' : 'start'),
                               fontSize: font_size,
                               fontFamily: font_family,
                               fontWeight: font_weight,
                               paddingLeft:  horizontal_padding,
                               paddingRight: horizontal_padding
                           }"
                    >
                          {{ variant }}
                    </span>
                </div>
                <div v-else>
                    <div v-for="obj in Object.values(variant)" :key="Object.keys(variant)[0]"
                         class="tw_dropdown_multi__first-title">
                        <div style="width: 100%; cursor:pointer;"
                             @mouseover="showSubVariants(Object.keys(variant)[0])">
                            <span ref="dropdownMultiItem"
                                  style="width: 100%; height: 100%;"
                                  :style="{
                                      color: color,
                                      height: items_height,
                                      justifyContent: text_center ? 'center' : (orientation_left ? 'end' : 'start'),
                                      fontSize: font_size,
                                      fontFamily: font_family,
                                      fontWeight: font_weight,
                                      paddingLeft:  horizontal_padding,
                                      paddingRight: horizontal_padding
                                  }"
                            >
                                {{ Object.keys(variant)[0] }}
                                <span class="arrows"
                                      v-if="orientation_left"
                                      style="position: absolute; left: 5px; width: 6px; height: 6px; font-size: 10px; font-family: cursive;"
                                      :style="{color: arrow_color}"
                                > &laquo; </span>
                                <span class="arrows"
                                      v-else
                                      style="position: absolute; right: 5px; width: 6px; height: 6px; font-size: 10px; font-family: cursive;"
                                      :style="{color: arrow_color}"
                                > &raquo; </span>
                            </span>
                        </div>
                        <div class="tw_dropdown_multi__list"
                             :class="{'orientation__left': orientation_left}"
                             v-if="currentSelectedItem === Object.keys(variant)[0]">
                            <ul class="tw_dropdown_multi_last_title"
                                :style="{
                                     border: border,
                                     backgroundColor: bgc
                            }">
                                <li ref="dropdownMultiItemLast"
                                    v-for="item in obj" :key="item"
                                    :style="{
                                    height: items_height,
                                    color: color,
                                    justifyContent: text_center ? 'center' : (orientation_left ? 'end' : 'start'),
                                    fontSize: font_size,
                                    fontFamily: font_family,
                                    fontWeight: font_weight,
                                    paddingLeft:  horizontal_padding,
                                    paddingRight: horizontal_padding
                                }"
                                    @click="chooseVariant(item)">{{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
