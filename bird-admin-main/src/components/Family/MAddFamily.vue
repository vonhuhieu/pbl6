<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>
      <h2>Add Order Family</h2>
      <form @submit.prevent="openModalConfirmAdd">
        <input v-model="familyName" placeholder="Enter family name" required />
        <button type="submit">Add Order Family</button>
      </form>
    </div>
  </div>
  <ConfirmModal />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { insertFamily } from '@/services/familyService';
import { defineEmits } from 'vue';

import ConfirmModal from '../Modal/ConfirmModal.vue';
const toast = useToast();
const emit = defineEmits(['close', 'family-added']);
const props = defineProps<{ orderId: string }>();
const familyName = ref('');
import { useToast } from 'vue-toastification';
import { useModalConfirm } from '@/stores/useConfirmStore';
const confirmStore = useModalConfirm();
const openModalConfirmAdd = (event: Event) => {
  event.preventDefault();
  confirmStore.setQuestion({
    title: 'Confirm',
    question: 'Are you sure you want to add this family?',
    actionConfirm: submitFamily,
    data: props.orderId
  });
};
const submitFamily = async () => {
  try {
    await insertFamily(props.orderId, familyName.value);
    familyName.value = '';
    toast.success('Family inserted successfully!');
    emit('close');
    emit('family-added');
  } catch (error) {
    toast.error('Failed to insert family!');
    console.error('Error adding family:', error);
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Modal overlay to dim background */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's above all content */
}

/* Modal content styling */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Input styling */
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Button styling */
button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}
/*   
  button:hover {
    background-color: #45a049;
  } */

/* Close button styling */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.close-button:hover {
  color: #ff0000;
}
</style>
