<template>
    <div v-if="isOpen" class="model-overlay" @click.self="closeModal">
      <div class="modal-content">
          <h2>{{ imageName }}</h2>
          <img :src="imageUrl" alt="Bird Image" class="modal-image" />
          <input 
            v-model="newImageUrl"
            type="text"
            placeholder="Enter new image Url"
            class="image-url-input"
            />
          <div class="modal-actions">
              <button class="modal-btn delete" @click="deleteImage">Delete</button>
              <button class="modal-btn update" @click="updateImage">Update</button>
              <button class="modal-btn close" @click="closeModal">Close</button>
          </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { deleteImage as apiDeleteImage, updateBirdImage } from '@/services/apiService';
  import { ref, defineEmits, watch } from 'vue';
  import { useToast } from 'vue-toastification';
  
  const toast = useToast(); 
  const emit = defineEmits(['close', 'updateImages', 'image-deleted']);

  const props =  defineProps <{
      isOpen: boolean;
      imageUrl: string;
      imageName: string;
      selectedBirdId: string;
  }>();  
  const newImageUrl = ref(props.imageUrl);
  watch(() => props.imageUrl, (newUrl) => {
    newImageUrl.value = newUrl;
  });
  const closeModal = () => {
      emit('close')
  }
  const deleteImage = async () => {
      try{
          await apiDeleteImage(props.selectedBirdId);
          toast.success('Image deleted successfully!');
          emit('image-deleted');
          closeModal();
  
      }catch(error){
          toast.error('Failed to delete Image!');
          console.error(error);
      }
  }
  const updateImage = async () => {
      try{
          await updateBirdImage(props.selectedBirdId, newImageUrl.value || props.imageUrl);
          emit('updateImages');
          closeModal();
          toast.success('Image updated successfully!');
          
      }catch(error){
          toast.error('Failed to update Image!');
          console.error(error);
      }
  }
  </script>
  
<style scoped>
.model-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  /* width: 500px; */
  max-width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.image-url-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  gap: 5px;
}

.modal-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.modal-btn.delete {
  background-color: #e74c3c;
  color: white;
}

.modal-btn.update {
  background-color: #3498db;
  color: white;
}

.modal-btn.close {
  background-color: #95a5a6;
  color: white;
}

.modal-btn:hover {
  opacity: 0.9;
}
</style>