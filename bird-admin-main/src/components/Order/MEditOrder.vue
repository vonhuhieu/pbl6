<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <h2>Edit Bird Order</h2>
        <form @submit.prevent="openModalConfirmEdit">
          <input v-model="orderName" placeholder="Enter order name" required />
          <input v-model="orderImage" placeholder="Enter order ImageUrl" required />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
    <ConfirmModal modal-overlay="close"></ConfirmModal>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import ConfirmModal from '../Modal/ConfirmModal.vue';
  import { updateOrder } from '@/services/orderService';
  import { useToast } from 'vue-toastification';
  import { useModalConfirm } from '@/stores/useConfirmStore';
  const confirmStore = useModalConfirm();
  const toast = useToast();
  const props = defineProps<{ order: { id: string, name: string, image_url: string }| null}>();
  const emit = defineEmits(['close', 'order-edited']);
  
  const orderName = ref(props.order?.name || '');
  const orderImage = ref(props.order?.image_url || '');
  const openModalConfirmEdit = (event: Event) => {
    event.preventDefault();
    confirmStore.setQuestion({
        title: 'Confirm',
        question: 'Are you sure you want to update this order?',
        actionConfirm: submitOrder,
        data: props.order?.id,
    });
};
  watch(() => props.order, (newOrder: { name: any; }) => {
    orderName.value = newOrder.name;
  });
  
  const submitOrder = async () => {
  if (props.order && props.order.id) {
    try {
      await updateOrder(props.order.id, orderName.value, orderImage.value);
      toast.success('Order updated successfully!');
      emit('close');
      emit('order-edited');
    } catch (error) {
      toast.error('Failed to update order!');
      console.error('Error updating order:', error);
    }
  } else {
    toast.error('Invalid order data!');
  }
};

  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    background-color: #0D8AE3;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

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
  