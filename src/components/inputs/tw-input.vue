<script setup lang="ts">

const props = defineProps<{
    modelValue: any,

    width?: string
    height?: string

    input_width?: string
    input_font_size?: string
    input_font_family?: string

    type?: string
    min?: number
    max?: number
    step?: number
    max_length?: number

    border?: string
    bgc?: string
    caret_color?: string
    input_text_color?: string
    border_bottom?: string
    padding?: string
    placeholder?: string
    text_center?: boolean
    border_radius?: string
    disabled?: boolean
    readonly?: boolean
    vertical?: boolean
    prefix?: string
    postfix?: string
    prefix_color?:string
    postfix_color?:string
    prefix_font_size?: string
    prefix_font_family?: string
    postfix_font_size?: string
    postfix_font_family?: string

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
    <div :style="{
            height: height,
            width: width
         }"
         class="tw_input_component">
        <div class="tw_input_wrap"
             :style="{
                height: height,
             }"
             :class="{'tw_input_vertical':vertical}">
            <span v-if="prefix"
                  :style="{
                    color: prefix_color,
                    fontSize: prefix_font_size,
                    fontFamily: prefix_font_family
                  }"
            >{{ prefix }}</span>
            <div class="tw_input_wrapper">
                <input  :value="modelValue"
                        @input="handleAction"
                        class="tw_input"
                        :class="{'tw_input_disabled': disabled, 'tw_input_readonly': props.readonly}"
                        :style="{
                            width: input_width,
                            fontSize: input_font_size,
                            fontFamily: input_font_family,
                            border: border,
                            borderBottom: border_bottom ?? (border ?? '1px solid rgb(240, 240, 240)'),
                            borderRadius: border_radius,
                            backgroundColor: bgc,
                            caretColor: caret_color,
                            color: input_text_color,
                            padding: padding,
                            textAlign: text_center ? 'center' : 'start',
                        }"
                        :type="type ?? 'text'"
                        :min="min"
                        :max="max"
                        :step="step"
                        :maxlength="max_length"
                        :placeholder="placeholder"
                        :disabled="disabled"
                        :readonly="props.readonly"
                />
                <span v-if="postfix"
                      :style="{
                        color: postfix_color,
                        fontSize: postfix_font_size,
                        fontFamily: postfix_font_family
                      }"
                >{{ postfix }}</span>
            </div>
        </div>
        <span>
            <slot name="validator"/>
        </span>
    </div>
</template>
