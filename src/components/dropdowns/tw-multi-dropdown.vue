<script setup lang="ts">
import {ref, watch} from "vue";

type T = number | string
type Item = { title: T, value: Array<T> }
type Multi = {title: T, value: Array<Item>}
const props = defineProps<{
    modelValue: T
    variants: Array<Multi>
    width?: string
    initialHeight?: string
    variantsHeight?: string
    border?: string
    largeArrow?: boolean
    arrowColor?: string
    hoverColor?: string
    bgc?: string
    initialBgc?: string
    fontSize?: string
    fontColor?: string
    itemHeight?: string
    textCenter?: boolean
    borderRadius?: string
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', param: any)
}>()
const isOpen = ref(false)
const showSubVariants = ref(false)
const showSubSubVariants = ref(false)
const chosenVariant = ref()
const chosenSubVariant = ref()
const tw_variant_ref = ref()

function openSub(variant: Multi) {
    showSubVariants.value = true
    chosenVariant.value = variant
}
function openSubSub(subVariant: Item){
    chosenSubVariant.value = subVariant
    showSubSubVariants.value = true
}

function chooseSubVariant(variant: T) {
    console.log(variant)
    showSubVariants.value = false
    isOpen.value = false
    chosenVariant.value = {}
    emit('update:modelValue', variant)
}

watch(tw_variant_ref, () => {
    if (tw_variant_ref.value) {
        if (isOpen.value) {
            tw_variant_ref.value.forEach((item: HTMLElement) => item.addEventListener('mouseover', () => {
                item.style.backgroundColor = props.hoverColor ?? 'lightgreen'
            }))
            tw_variant_ref.value.forEach((item: HTMLElement) => item.addEventListener('mouseout', () => {
                item.style.backgroundColor = props.bgc ?? 'white'
            }))
        } else {
            tw_variant_ref.value.forEach((item: HTMLElement) => item.removeEventListener('mouseover', () => {
                item.style.backgroundColor = props.hoverColor ?? 'lightgreen'
            }))
            tw_variant_ref.value.forEach((item: HTMLElement) => item.removeEventListener('mouseout', () => {
                item.style.backgroundColor = props.bgc ?? 'white'
            }))
        }
    }
}, {deep: true})


</script>

<template>
    <div class="tw_multi_dropdown"
         :style="{
            width: width ?? '170px',
            fontSize: fontSize ?? '14px',
            borderRadius: borderRadius ?? '0px'
         }">
        <div :style="{
                borderBottom: isOpen ? '' : (border ? border : '1px solid black'),
                borderTop: (border ? border : '1px solid black'),
                borderLeft: (border ? border : '1px solid black'),
                borderRight: (border ? border : '1px solid black'),
                backgroundColor: initialBgc ?? 'white'
            }"
             class="tw_dropdown-base"
             @click="isOpen = !isOpen"
        >
            <div class="tw_dropdown-icon">
                <div class="tw_dropdown-icon-left"
                     :style="{
                        transform: isOpen ? 'rotate(-35deg)' : 'rotate(35deg)',
                        borderWidth: largeArrow ? '2px': '1px',
                        borderColor: arrowColor ?? 'black',
                        backgroundColor: arrowColor ?? 'black'
                    }"
                ></div>
                <div class="tw_dropdown-icon-right"
                     :style="{
                        transform: isOpen ? 'rotate(35deg)' : 'rotate(-35deg)',
                        borderWidth: largeArrow ? '2px': '1px',
                        borderColor: arrowColor ?? 'black',
                        backgroundColor: arrowColor ?? 'black'
                    }"
                ></div>
            </div>
            <input
                    readonly
                    type="text"
                    :value="props.modelValue"
                    :style="{
                        textAlign: textCenter ? 'center' : 'start',
                        backgroundColor: initialBgc ?? 'white',
                        fontSize: fontSize ?? '14px',
                        height: initialHeight ? initialHeight : (itemHeight ?? '28px')
                    }"
            >
        </div>
        <div class="tw_dropdown-variants">
            <transition name="tr_dropdown">
                <div class="tw_dropdown-variants-item"
                     v-if="isOpen"
                     :style="{
                        maxHeight: variantsHeight ?? 'auto',
                        borderLeft: (border ? border : '1px solid black'),
                        borderRight: (border ? border : '1px solid black'),
                        borderBottom: (border ? border : '1px solid black'),
                        backgroundColor: bgc ?? 'white'
                    }"
                >
                    <div v-for="variant in props.variants" :key="variant.title">
                        <div style="display:flex;">
                            <span ref="tw_variant_ref"
                                  class="tw_variant"
                                  @click="openSub(variant)"
                                  :style="{
                                           color: fontColor ?? 'black',
                                           justifyContent: textCenter ? 'center' : 'start',
                                           height: itemHeight ?? '28px'
                                       }"
                            >{{ variant.title }}</span>
                                <div class="sub_variants"
                                     :style="{width: width ?? '170px', backgroundColor: bgc ?? 'white'}"
                                     v-if="showSubVariants && variant.title === chosenVariant.title">


                                    <div @click="openSubSub(subVariant)"
                                         ref="tw_variant_ref"
                                            class="tw_variant" style="display: flex; position: relative" v-for="subVariant in variant.value">
                                        {{subVariant.title}}
                                        <div   v-if="showSubSubVariants && subVariant.title === chosenSubVariant.title"
                                                :style="{width: width ?? '170px', backgroundColor: bgc ?? 'white'}"
                                                style="display: flex;flex-direction: column; position: absolute;right: -100%">
                                            <span class="tw_variant"
                                                    ref="tw_variant_ref"
                                                  @click="chooseSubVariant(item)"
                                                    v-for="item in subVariant.value">{{item}}</span>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
