<template>
    <button @click="$emit('push')"
            class="tw_button"
            :class="{
                success,
                error,
                warn,
                rounded,
                circle,
                xs,
                sm,
                md,
                lg,
                xl,
                xxl,
                xxxl,
            }">
        <slot/>
    </button>
</template>

<script setup lang="ts">

defineProps<{
    success?: boolean
    error?: boolean
    warn?: boolean
    rounded?: boolean
    circle?: boolean
    xs?: boolean,
    sm?: boolean,
    md?: boolean,
    lg?: boolean,
    xl?: boolean,
    xxl?: boolean,
    xxxl?: boolean,
}>()
defineEmits<{
    (e: 'push'): void
}>()
</script>
<style lang="scss">

</style>