<script setup lang="ts">
import {onMounted, ref} from "vue";
import {generateUUID} from '@/helpers'

type T = number | string

const props = defineProps<{
    modelValue: T,
    variants: Array<T> | null,
    group?: boolean,
    border?: string,
    border_right?: string
}>()

let uuids = ref([])

const emits = defineEmits<{
    (e: 'update:modelValue', param: T)
}>()

function choose(variant: any, uuid: string){
    emits('update:modelValue', variant)
    const input: HTMLInputElement = document.querySelector(`#${uuid}`)
    input.checked = true
}
onMounted(() => {
    for(let i = 0; i < props.variants.length; i++) {
        const uuid = generateUUID();
        uuids.value.push(uuid);
    }
})

</script>

<template>
    <div class="tw_radio"
        :style="{
            gap: group ? '0' : '10px'
        }"
    >
        <div v-for="(variant, idx) in props.variants" :key="variant"
             class="tw_radio__item"
        >
            <input :id="uuids[idx]" type="radio" name="radio" :value="variant">
            <label :for="uuids[idx]"
                    @click="choose(variant, uuids[idx])"
                   :class="{
                            tw_radio__checked: modelValue === variant,
                            'tw_radio__last-child' : group && (idx === variants.length - 1)
                        }"
            >{{variant}}</label>
        </div>
    </div>
</template>
