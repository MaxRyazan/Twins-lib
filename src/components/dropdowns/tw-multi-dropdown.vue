<script setup lang="ts">
import {onMounted, reactive, Ref, ref} from "vue";

type T = number | string
type Item = { field1: T, field2: Array<T> }
type Multi = { field1: T, field2: Array<Item> }
const props = defineProps<{
    modelValue: T
    variants: Array<Multi>
    bgc?: string
    border?: string
    itemHeight?: string
    fontSize?: string
    fontColor?: string
    textCenter?: boolean
    hoverColor?: string
    width?: string
    largeArrow?: boolean
    arrowColor?: string


    // TODO не работает, не подключал!
    borderRadius?: string
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', param: any)
}>()
const isOpen = ref(false)
const chosenVariant = ref()
const subVariant: Ref<any> = ref()
let subSubVariants: any = reactive([])

function chooseVariant(variant: Multi) {
    chosenVariant.value = variant
    subSubVariants = []
    if (!(Object.values(variant)[1] instanceof Array) && (typeof variant === 'string' || typeof variant === 'number')) {
        emit('update:modelValue', variant)
        isOpen.value = false
        chosenVariant.value = {}
        subVariant.value = {}
    }
}

function chooseSubVariant(sub: any) {
    subVariant.value = sub
    subSubVariants = Object.values(subVariant.value)[1]
    if (typeof sub === 'string' || typeof sub === 'number') {
        emit('update:modelValue', sub)
        isOpen.value = false
        chosenVariant.value = {}
        subVariant.value = {}
        subSubVariants = []
    }
}

function chooseSubSubVariant(variant: any) {
    isOpen.value = false
    chosenVariant.value = {}
    emit('update:modelValue', variant)
    chosenVariant.value = {}
    subVariant.value = {}
    subSubVariants = []
}

function toggleVisible() {
    isOpen.value = !isOpen.value
    chosenVariant.value = {}
    subVariant.value = {}
    subSubVariants = []
}

onMounted(() => {
    if (props.hoverColor) {
        document.body.style.setProperty('--tw_dropdown_multi_hoverColor', props.hoverColor)
    }
    if (props.bgc) {
        document.body.style.setProperty('--tw_dropdown_multi_bgc', props.bgc)
    }
    if (props.textCenter) {
        document.body.style.setProperty('--tw_dropdown_multi_text_align', 'center')
    }
    if (props.fontColor) {
        document.body.style.setProperty('--tw_dropdown_multi_font_color', props.fontColor)
    }
    if (props.fontSize) {
        document.body.style.setProperty('--tw_dropdown_multi_font_size', props.fontSize)
    }
    if (props.itemHeight) {
        document.body.style.setProperty('--tw_dropdown_multi_item_height', props.itemHeight)
    }
    if (props.border) {
        document.body.style.setProperty('--tw_dropdown_multi_border', props.border)
    }
    if (props.arrowColor) {
        document.body.style.setProperty('--tw_dropdown_multi_arrow_color', props.arrowColor)
    }
    if (props.largeArrow) {
        document.body.style.setProperty('--tw_dropdown_multi_arrow_width', '2px')
    }
})

</script>

<template>
    <div class="tw_multi_dropdown"
         :style="{
              width: width ?? '170px',
         }">
        <div :style="{
                  borderBottom: isOpen ? '' : (border ? border : '1px solid black'),
                  borderTop: (border ? border : '1px solid black'),
                  borderLeft: (border ? border : '1px solid black'),
                  borderRight: (border ? border : '1px solid black'),
            }"
             class="tw_multi_dropdown-base"
             @click="toggleVisible"
        >
            <div class="tw_dropdown_multi-icon">
                <div class="tw_dropdown_multi-icon-left"
                     :style="{
                          transform: isOpen ? 'rotate(-35deg)' : 'rotate(35deg)',
                          borderWidth: largeArrow ? '2px': '1px',
                          borderColor: arrowColor ?? 'rgba(0,0,0,.2)',
                          backgroundColor: arrowColor ?? 'rgba(0,0,0,.2)'
                    }"
                ></div>
                <div class="tw_dropdown_multi-icon-right"
                     :style="{
                          transform: isOpen ? 'rotate(35deg)' : 'rotate(-35deg)',
                          borderWidth: largeArrow ? '2px': '1px',
                          borderColor: arrowColor ?? 'rgba(0,0,0,.2)',
                          backgroundColor: arrowColor ?? 'rgba(0,0,0,.2)'
                    }"
                ></div>
            </div>
            <input class="tw_multi_dropdown_input"
                   readonly
                   type="text"
                   :value="props.modelValue"
            >
        </div>
        <div class="tw_dropdown-variants">
            <transition name="tr_multi_dropdown">
                <div class="tw_multi_dropdown-variants-item"
                     v-if="isOpen"
                     :style="{
                          borderLeft: (border ? border : '1px solid black'),
                          borderRight: (border ? border : '1px solid black'),
                          borderBottom: (border ? border : '1px solid black'),
                    }"
                >
                    <div v-for="(variant, idx) in props.variants" :key="idx">
                        <div class="tw_multi_variant"
                             @click="chooseVariant(variant)"
                             :class="{'tw_multi_dropdown_selected' : chosenVariant === variant}">
                            <span class="variant_span"
                                  v-if="typeof variant === 'string' || typeof variant === 'number'"
                            >{{ variant }}</span>
                            <span class="variant_span"
                                  v-else
                            >{{ Object.values(variant)[0] }}
                            </span>
                            <span class="tw_multi_dropdown-icon"
                                  v-if="typeof variant !== 'string' && typeof variant !== 'number'">
                                    <span class="tw_multi_dropdown-icon-left"></span>
                                    <span class="tw_multi_dropdown-icon-right"></span>
                            </span>
                            <div class="sub_variants"
                                 v-if="chosenVariant && Object.values(chosenVariant)[0] === Object.values(variant)[0] && Object.values(variant)[1] instanceof Array">
                                <div class="tw_multi_variant"
                                     v-for="sub in Object.values(variant)[1]"
                                     :class="{'tw_multi_dropdown_selected' : subVariant === sub}"
                                     @click="chooseSubVariant(sub)">
                                    <span class="variant_span"
                                          v-if="typeof sub === 'string' || typeof sub === 'number'">{{ sub }}</span>
                                    <span class="variant_span"
                                          v-else>{{ Object.values(sub)[0] }}
                                    </span>
                                    <span class="tw_multi_dropdown-icon"
                                          v-if="typeof sub !== 'string' && typeof sub !== 'number'">
                                    <span class="tw_multi_dropdown-icon-left"></span>
                                    <span class="tw_multi_dropdown-icon-right"></span>
                            </span>
                                </div>
                                <div class="sub_variants"
                                     v-if="subSubVariants.length">
                                    <div class="tw_multi_variant"
                                         v-for="subSub in subSubVariants" :key="subSub"
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
