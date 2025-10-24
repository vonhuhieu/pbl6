<template>
  <div class="table-container">
    <table class="styled-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in paginatedData" :key="row.id">
          <td v-for="column in columns" :key="column.key">
            <template v-if="column.key === 'image_url'">
              <img v-if="row[column.key]" :src="row[column.key]" alt="Image" class="image" />
              <img v-else src="@/assets/images/icons/svg/bird-avatar.svg" alt="Default Image" class="image" />
            </template>
            <template v-else>
              {{ row[column.key] }}
            </template>
          </td>
          <td class="actions">
            <button
              v-if="isHaveDetail"
              class="detail-btn"
              @click="$emit('view-detail', row)"
            >
              View Detail
            </button>       
            <button class="view-btn" @click="$emit('view-child', row)">{{ view_title }}</button>
            <button v-if="isHaveEdit" class="edit-btn" @click="$emit('edit', row)">Edit</button>
            <button class="delete-btn" @click="$emit('delete', row.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';

interface Column {
  key: string;
  label: string;
}

const props = defineProps<{
  view_title: string;
  columns: Column[];
  data: Record<string, any>[];
  currentPage: number;
  itemsPerPage: number;
  isHaveDetail?: boolean;
  isHaveEdit?: boolean;
}>();
const paginatedData = computed(() => {
  const start = (props.currentPage - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return props.data.slice(start, end);
});
const emit = defineEmits(['edit', 'delete', 'view-child', 'view-detail']);
</script>
<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.styled-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: 'Poppins', sans-serif;
  background: rgb(var(--v-theme-containerBg));
  border-radius: 12px;
}

.styled-table th,
.styled-table td {
  border-bottom: 1px solid #ddd;
  padding: 15px 20px;
  text-align: left;
  vertical-align: middle;
}

.styled-table th {
  background-color: #0D8AE3;
  color: white;
  font-weight: bold;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.styled-table tr:last-child td {
  border-bottom: none;
}

.styled-table tr:nth-child(even) {
  background-color: #f7f7f7;
}

.styled-table tr:hover {
  background-color: #e0f7e4;
  cursor: pointer;
}

.styled-table td {
  font-size: 14px;
  color: #333;
}

.styled-table th:first-child,
.styled-table td:first-child {
  border-left: none;
}

.styled-table th:last-child,
.styled-table td:last-child {
  border-right: none;
}

.detail-btn,
.edit-btn,
.delete-btn,
.view-btn {
  background-color: #f0f0f0;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.detail-btn:hover {
  background-color: #9ed029;
  color: white;
}

.edit-btn:hover {
  background-color: #0D8AE3;
  color: white;
}

.delete-btn:hover {
  background-color: #ff4d4d;
  color: white;
}

.view-btn:hover {
  background-color: #2980b9;
  color: white;
}

.image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ddd;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .styled-table th,
  .styled-table td {
    padding: 10px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .styled-table th,
  .styled-table td {
    padding: 8px 10px;
    font-size: 12px;
  }
}
</style>
