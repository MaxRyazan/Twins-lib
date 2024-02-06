<script setup lang="ts">

const emits = defineEmits<{
    (e: 'update:modelValue', param:boolean): void
}>()

const props = defineProps<{
    modelValue: boolean
    label?: string
}>()

function check() {
    if(props.modelValue) emits('update:modelValue', false)
    else emits('update:modelValue', true)
}
</script>

<template>
    <div class="tw_checkbox__wrapper"
         contenteditable="true"
         @keydown.enter.prevent="check"
         @click="check"
    >
        <span v-if="modelValue" class="tw_checkbox__inner"></span>
    </div>
</template>
