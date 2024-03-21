<script setup lang="ts">
import {onMounted, onUnmounted, ref, ShallowRef, shallowRef} from "vue";
import {generateUUID} from '@/helpers'

type T = number | string

const props = defineProps<{
    modelValue: T,
    variants: Array<T> | null,
    settings?: {
        in_group?: boolean
        disabled?: boolean
        rounded?: boolean
    }
    styles?: {
        item_width?: string
        item_height?: string
        item_bgc?: string
        item_border?: string
        text_color?: string
        active_color?: string
        hover_color?: string
        font_size?: string
        font_family?: string
        font_weight?: string
    }
}>()

let uuids = ref([])
const BASE_ACTIVE_COLOR = ref('')
const BASE_HOVER_COLOR = ref('')
const twRadioLabel: ShallowRef<HTMLElement[]> = shallowRef([])

const emits = defineEmits<{
    (e: 'update:modelValue', param: T)
}>()

function choose(variant: any, uuid: string){
    emits('update:modelValue', variant)
    const input: HTMLInputElement = document.querySelector(`#${uuid}`)
    input.checked = true
}


function watchBorderRadius(idx: number) {
    if(props.settings.rounded) {
        const radius = getComputedStyle(document.documentElement).getPropertyValue('--tw_radio_border_radius');
        if(props.settings?.in_group) {
            if(idx === props.variants.length - 1) {
                return `0 ${radius} ${radius} 0`
            }
            if(idx === 0) {
                return `${radius} 0 0 ${radius}`
            }
        } else {
            return radius
        }
    }
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

function changeHoverColor(el: HTMLElement) {
    return el.style.color = props.styles?.hover_color
}
function setBaseHoverColor(el: HTMLElement) {
    return el.style.color = props.styles?.text_color ?? getComputedStyle(document.documentElement).getPropertyValue('--tw_radio_color');
}

onMounted(() => {
    for(let i = 0; i < props.variants.length; i++) {
        const uuid = generateUUID();
        uuids.value.push(uuid);
    }
    BASE_ACTIVE_COLOR.value = getComputedStyle(document.documentElement).getPropertyValue('--tw_radio_bgc_checked');
    BASE_HOVER_COLOR.value = getComputedStyle(document.documentElement).getPropertyValue('--tw_radio_hover_color');
    if(props.styles?.hover_color && twRadioLabel.value) {
        twRadioLabel.value.forEach((el: HTMLElement) => {
            el.addEventListener('mouseover', () => changeHoverColor(el))
            el.addEventListener('mouseout', () => setBaseHoverColor(el))
        })
    }
})

onUnmounted(() => {
    if(props.styles?.hover_color && twRadioLabel.value) {
        twRadioLabel.value.forEach(el => {
            el.removeEventListener('mouseover', () => changeHoverColor(el))
            el.removeEventListener('mouseout', () => setBaseHoverColor(el))
        })
    }
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
            <input :id="uuids[idx]" type="radio" name="radio" :disabled="props.settings?.disabled" :value="variant">
            <label :for="uuids[idx]"
                   ref="twRadioLabel"
                    @click="choose(variant, uuids[idx])"
                   :style="{
                        backgroundColor: modelValue === variant ? (props.styles?.active_color ?? BASE_ACTIVE_COLOR) : props.styles?.item_bgc,
                        border: props.styles?.item_border,
                        borderRight: watchBorderRight(idx),
                        color: props.styles?.text_color,
                        width: props.styles?.item_width,
                        height: props.styles?.item_height,
                        borderRadius: watchBorderRadius(idx)
                   }"
            >{{variant}}</label>
        </div>
    </div>
</template>
