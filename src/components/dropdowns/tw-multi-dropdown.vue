<script setup lang="ts">
import {onMounted, reactive, Ref, ref} from "vue";

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
const subVariant: Ref<any> = ref()
let subSubVariants: any = reactive([])

function chooseVariant(variant: Multi) {
    chosenVariant.value = variant
    subSubVariants = []
    if(!(Object.values(variant)[1] instanceof Array) && (typeof variant === 'string' || typeof variant === 'number')) {
        emit('update:modelValue', variant)
        isOpen.value = false
        chosenVariant.value = {}
        subVariant.value = {}
    }
}

function chooseSubVariant(sub: any) {
    subVariant.value = sub
    subSubVariants = Object.values(subVariant.value)[1]
    if(typeof sub === 'string' || typeof sub === 'number') {
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

function toggleVisible(){
    isOpen.value = !isOpen.value
    chosenVariant.value = {}
    subVariant.value = {}
    subSubVariants = []
}

onMounted(() => {
    if(props.hoverColor){
        document.body.style.setProperty('--tw_dropdown_multi_hoverColor', props.hoverColor)
    }
})

</script>

<template>
    <div class="tw_multi_dropdown"
         :style="{
              width: width ?? '170px',
              fontSize: fontSize ?? '14px',
         }">
        <div :style="{
                  borderBottom: isOpen ? '' : (border ? border : '1px solid black'),
                  borderTop: (border ? border : '1px solid black'),
                  borderLeft: (border ? border : '1px solid black'),
                  borderRight: (border ? border : '1px solid black'),
                  backgroundColor: initialBgc ?? 'white'
            }"
             class="tw_multi_dropdown-base"
             @click="toggleVisible"
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
            <transition name="tr_multi_dropdown">
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
                        <div class="tw_multi_variant"
                             @click="chooseVariant(variant)"
                             :class="{'selectedP' : chosenVariant === variant}">
                            <span class="variant_span"
                                  v-if="typeof variant === 'string' || typeof variant === 'number'"
                                  :style="{
                                       color: fontColor ?? 'black',
                                       justifyContent: textCenter ? 'center' : 'start',
                                       minHeight: itemHeight ?? '28px'
                                       }"
                            >{{ variant }}</span>
                            <span class="variant_span"
                                  v-else
                                  :style="{
                                       color: fontColor ?? 'black',
                                       justifyContent: textCenter ? 'center' : 'start',
                                       minHeight: itemHeight ?? '28px'
                                  }"
                            >{{ Object.values(variant)[0] }}</span>
                            <div class="sub_variants"
                                 v-if="chosenVariant && Object.values(chosenVariant)[0] === Object.values(variant)[0] && Object.values(variant)[1] instanceof Array">

                                <div class="tw_multi_variant"
                                     v-for="sub in Object.values(variant)[1]"
                                     :class="{'selectedP' : subVariant === sub}"
                                     @click="chooseSubVariant(sub)">
                                    <span class="variant_span"
                                          v-if="typeof sub === 'string' || typeof sub === 'number'"
                                          :style="{
                                               color: fontColor ?? 'black',
                                               justifyContent: textCenter ? 'center' : 'start',
                                               minHeight: itemHeight ?? '28px'
                                          }"
                                    >{{ sub }}</span>
                                    <span class="variant_span"
                                          v-else
                                          :style="{
                                               color: fontColor ?? 'black',
                                               justifyContent: textCenter ? 'center' : 'start',
                                               minHeight: itemHeight ?? '28px'
                                          }"
                                    >{{ Object.values(sub)[0] }}></span>
                                </div>
                                    <div class="sub_variants" v-if="subSubVariants.length">
                                        <div class="tw_multi_variant"
                                             v-for="subSub in subSubVariants" :key="subSub"
                                             @click="chooseSubSubVariant(subSub)">
                                             <span class="variant_span"
                                                   :style="{
                                                        color: fontColor ?? 'black',
                                                        justifyContent: textCenter ? 'center' : 'start',
                                                        minHeight: itemHeight ?? '28px'
                                                   }"
                                             >{{ subSub }}</span>
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
