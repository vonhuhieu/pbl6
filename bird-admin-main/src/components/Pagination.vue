<template>
  <div class="pagination-container">
    <button
      class="pagination-button"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      <ChevronLeftIcon />
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="['pagination-button', { active: currentPage === page }]"
    >
      {{ page }}
    </button>

    <button
      class="pagination-button"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      <ChevronRightIcon />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from 'vue-tabler-icons';

const props = defineProps<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}>();

const emit = defineEmits(['page-changed']);

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const changePage = (page: number) => {
  emit('page-changed', page);
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('page-changed', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit('page-changed', props.currentPage + 1);
  }
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  font-family: 'Poppins', sans-serif;
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-button:hover:not(.active):not(:disabled) {
  background-color: #007bff;
  color: white;
}

.pagination-button.active {
  background-color: #007bff;
  color: white;
  border-color: #0056b3;
}

.pagination-button:disabled {
  cursor: not-allowed;
  background-color: #e9ecef;
  color: #adb5bd;
  border-color: #ddd;
}

.pagination-button:focus {
  outline: none;
  box-shadow: 0 0 5px #007bff;
}

@media (max-width: 768px) {
  .pagination-button {
    padding: 8px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .pagination-button {
    padding: 6px 10px;
    font-size: 12px;
  }
}
</style>
