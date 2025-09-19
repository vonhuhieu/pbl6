<script setup lang="ts">
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { IconChevronRight } from '@tabler/icons-vue';

const route = useRoute();

defineProps<{
    routes: Array<{
        name: string;
        url: string;
    }>;
}>();
</script>

<template>
  <div class="breadcrumb__wrapper">
    <div
      v-for="(item, index) in routes"
      :key="item.name"
      class="breadcrumb__item"
    >
      <router-link
        :to="item.url"
        :class="{ active: route.path === item.url }"
        >{{ item.name }}</router-link
      >
      <IconChevronRight
        v-if="index !== routes.length - 1"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb__wrapper {
  display: flex;
  align-items: center;
  gap: 8px;

  .breadcrumb__item {
    display: flex;
    align-items: center;
    color: #7f7f7f;
    
    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease-in-out;
      
      &:hover {
        color: #000;
      }

      &.active {
        font-weight: bold;
        color: #1976d2;
      }
    }

    & > svg {
      margin-left: 10px;
      margin-right: 10px;
      width: 16px;
      height: 16px;
      color: #bdbdbd;
    }

    &:last-child {
      font-weight: 700;
      color: #333;
      
      a {
        pointer-events: none;
        color: inherit;
      }
    }
  }
}
</style>
