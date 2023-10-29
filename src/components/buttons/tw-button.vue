<template>
    <button @click="$emit('push')"
            class="tw_button"
            :class="{
                success,
                f_success,
                error,
                f_error,
                warn,
                f_warn,
                rounded,
                circle,
                xs,
                sm,
                md,
                lg,
                xl,
                xxl,
                xxxl,
                bg_white
            }">
        <slot/>
    </button>
</template>

<script setup lang="ts">

defineProps<{
    success?: boolean
    error?: boolean
    warn?: boolean
    f_success?: boolean
    f_error?: boolean
    f_warn?: boolean
    rounded?: boolean
    circle?: boolean
    xs?: boolean,
    sm?: boolean,
    md?: boolean,
    lg?: boolean,
    xl?: boolean,
    xxl?: boolean,
    xxxl?: boolean,
    bg_white?: boolean,
}>()
defineEmits<{
    (e: 'push'): void
}>()
</script>
<style lang="scss">

</style>