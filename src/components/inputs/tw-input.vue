<script setup lang="ts">
defineProps<{
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
    bbColor?: string
    caretColor?: string
    input_color?: string

    vertical_start?: boolean
    vertical_center?: boolean

    prefix_color?:string
    postfix_color?:string
}>()
</script>

<template>
    <div :style="{width: width, height: height}">
        <div class="wrap" :class="{vertical_start, vertical_center}">
            <span :style="{
                      color: prefix_color
                   }"
                    v-if="prefix">{{ prefix }}</span>
            <div :class="{'w100': !prefix}" style="gap:10px; display: flex; align-items: center">
                <input  class="input"
                        :class="{'w100': !prefix}"
                        :style="{
                            backgroundColor: bgc,
                            borderBottomColor: bbColor ? bbColor : (bgc === 'transparent' ? 'white' : bgc),
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
                            color: postfix_color
                       }"
                        v-if="postfix">{{ postfix }}</span>
            </div>
        </div>
        <span><slot /></span>
    </div>
</template>
