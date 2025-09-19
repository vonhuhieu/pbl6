<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <h2>Edit Family</h2>
        <form @submit.prevent="openModalConfirmEdit">
          <input v-model="familyName" placeholder="Enter family name" required />
          <button type="submit">Save Changes</button>
        </form>
      </div>
      
    </div>
    <ConfirmModal />
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import { updateFamily } from '@/services/familyService';
  import { useToast } from 'vue-toastification';
  import ConfirmModal from '@/components/Modal/ConfirmModal.vue';
  const toast = useToast();
  const props = defineProps<{ family: { id: string, name: string }| null, orderId: string }>();
  const emit = defineEmits(['close', 'family-edited']);
  
  const familyName = ref(props.family?.name || '');
  import { useModalConfirm } from '@/stores/useConfirmStore';
  const confirmStore = useModalConfirm();
    const openModalConfirmEdit = (event: Event) => {
    event.preventDefault();
    confirmStore.setQuestion({
        title: 'Confirm',
        question: 'Are you sure you want to update this family?',
        actionConfirm: submitFamily,
        data: props.family?.id,
    });
};
  watch(() => props.family, (newFamily: { name: any; }) => {
    familyName.value = newFamily.name;
  });
  
  const submitFamily = async () => {
  if (props.family && props.family.id) {
    try {
      await updateFamily(props.family.id,props.orderId, familyName.value);
      toast.success('Family updated successfully!');
      emit('close');
      emit('family-edited');
    } catch (error) {
      toast.error('Failed to update family!');
      console.error('Error updating family:', error);
    }
  } else {
    toast.error('Invalid family data!');
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
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  /* button:hover {
    background-color: #45a049;
  }
   */
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
  