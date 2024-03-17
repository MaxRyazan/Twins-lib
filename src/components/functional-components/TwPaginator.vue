<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const currentPage = ref(1)
const MAX_PAGES = ref(3)

const emits = defineEmits<{
    (e: 'changePage', param: number): void
}>()

const props = defineProps<{
    total_pages: number
    max_pages_around_current: number
}>()

watch(currentPage, async () => {
    emits('changePage', currentPage.value - 1)
})

onMounted(() => {
    if(props.max_pages_around_current) {
        MAX_PAGES.value = props.max_pages_around_current
    }
})

</script>

<template>
    <div class="tw_paginator" v-if="props.total_pages > 1">
        <button style="border: 1px solid black; cursor: pointer" @click="currentPage -= 1">Предыдущая</button>
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
        <button style="border: 1px solid black;" @click="currentPage += 1">Следующая</button>
    </div>
</template>
