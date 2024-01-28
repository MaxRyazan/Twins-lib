<script setup lang="ts">
import {Ref, ref, watch} from "vue";

type T = number | string
const dropdownMultiItem = ref()
const currentSelectedItem: Ref<T> = ref()

interface TwDropDownMultiValues {
    [key: T]: Array<T>
}



const props = defineProps<{
    modelValue: T
    variants: Array<TwDropDownMultiValues>
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
    arrow_color?: string

}>()
const emit = defineEmits<{
    (e: 'update:modelValue', param: T)
}>()
const isOpen = ref(false)

function chooseVariant(variant: T) {
    emit('update:modelValue', variant)
    isOpen.value = false
}

watch(dropdownMultiItem, () => {
    if(props.hover_color && dropdownMultiItem.value) {
        dropdownMultiItem.value.forEach((item: HTMLElement) => item.addEventListener('mouseover', () => {
            item.style.backgroundColor = props.hover_color
        }))
        dropdownMultiItem.value.forEach((item:HTMLElement) => item.addEventListener('mouseout', () => {
            item.style.backgroundColor = props.bgc ?? ''
        }))
    }
})
watch(isOpen, (value) => {
    if(!value) {
        dropdownMultiItem.value.forEach((item: HTMLElement) => item.removeEventListener('mouseover', () => {
            item.style.backgroundColor = props.hover_color
        }))
        dropdownMultiItem.value.forEach((item:HTMLElement) => item.removeEventListener('mouseout', () => {
            item.style.backgroundColor = props.bgc ?? ''
        }))
        dropdownMultiItem.value = null
    }
})

</script>

<template>
    <div class="tw_dropdown" :style="{width: width}">
        <div class="tw_dropdown__title"
             :class="{bb_transparent: isOpen}"
             @click="isOpen = !isOpen"
             :style="{
                height: items_height,
                paddingTop: padding,
                paddingBottom: padding,
                paddingLeft: padding,
                border: border,
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
        <div class="tw_dropdown__variants"
             v-if="isOpen"
             :style="{
                 borderLeft: border,
                 borderRight: border,
                 borderBottom: border,
             }"
        >
            <div class="tw_dropdown__list"
                v-for="variant in variants" :key="Object.keys(variant)[0]"
                :style="{
                    backgroundColor: bgc
                }"
            >
                <div v-for="obj in Object.values(variant)" :key="Object.keys(variant)[0]" style="color: #121212; display: flex;">
                    <div style="width: 100%;height: 100%; cursor:pointer;" @click="currentSelectedItem = Object.keys(variant)[0]">
                        <span ref="dropdownMultiItem">
                            {{Object.keys(variant)[0]}}
                        </span>
                    </div>
                    <div style="position: absolute; top: 0; right:-100px" v-if="currentSelectedItem === Object.keys(variant)[0]">
                        <ul v-for="item in obj" :key="item"
                                :style="{
                                height: items_height,
                                padding: padding,
                                color: color,
                                justifyContent: text_center ? 'center' : 'start',
                                fontSize: font_size,
                                fontFamily: font_family,
                                fontWeight: font_weight
                            }">
                            <li ref="dropdownMultiItem"
                                @click="chooseVariant(item)"
                                style="color: white">{{item}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
