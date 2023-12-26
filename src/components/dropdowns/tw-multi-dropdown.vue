<script setup lang="ts">
import {Ref, ref, watch} from "vue";

type T = number | string
type Item = { field1: T, field2: Array<T> }
type Multi = { field1: T, field2: Array<Item> }
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
const chosenVariant = ref()
const subVariant: Ref<Item> = ref()
const tw_variant_ref = ref()

function chooseVariant(variant: Multi) {
    chosenVariant.value = variant
}

function chooseSubVariant(sub: any) {
    console.log(sub)
    subVariant.value = sub
}

function chooseSubSubVariant(variant: any) {
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
                    <div v-for="(variant, idx) in props.variants" :key="idx">
                        <div class="tw_variant_multi" ref="tw_variant_ref">
                            <span class="variant_span"
                                  @click="chooseVariant(variant)"
                                  :style="{
                                           color: fontColor ?? 'black',
                                           justifyContent: textCenter ? 'center' : 'start',
                                           minHeight: itemHeight ?? '28px'
                                       }"
                            >{{ Object.values(variant)[0] }}</span>
                            <div class="sub_variants"
                                 v-if="chosenVariant && Object.values(chosenVariant)[0] === Object.values(variant)[0] && Object.values(variant)[1] instanceof Array">
                                <div ref="tw_variant_ref"
                                     class="tw_multi_variant"
                                     @click="chooseSubVariant(sub)"
                                     v-for="sub in Object.values(variant)[1]">
                                    <span class="variant_span">{{ Object.values(sub)[0] }}</span>
                                </div>
                                    <div class="sub_variants" v-if="subVariant">
                                        <div ref="tw_variant_ref"
                                             class="tw_multi_variant"
                                             v-for="subSub in Object.values(subVariant)[1]" :key="subSub"
                                             @click="chooseSubSubVariant(subSub)">
                                             <span class="variant_span">{{ subSub }}</span>
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
