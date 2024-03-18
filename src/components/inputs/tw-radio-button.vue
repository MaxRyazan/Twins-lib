<script setup lang="ts">
import {onMounted, ref} from "vue";
import {generateUUID} from '@/helpers'

type T = number | string

const props = defineProps<{
    modelValue: T,
    variants: Array<T> | null,
    settings?: {
        in_group?: boolean,
    }
    styles?: {
        item_bgc?: string
        item_border?: string
        item_color?: string
        active_color?: string
    }
}>()

let uuids = ref([])
const BASE_ACTIVE_COLOR = ref('')

const emits = defineEmits<{
    (e: 'update:modelValue', param: T)
}>()

function choose(variant: any, uuid: string){
    emits('update:modelValue', variant)
    const input: HTMLInputElement = document.querySelector(`#${uuid}`)
    input.checked = true
}

function watchBorderRight(idx: number) {
    if(!props.settings?.in_group) {
        return props.styles?.item_border
    } else {
        if(idx === props.variants.length - 1) {
            return props.styles?.item_border ?? ''
        } else {
            return 'none'
        }
    }
}

onMounted(() => {
    for(let i = 0; i < props.variants.length; i++) {
        const uuid = generateUUID();
        uuids.value.push(uuid);
    }
    BASE_ACTIVE_COLOR.value = getComputedStyle(document.documentElement).getPropertyValue('--tw_radio_bgc_checked')
})

</script>

<template>
    <div class="tw_radio"
        :style="{
            gap: props.settings?.in_group ? '0' : '10px'
        }"
    >
        <div v-for="(variant, idx) in props.variants" :key="variant"
             class="tw_radio__item"
        >
            <input :id="uuids[idx]" type="radio" name="radio" :value="variant">
            <label :for="uuids[idx]"
                    @click="choose(variant, uuids[idx])"
                   :style="{
                        backgroundColor: modelValue === variant ? (props.styles?.active_color ?? BASE_ACTIVE_COLOR) : props.styles?.item_bgc,
                        border: props.styles?.item_border,
                        borderRight: watchBorderRight(idx),
                        color: props.styles?.item_color,
                   }"
            >{{variant}}</label>
        </div>
    </div>
</template>
