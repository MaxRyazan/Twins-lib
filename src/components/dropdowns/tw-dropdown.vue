<script setup lang="ts">
import {onMounted, ref} from "vue";
type T = number | string

const twVariants = ref()

const props = defineProps<{
    modelValue: T
    variants: Array<T>
    width?: string


    itemHeight?: string
    variantsHeight?: string
    border?: string
    largeArrow?: boolean
    arrowColor?: string
    hoverColor?: string
    bgc?: string
    fontSize?:string

    fontColor?: string
    textCenter?: boolean
    borderRadius?: string
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', param: any)
}>()
const isOpen = ref(false)

function chooseVariant(variant: any) {
    emit('update:modelValue', variant)
    isOpen.value = false
}

onMounted(() => {
    if (props.itemHeight) {
        document.body.style.setProperty('--tw_dropdown_item_height', props.itemHeight)
    }
    if (props.variantsHeight) {
        document.body.style.setProperty('--tw_dropdown_variants_height', props.variantsHeight)
    }
    if (props.largeArrow) {
        document.body.style.setProperty('--tw_dropdown_arrow_width', '2px')
    }
    if (props.arrowColor) {
        document.body.style.setProperty('--tw_dropdown_arrow_color', props.arrowColor)
    }
    if (props.hoverColor) {
        document.body.style.setProperty('--tw_dropdown_hoverColor', props.hoverColor)
    }
    if (props.bgc) {
        document.body.style.setProperty('--tw_dropdown_bgc', props.bgc)
    }
    if (props.fontSize) {
        document.body.style.setProperty('--tw_dropdown_font_size', props.fontSize)
    }
    if (props.fontColor) {
        document.body.style.setProperty('--tw_dropdown_font_color', props.fontColor)
    }
    if (props.textCenter) {
        document.body.style.setProperty('--tw_dropdown_text_align', 'center')
    }
    if (props.borderRadius) {
        document.body.style.setProperty('--tw_dropdown_border_radius', props.borderRadius)
    }
    if (props.border) {
        document.body.style.setProperty('--tw_dropdown_border', props.border)
    }
})

</script>

<template>
    <div class="tw_dropdown"
         :style="{
             width: width ?? '170px',
             borderBottomRightRadius: isOpen ? '0px' : (borderRadius ?? '0px'),
             borderBottomLeftRadius: isOpen ? '0px' : (borderRadius ?? '0px'),

         }">
        <div :style="{
                borderBottomRightRadius: isOpen ? '0px' : (borderRadius ?? '0px'),
                borderBottomLeftRadius: isOpen ? '0px' : (borderRadius ?? '0px'),
                borderBottom: isOpen ? '0px solid black' : (border ? border : '1px solid black'),
            }"
             class="tw_dropdown-base"
             @click="isOpen = !isOpen"
        >
            <div class="tw_dropdown-icon">
                <div class="tw_dropdown-icon-left"
                     :style="{
                        transform: isOpen ? 'rotate(-35deg)' : 'rotate(35deg)',
                    }"
                ></div>
                <div class="tw_dropdown-icon-right"
                     :style="{
                        transform: isOpen ? 'rotate(35deg)' : 'rotate(-35deg)',
                    }"
                ></div>
            </div>
            <input class="tw_dropdown_input"
                    readonly
                    type="text"
                    :value="props.modelValue"
            >
        </div>
        <div ref="twVariants" class="tw_dropdown-variants" v-if="isOpen"
            :style="{ width: width ?? '170px',}"
        >
            <transition name="tr_dropdown">
                <div class="tw_dropdown-variants-item">
                    <span v-for="variant in props.variants" :key="variant">
                         <span class="tw_variant"
                               v-if="variant !== modelValue"
                               @click="chooseVariant(variant)"
                         >{{ variant }}</span>
                    </span>
                </div>
            </transition>
        </div>
    </div>
</template>
