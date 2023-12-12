<script setup lang="ts">
import {ref, watch} from "vue";
type T = number | string
const props = defineProps<{
    modelValue: T
    variants: Array<T>
    width?: string
    border?: string
    largeArrow?: boolean
    arrowColor?: string
    hoverColor?: string
    bgc?: string
    initialBgc?: string
    fontSize?:string
    itemHeight?: string
    initialHeight?: string
    textCenter?: boolean
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', param: any)
}>()
const isOpen = ref(false)
const tw_variant_ref = ref()

function chooseVariant(variant: any) {
    emit('update:modelValue', variant)
    isOpen.value = false
}

watch(tw_variant_ref, () => {
    if (tw_variant_ref.value) {
        if (isOpen.value) {
            tw_variant_ref.value.forEach((item:HTMLElement) => item.addEventListener('mouseover', () => {
                item.style.backgroundColor = props.hoverColor ? props.hoverColor : 'lightgreen'
            }))
            tw_variant_ref.value.forEach((item:HTMLElement) => item.addEventListener('mouseout', () => {
                item.style.backgroundColor = props.bgc ? props.bgc : 'white'
            }))
        } else {
            tw_variant_ref.value.forEach((item:HTMLElement) => item.removeEventListener('mouseover', () => {
                item.style.backgroundColor = props.hoverColor ? props.hoverColor : 'lightgreen'
            }))
            tw_variant_ref.value.forEach((item:HTMLElement) => item.removeEventListener('mouseout', () => {
                item.style.backgroundColor = props.bgc ? props.bgc : 'white'
            }))
        }
    }
}, {deep: true})


</script>

<template>
    <div class="tw_dropdown"
         :style="{
            width: width ?? '170px',
            fontSize: fontSize ?? '14px'
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
                        borderLeft: (border ? border : '1px solid black'),
                        borderRight: (border ? border : '1px solid black'),
                        borderBottom: (border ? border : '1px solid black'),
                        backgroundColor: bgc ?? 'white'
                    }"
                >
                    <span v-for="variant in props.variants" :key="variant">
                         <span ref="tw_variant_ref"
                               class="tw_variant"
                               v-if="variant !== modelValue"
                               @click="chooseVariant(variant)"
                               :style="{
                                   justifyContent: textCenter ? 'center' : 'start',
                                   height: itemHeight ?? '28px'
                               }"
                         >{{ variant }}</span>
                    </span>
                </div>
            </transition>
        </div>
    </div>
</template>
