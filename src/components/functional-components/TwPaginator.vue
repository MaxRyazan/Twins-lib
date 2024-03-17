<script setup lang="ts">
import {computed, ref, watch} from "vue";

const currentPage = ref(1)

const emits = defineEmits<{
    (e: 'changePage', param: number): void
}>()

const props = defineProps<{
    totalPages: number
}>()

const numberOfPages = computed(() => {
    let arrayOfPages = []
    for (let i = 2; i < props.totalPages + 1; i++) {
        arrayOfPages.push(i)
    }
    return arrayOfPages.slice(currentPage.value - 1, props.totalPages)
})


watch(currentPage, async () => {
    emits('changePage', currentPage.value - 1)
})

</script>

<template>
    <div class="flex align-items-center gap-5" v-if="props.totalPages > 1">
        <div class="pages_buttons">
            <div>
                <button style="border: 1px solid red" @push="currentPage -= 1">{{`<-`}}</button>
                <button style="border: 1px solid red; margin-left: -4px" @push="currentPage += 1" >{{`->`}}</button>
            </div>
        </div>
        <div class="pages_wrapper">
            <div class="panel_wrapper-pages pages">
                <div :class="{'curr_page': currentPage===1}" class="pages_item" @click="currentPage = 1">1</div>
                <div class="curr_page pages_item" v-if="currentPage>1">{{ currentPage }}</div>
                <div :class="{'curr_page': page===currentPage}" class="pages_item" v-for="page in numberOfPages"
                     :key="page" @click="currentPage = page">{{ page }}
                </div>
            </div>
            <div v-if="currentPage < props.totalPages-5">
                <pre style="cursor: default"> . . . </pre>
            </div>
            <div class="panel_wrapper-pages">
                <div v-if="currentPage < totalPages-4" :class="{'curr_page': currentPage===totalPages-1}"
                     class="pages_item" @click="currentPage = props.totalPages-1">{{ props.totalPages - 1 }}
                </div>
                <div v-if="currentPage < totalPages-5" :class="{'curr_page': currentPage===props.totalPages}"
                     class="pages_item" @click="currentPage = props.totalPages">{{ props.totalPages }}
                </div>
            </div>
        </div>
    </div>
</template>
