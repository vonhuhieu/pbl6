<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>
      <h2>Add Bird Order</h2>
      <form @submit.prevent="openModalConfirmAdd">
        <input v-model="orderName" placeholder="Enter order name" required />
        <input v-model="orderImage" placeholder="Enter order imageUrl" required />
        <button type="submit">Add Order</button>
      </form>
    </div>
  </div>
  <ConfirmModal />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { insertOrder } from '@/services/orderService';
import { defineEmits } from 'vue';
import { useToast } from 'vue-toastification';
import ConfirmModal from '../Modal/ConfirmModal.vue';
import { useModalConfirm } from '@/stores/useConfirmStore';
const confirmStore = useModalConfirm();
const openModalConfirmAdd = (event: Event) => {
  event.preventDefault();
  confirmStore.setQuestion({
    title: 'Confirm',
    question: 'Are you sure you want to add this order?',
    actionConfirm: submitOrder,
    data: undefined
  });
};
const toast = useToast();
const emit = defineEmits(['close', 'order-added']);

const orderName = ref('');
const orderImage = ref('');
const submitOrder = async () => {
  try {
    await insertOrder(orderName.value, orderImage.value);
    orderName.value = '';
    orderImage.value = '';
    toast.success('Order inserted successfully!');
    emit('close',);
    emit('order-added',)
  } catch (error) {
    toast.error('Failed to insert order!');
    console.error('Error adding order:', error);
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
  background-color: #4CAF50;
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
