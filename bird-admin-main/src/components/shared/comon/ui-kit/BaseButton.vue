<template>
  <button class="styled-button" @click="openModal">{{ title }}</button>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
const props = defineProps<{
  title: string,
}>();
const emit = defineEmits<{
  (e: 'openModal'): void;
}>();

const openModal = () => {
  emit('openModal');
};
</script>

<style scoped>
.styled-button {
  background-color: #0D8AE3; /* Green background */
  color: white; /* White text */
  border: none; /* Remove border */
  padding: 10px 20px; /* Padding */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Increase font size */
  font-family: 'Poppins', sans-serif; /* Use the 'Poppins' font */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transition */
}

.styled-button:hover {
  background-color: #45a049; /* Darker green on hover */
  transform: scale(1.05); /* Slightly increase size on hover */
}

.styled-button:active {
  background-color: #3e8e41; /* Even darker green when clicked */
  transform: scale(0.98); /* Slightly shrink on click */
}

.styled-button:focus {
  outline: none; /* Remove focus outline */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add focus ring */
}

@media (max-width: 480px) {
  .styled-button {
    font-size: 14px; /* Adjust font size for small screens */
    padding: 8px 16px; /* Adjust padding for small screens */
  }
}
</style>
