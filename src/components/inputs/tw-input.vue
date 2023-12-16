<script setup lang="ts">
const props = defineProps<{
    modelValue: any,

    width?: string
    inputWidth?: string
    height?: string
    type?: string
    min?: number
    max?: number
    step?: number
    maxLength?: number
    vertical?: boolean
    inputTextCenter?: boolean
    rounded: boolean

    placeholder?: string
    disabled?: boolean
    prefix?: string
    postfix?: string

    bgc?: string
    border?: string
    bbColor?: string
    caretColor?: string
    input_color?: string

    prefix_color?:string
    postfix_color?:string
    prefix_fz?: string
    postfix_fz?: string
    prefix_ff?: string
    postfix_ff?: string

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
        <div class="tw_wrap" :class="{'tw_vertical':vertical}">
            <span :style="{
                      color: prefix_color,
                      fontSize: prefix_fz,
                      fontFamily: prefix_ff
                   }"
                    v-if="prefix">{{ prefix }}</span>
            <div :style="{ width: inputWidth}" :class="{'tw_w100': !prefix}" style="gap:10px; display: flex; align-items: center">
                <input  :value="modelValue"
                        @input="handleAction"
                        class="tw_input tw_w100"
                        :style="{
                            height: height,
                            border: border,
                            borderRadius: rounded ? '12px' : '0px',
                            padding: rounded ? '0 0 0 10px' : '0px',
                            textAlign: inputTextCenter ? 'center' : 'start',
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
        <span style="margin-top: 2px; color: red;">
            <slot name="validator"/>
        </span>
    </div>
</template>
