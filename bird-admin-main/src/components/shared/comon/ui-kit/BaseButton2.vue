<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    title: string;
    styleType?: string;
    width?: string;
    borderRadius?: string;
    borderColor?: string;
    color?: string;
    fontWeight?: string;
}>();
</script>
<template>
    <button
        class="base__btn"
        :class="styleType"
        :style="{ width, borderRadius, borderColor, color, fontWeight }"
    >
        {{ title }}
    </button>
</template>
<style lang="scss" scoped>
.base__btn {
    // background-color: $color-primary;
    background-color: #1c2434;
    color: white;
    border: none;
    height: 38px;
    border-radius: 4px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;

   &.light {
       background-color: transparent;
       border: 1px solid #1c2434;
       color: #1c2434;
    }
}

// .base__btn:hover {
//     border: 1px solid $color-primary;
// }
</style>
