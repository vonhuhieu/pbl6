<template>
    <div class="bird-deleted-images">
      <h2>Deleted Bird Images</h2>
      <div v-if="deletedImages.length">
        <ul class="image-list">
          <li v-for="image in deletedImages" :key="image.id" class="deleted-image-item">
            <img 
              :src="image.url" 
              :alt="'Deleted Image ' + image.id" 
              class="deleted-image" 
              @click="openPreview(image.url)" 
            />
            <div class="image-actions">
              <button @click="restoreImage(image.id)" class="restore-button">Restore</button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="no-images">No deleted images found.</p>
      </div>
  
      <!-- Modal for image preview -->
      <div v-if="isPreviewVisible" class="modal" @click="closePreview">
        <div class="modal-content" @click.stop>
          <span class="close" @click="closePreview">&times;</span>
          <img :src="previewImageUrl" alt="Preview" class="preview-image" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getBirdDeleted, restoreBirdDeleted } from '@/services/recycleService';
  import type { BirdImage } from '@/types/BirdImage';
  
  const deletedImages = ref<BirdImage[]>([]);
  const isPreviewVisible = ref(false);
  const previewImageUrl = ref<string>('');
  
  // Fetch deleted images
  const fetchDeletedImages = async () => {
    try {
      const response = await getBirdDeleted();
      deletedImages.value = response.data;
    } catch (error) {
      console.error('Error fetching deleted images:', error);
    }
  };
  
  // Restore image
  const restoreImage = async (id: string) => {
    try {
      await restoreBirdDeleted(id);
      await fetchDeletedImages();
      alert('Image restored successfully!');
    } catch (error) {
      console.error('Error restoring image:', error);
    }
  };
  
  // Open image preview
  const openPreview = (url: string) => {
    previewImageUrl.value = url;
    isPreviewVisible.value = true;
  };
  
  // Close image preview
  const closePreview = () => {
    isPreviewVisible.value = false;
    previewImageUrl.value = '';
  };
  
  onMounted(fetchDeletedImages);
  </script>
  
  <style scoped>
  .bird-deleted-images {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #333;
    font-family: 'Arial', sans-serif;
    margin-bottom: 20px;
  }
  
  .image-list {
    list-style: none;
    padding: 0;
  }
  
  .deleted-image-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }
  
  .deleted-image-item:hover {
    transform: scale(1.02);
  }
  
  .deleted-image {
    width: 100px;
    height: auto;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer; /* Add pointer cursor for clickable images */
  }
  
  .image-actions {
    flex-grow: 1;
    text-align: right;
  }
  
  .restore-button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .restore-button:hover {
    background-color: #45a049;
  }
  
  .no-images {
    color: #777;
    font-style: italic;
  }
  
  /* Modal styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Make sure the modal is above other elements */
  }
  
  .modal-content {
    position: relative;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .preview-image {
    max-width: 100%;
    height: auto;
  }
  </style>
  