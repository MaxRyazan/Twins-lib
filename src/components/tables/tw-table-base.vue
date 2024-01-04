<template>
    <table :style="{
                width: props.width ?? '200px',
                height: props.height ?? 'auto',
                // backgroundColor: props.table_bgc,
                border: table_border ?? '1px solid black'
            }"
           class="global-table" :class="{td_align_left, td_align_right}">
        <thead>
        <tr>
            <th :style="{
                    backgroundColor: props.header_bgc ?? 'rgb(220, 220, 220)',
                    color: props.header_font_color ?? 'black',
                    fontSize: header_font_size ?? '18px',
                    fontFamily: props.header_font_family ?? '',
                    padding: props.header_padding ?? '5px 10px',
                    border: table_border ?? '1px solid black',
                    borderBottom: header_border_bottom ?? (table_border ?? '2px solid black')
                }"
                v-for="(columnName, idx) in header" :key="idx"
            >{{ columnName }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="!body.length" style="color: rgb(212, 190, 50);" class="table_no_data">
            <td :colspan="header?.length || 1">
                Данные отсутствуют
            </td>
        </tr>
        <tr v-for="(bodyElement, index) in body" :key="index"
            :style="{
                backgroundColor: watchRowBgc(index),
                color: watchRowTextColor(index),
                fontSize: watchRowFontSize(index),
                fontFamily: watchRowFontFamily(index),
            }"
            :class="{'odd': (index % 2 === 0 && props.multicolor), 'selected': isSelected(bodyElement)}"
            @click="emitAction(bodyElement, $event)"
            @dblclick="emitDblClick(bodyElement, $event)"
            @contextmenu.prevent="emitRightClick(bodyElement, $event)">
            <td :colspan="isSubTitle(index) ? header?.length : 1"
                :style="{
                    padding: props.cell_padding ?? '5px 10px',
                    fontSize: props.cell_font_size ?? watchRowFontSize(index),
                    color: watchRowTextColor(index),
                    minWidth: cell_min_width ?? '50px',
                    border: table_border ?? '1px solid black',
                    fontFamily: watchRowFontFamily(index),
                    textAlign: isSubTitle(index) ? (textAlign(index) ?? td_align_left ? 'left' : (td_align_right ? 'right' : 'center')) : (td_align_left ? 'left' : (td_align_right ? 'right' : 'center'))
                }"
                v-for="(value, bodyElIndex) in Object.values(bodyElement)" :key="bodyElIndex">
                <div style="display: inline-flex">
                    <div v-if="props.elements_with_tabulation">
                        <div v-for="(el, indInTabulation) in elements_with_tabulation" :key="indInTabulation">
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

interface RowCustomSettings {
    idx: number
    isSubTitle?: boolean
    textColor?: string
    fontSize?: string
    fontFamily?: string
    bgc?: string
    textAlign?: string
}

const emits = defineEmits(['push', 'dabClick', 'rightClick'])
const props = defineProps({
    header: {
        type: Array,
        required: false
    },
    body: {
        type: Array<Object | []>,
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
    elements_with_tabulation: {
        type: Array,
        required: false
    },
    red_when_sub_zero: {
        type: Boolean,
        required: false
    },
    table_with_select: {
        type: Boolean,
        required: false
    },
    with_fixed: {
        type: Number,
        required: false
    },
    width: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    },
    header_bgc: {
        type: String,
        required: false
    },
    header_font_color: {
        type: String,
        required: false
    },
    header_font_size: {
        type: String,
        required: false
    },
    cell_padding: {
        type: String,
        required: false
    },
    cell_font_size: {
        type: String,
        required: false
    },
    cell_font_color: {
        type: String,
        required: false
    },
    table_bgc: {
        type: String,
        required: false
    },
    cell_min_width: {
        type: String,
        required: false
    },
    multicolor: {
        type: Boolean,
        required: false
    },
    row_custom_settings: {
        type: Array<RowCustomSettings>,
        required: false
    },
    header_padding:{
        type: String,
        required: false
    },
    table_border: {
        type: String,
        required: false
    },
    header_font_family: {
        type: String,
        required: false
    },
    header_border_bottom: {
        type: String,
        required: false
    },
    sub_titles:{
        type: Array<number>,
        required: false
    }
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
    if (props.table_with_select) {
        return selectedElement.value === JSON.stringify(bodyElement)
    }
}


const subZero = computed(() => {
    return props.red_when_sub_zero
})

function normalizeValue(field: any) {
    if (field === ' ' || field === '') return field
    if (!isNaN(field)) {
        if (props.with_fixed) {
            return Number(field).toFixed(props.with_fixed)
        }
        return Number(field)
    } else {
        return field
    }
}

function watchRowBgc(rowIndex: number){
    if(!props.row_custom_settings) return props.table_bgc
    else {
        const object = props.row_custom_settings.find(obj => obj.idx === rowIndex)
        if(object) {
            return object.bgc
        } else return props.table_bgc
    }
}

function watchRowTextColor(rowIndex: number){
    if(!props.row_custom_settings) return props.cell_font_color ?? 'black'
    else {
        const object = props.row_custom_settings.find(obj => obj.idx === rowIndex)
        if(object) {
            return object.textColor
        }
    }
}
function watchRowFontSize(rowIndex: number){
    if(props.row_custom_settings) {
        const object = props.row_custom_settings.find(obj => obj.idx === rowIndex)
        if(object) {
            return object.fontSize
        } else return '14px'
    } else return '14px'
}

function watchRowFontFamily(rowIndex: number){
    if(props.row_custom_settings) {
        const object = props.row_custom_settings.find(obj => obj.idx === rowIndex)
        if(object) {
            return object.fontFamily
        }
    }
}

function isSubTitle(index: number){
    const exist = props.row_custom_settings.find(el => el.idx === index)
    if(exist && exist.isSubTitle) {
        return exist.isSubTitle
    }
}

function textAlign(index:number){
    const exist:RowCustomSettings = props.row_custom_settings.find(el => el.idx === index)
    if(exist && exist.textAlign) {
        return exist.textAlign
    } else return false
}
</script>
