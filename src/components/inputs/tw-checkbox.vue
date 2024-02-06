<script setup lang="ts">
import {ref} from "vue";

const inner = ref()
const props = defineProps<{
    label?: string
}>()

function check() {
    inner.value.classList.toggle('tw_checkbox-hidden')
}
</script>

<template>
    <div class="tw_checkbox__wrapper"
         contenteditable="true"
         @keydown.enter.prevent="check"
         @click="check"
    >
        <span ref="inner" class="tw_checkbox__inner tw_checkbox-hidden"></span>
    </div>
</template>
