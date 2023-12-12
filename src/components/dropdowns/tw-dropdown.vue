<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
    modelValue: any
    variants: Array<any>
    width?: string,
    borderColor?: string
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
    <div class="tw_dropdown" :style="{
                width: width ?? '150px'
           }">
        <div    :style="{borderBottom: isOpen ? '' : '1px solid red'}"
                class="tw_dropdown-base"
                @click="isOpen = !isOpen"
        >
            <div class="tw_dropdown-icon">
                <div class="tw_dropdown-icon-left"></div>
                <div class="tw_dropdown-icon-right"></div>
            </div>
            <input readonly type="text" :value="props.modelValue">
        </div>
        <div class="tw_dropdown-variants">
            <transition name="tr_dropdown">
                <div class="tw_dropdown-variants-item" v-if="isOpen">
                    <span v-for="variant in props.variants" :key="variant">
                         <span class="tw_variant" v-if="variant !== modelValue"
                               @click="chooseVariant(variant)">{{ variant }}</span>
                    </span>
                </div>
            </transition>
        </div>
    </div>
</template>
