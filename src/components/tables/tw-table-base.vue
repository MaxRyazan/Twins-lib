<template>
    <table class="global-table" :class="{td_align_left, td_align_right}">
        <thead>
        <tr>
            <th v-for="(columnName, idx) in header" :key="idx">{{ columnName }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="!body.length" style="color: rgb(212, 190, 50);" class="table_no_data">
            <td :colspan="header?.length || 1">
                Данные отсутствуют
            </td>
        </tr>
        <tr v-for="(bodyElement, index) in body" :key="index"
            :class="{'odd': index % 2 === 0, 'selected': isSelected(bodyElement)}"
            @click="emitAction(bodyElement, $event)"
            @dblclick="emitDblClick(bodyElement, $event)"
            @contextmenu.prevent="emitRightClick(bodyElement, $event)">
            <td v-for="(value, bodyElIndex) in Object.values(bodyElement)" :key="bodyElIndex">
                <div style="display: inline-flex">
                    <div v-if="props.elementsWithTabulation">
                        <div v-for="(el, indInTabulation) in elementsWithTabulation" :key="indInTabulation">
                            <pre v-if="el[0] === index && el[1] === bodyElIndex">   </pre>
                        </div>
                    </div>
                    <span :class="{'red_when_sub_zero': subZero && value < 0}">{{ normalizeValue(value) }}</span>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";


const emits = defineEmits(['push', 'dabClick', 'rightClick'])
const props = defineProps({
    header: {
        type: Array,
        required: false
    },
    body: {
        type: Array,
        required: true,
    },
    td_align_left: {
        type: Boolean,
        required: false
    },
    td_align_right: {
        type: Boolean,
        required: false
    },
    elementsWithTabulation: {
        type: Array,
        required: false
    },
    redWhenSubZero: {
        type: Boolean,
        required: false
    },
    tableWithSelect: {
        type: Boolean,
        required: false
    },
    withFixedToZero: {
        type: Boolean,
        required: false
    },
    withFixedToOne: {
        type: Boolean,
        required: false
    },
    withFixedToTwo: {
        type: Boolean,
        required: false
    },
})

const selectedElement = ref('')

function emitAction(bodyElement: any, $event: MouseEvent) {
    selectedElement.value = JSON.stringify(bodyElement)
    emits('push', {bodyElement, $event})
}

function emitDblClick(bodyElement: any, $event: MouseEvent) {
    selectedElement.value = JSON.stringify(bodyElement)
    emits('dabClick', {bodyElement, $event})
}

function emitRightClick(bodyElement: any, $event: MouseEvent) {
    selectedElement.value = JSON.stringify(bodyElement)
    emits('rightClick', {bodyElement, $event})
}

function isSelected(bodyElement: any) {
    if (props.tableWithSelect) {
        return selectedElement.value === JSON.stringify(bodyElement)
    }
}


const subZero = computed(() => {
    return props.redWhenSubZero
})

function normalizeValue(field: any) {
    if (field === ' ' || field === '') return field
    if (!isNaN(field)) {
        if(props.withFixedToZero){
            return Number(field).toFixed()
        }
        if(props.withFixedToOne){
            return Number(field).toFixed(1)
        }
        if(props.withFixedToTwo){
            return Number(field).toFixed(2)
        }
        return Number(field)
    } else {
        return field
    }
}

</script>
