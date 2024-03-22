<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const currentPage = ref(1)
const MAX_PAGES = ref(3)
const paginatorInput = ref()

const emits = defineEmits<{
    (e: 'changePage', param: number): void
}>()

const props = defineProps<{
    total_pages: number
    settings?: {
        max_pages_around_current?: number
        with_go_to?: boolean
        with_buttons?: boolean
        buttons_title?: {prev: string, next: string}
        label?: string
    }
    styles?: {
        component_height?: string,
        text_color?: string,
        font_size?: string,
        font_family?: string,
        font_weight?: string,
        item_width?: string,
        item_border?: string,
        buttons_border?: string,
        buttons_border_radius?: string,
        buttons_bgc?: string,
        input_border?: string,
        input_border_radius?: string,
        input_bgc?: string,
        item_border_radius?: string,
        go_to_margin_left?: string
    }
}>()

//TODO
/*
добавить dots_color
добавить buttons_text_color
добавить buttons_pages_bgc
к input добавить свойство color  = text_color

исправить "перейти на предыдущую страницу с 1 страницы
 */

function handleChangePage() {
    if(paginatorInput.value.value > 0 && paginatorInput.value.value <= props.total_pages) {
        currentPage.value = +paginatorInput.value.value
    }
}

function handleButtonClick(param: number) {
    if(currentPage.value > 0 && currentPage.value < props.total_pages) {
        currentPage.value += param
    }
}

watch(currentPage, async () => {
    if(currentPage.value <= props.total_pages && currentPage.value > 0) {
        emits('changePage', currentPage.value - 1)
    }
})

onMounted(() => {
    if(props.settings?.max_pages_around_current) {
        MAX_PAGES.value = props.settings.max_pages_around_current
    }
})

</script>

<template>
    <div class="tw_paginator"
         v-if="props.total_pages > 1"
         :style="{
            height: props.styles?.component_height,
        }"
    >
        <button v-if="props.settings.with_buttons"
                class="tw_paginator__control-button"
                :style="{
                    color: props.styles?.text_color,
                    fontSize: props.styles?.font_size,
                    fontFamily: props.styles?.font_family,
                    fontWeight: props.styles?.font_weight,
                    border: props.styles?.buttons_border,
                    backgroundColor: props.styles?.buttons_bgc,
                    borderRadius: props.styles?.buttons_border_radius,

                }"
                @click="handleButtonClick(-1)"
        >
            <slot name="prevButton"/>
            {{props.settings?.buttons_title?.prev ?? ''}}
        </button>
        <div class="tw_pg-buttons">

            <div class="tw_pg-buttons__item"
                 :style="{
                    height: props.styles?.component_height,
                    width: props.styles?.item_width,
                 }">
                <span :class="{'tw_pg-active': currentPage === 1}"
                      :style="{
                         color: props.styles?.text_color,
                         fontSize: props.styles?.font_size,
                         fontFamily: props.styles?.font_family,
                         fontWeight: props.styles?.font_weight,
                         width: props.styles?.item_width,
                         border: props.styles?.item_border,
                         borderRadius: props.styles?.item_border_radius,
                      }"
                      @click="currentPage = 1"
                >1</span>
            </div>

            <div class="tw_paginator__pre" v-if="currentPage > MAX_PAGES + 2">
                <pre>. . .</pre>
            </div>

            <div class="tw_pg-buttons__item" v-for="page in total_pages"
                 :style="{
                    height: props.styles?.component_height,
                    width: props.styles?.item_width,
                 }"
                 :class="{'tw_pg-hide' : Math.abs(page - currentPage) > MAX_PAGES || page === 1 || page === total_pages}"
            >
                <span v-if="page !== 1 && page !== total_pages"
                      :class="{'tw_pg-active': page === currentPage}"
                      :style="{
                         color: props.styles?.text_color,
                         fontSize: props.styles?.font_size,
                         fontFamily: props.styles?.font_family,
                         fontWeight: props.styles?.font_weight,
                         width: props.styles?.item_width,
                         border: props.styles?.item_border,
                         borderRadius: props.styles?.item_border_radius,
                      }"
                      @click="currentPage = page"
                >{{ page }}</span>
            </div>

            <div class="tw_paginator__pre" v-if="currentPage < total_pages - (MAX_PAGES + 1)">
                <pre>. . .</pre>
            </div>

            <div class="tw_pg-buttons__item"
                 :style="{
                     height: props.styles?.component_height,
                     width: props.styles?.item_width,
                 }"
            >
                <span :class="{'tw_pg-active': currentPage === total_pages}"
                      :style="{
                          color: props.styles?.text_color,
                          fontSize: props.styles?.font_size,
                          fontFamily: props.styles?.font_family,
                          fontWeight: props.styles?.font_weight,
                          width: props.styles?.item_width,
                          border: props.styles?.item_border,
                          borderRadius: props.styles?.item_border_radius,
                      }"
                      @click="currentPage = total_pages">{{ total_pages }}</span>
            </div>

        </div>
        <button v-if="props.settings?.with_buttons"
                class="tw_paginator__control-button"
                :style="{
                    color: props.styles?.text_color,
                    fontSize: props.styles?.font_size,
                    fontFamily: props.styles?.font_family,
                    fontWeight: props.styles?.font_weight,
                    border: props.styles?.buttons_border,
                    backgroundColor: props.styles?.buttons_bgc,
                    borderRadius: props.styles?.buttons_border_radius,
                }"
                @click="handleButtonClick(1)"
        >
            <slot name="nextButton"/>
            {{props.settings?.buttons_title?.next ?? ''}}
        </button>

        <div v-if="props.settings?.with_go_to"
             :style="{
                 height: props.styles?.component_height,
                 marginLeft: props.styles?.go_to_margin_left,
             }"
             class="tw_go_to">
            <label :style="{
                        color: props.styles?.text_color,
                        fontSize: props.styles?.font_size,
                        fontFamily: props.styles?.font_family,
                        fontWeight: props.styles?.font_weight,
                   }"
            >
                <slot name="labelSlot"/>
                {{props.settings?.label ?? ''}}
            </label>
            <input ref="paginatorInput"
                   :style="{
                       fontSize: props.styles?.font_size,
                       fontFamily: props.styles?.font_family,
                       fontWeight: props.styles?.font_weight,
                       backgroundColor: props.styles?.input_bgc,
                       border: props.styles?.input_border,
                       borderRadius: props.styles?.input_border_radius
                   }"
                   class="tw_go_to__input"
                   @change="handleChangePage"
                   @keydown.enter="handleChangePage"
                   type="number">
        </div>

    </div>
</template>
