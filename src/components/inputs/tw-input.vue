<script setup lang="ts">
const props = defineProps<{
    modelValue: any,
    type?: string
    min?: number
    max?: number
    step?: number
    maxLength?: number

    placeholder?: string
    disabled?: boolean
    prefix?: string
    postfix?: string

    width?: string
    height?: string
    bgc?: string
    border?: string

    bbColor?: string
    caretColor?: string
    input_color?: string

    vertical?: boolean

    prefix_color?:string
    postfix_color?:string
    prefix_fz?: string
    postfix_fz?: string
    prefix_ff?: string
    postfix_ff?: string

    inputTextPosition?: string

}>()
const emits = defineEmits<{
    (e:'update:modelValue', value: any)
}>()
function handleAction($event: any){
    if(props.type==='number'){
        emits('update:modelValue', +$event.target.value)
    } else {
        emits('update:modelValue', $event.target.value)
    }
}
</script>

<template>
    <div :style="{width: width, height: height}">
        <div class="wrap" :class="{vertical}">
            <span :style="{
                      color: prefix_color,
                      fontSize: prefix_fz,
                      fontFamily: prefix_ff
                   }"
                    v-if="prefix">{{ prefix }}</span>
            <div :class="{'w100': !prefix}" style="gap:10px; display: flex; align-items: center">
                <input  :value="modelValue"
                        @input="handleAction"
                        class="input"
                        :class="{'w100': !prefix}"
                        :style="{
                            border: border,
                            textAlign: inputTextPosition,
                            backgroundColor: bgc,
                            borderBottomColor: bbColor ? bbColor : (bgc === 'transparent' ? (border ? border : 'white') : bgc),
                            caretColor: caretColor ? caretColor : (bbColor ? bbColor : (bgc === 'transparent' ? 'black' : bgc)),
                            color: input_color ?? 'black'
                         }"
                        :type="type ?? 'text'"
                        :min="min"
                        :max="max"
                        :step="step"
                        :maxlength="maxLength"
                        :placeholder="placeholder"
                        :disabled="disabled"
                />
                <span :style="{
                            color: postfix_color,
                            fontSize: postfix_fz,
                            fontFamily: postfix_ff
                       }"
                        v-if="postfix">{{ postfix }}</span>
            </div>
        </div>
        <span><slot /></span>
    </div>
</template>
