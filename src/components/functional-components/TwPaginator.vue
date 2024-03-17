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
    max_pages_around_current: number
    with_go_to: boolean
    with_buttons: boolean
}>()


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

watch(currentPage, async (v) => {
    if(currentPage.value <= props.total_pages && currentPage.value > 0) {
        emits('changePage', currentPage.value - 1)
    }
})

onMounted(() => {
    if(props.max_pages_around_current) {
        MAX_PAGES.value = props.max_pages_around_current
    }
})

</script>

<template>
    <div class="tw_paginator" v-if="props.total_pages > 1">
        <button v-if="with_buttons" class="tw_paginator__control-button" @click="handleButtonClick(-1)">Предыдущая</button>
        <div class="tw_pg-buttons">

            <div class="tw_pg-buttons__item">
                <span :class="{'tw_pg-active': currentPage === 1}" @click="currentPage = 1">1</span>
            </div>

            <div v-if="currentPage > MAX_PAGES + 2">
                <pre>. . .</pre>
            </div>

            <div class="tw_pg-buttons__item" v-for="page in total_pages"
                 :class="{'tw_pg-hide' : Math.abs(page - currentPage) > MAX_PAGES || page === 1 || page === total_pages}">
                <span v-if="page !== 1 && page !== total_pages"
                      :class="{'tw_pg-active': page === currentPage}"
                      @click="currentPage = page"
                >{{ page }}</span>
            </div>

            <div v-if="currentPage < total_pages - (MAX_PAGES + 1)">
                <pre>. . .</pre>
            </div>

            <div class="tw_pg-buttons__item">
                <span :class="{'tw_pg-active': currentPage === total_pages}" @click="currentPage = total_pages">{{ total_pages }}</span>
            </div>

        </div>
        <button v-if="with_buttons" class="tw_paginator__control-button" @click="handleButtonClick(1)">Следующая</button>

        <div v-if="with_go_to" class="tw_go_to">
            <label>Перейти на:</label>
            <input ref="paginatorInput" class="tw_go_to__input"
                   @change="handleChangePage"
                   @keydown.enter="handleChangePage"
                   type="number">
        </div>

    </div>
</template>
