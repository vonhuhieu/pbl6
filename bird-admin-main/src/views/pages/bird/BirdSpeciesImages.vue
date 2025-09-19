<template>
    <div class="bird-species-images">
          <div v-if="speciesImages.length">
      <h3>{{ speciesName }} has {{ speciesImages.length }} image(s)</h3>
    </div>
    <h2 v-else>No Images Found</h2>
      <h2>{{ speciesImages.length ? '' : 'No Images Found' }}</h2>
      <div v-if="speciesImages.length" class="images-grid">
        <img 
          v-for="image in speciesImages"
          :src="image.url"
          :key="image.id"
          :alt="image.altText || 'Bird Image'"
          class="bird-image"
          @click="openModal(image.id, image.url, image.altText)"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineEmits, onMounted, defineExpose } from 'vue';
  import { getBirdImages } from '@/services/apiService';
  import type {BirdImage} from '@/types/BirdImage';
  
  const props = defineProps<{
    speciesId: string;
    speciesName: string | null;
  }>();
  const speciesImages = ref<BirdImage[]>([]);
  const emit = defineEmits(['openModal']);
  
  const fetchBirdImages = async () => {
    if (props.speciesId) {
      try {
        const response = await getBirdImages(props.speciesId);
        speciesImages.value = response.data;
      } catch (error) {
        console.error('Error fetching bird images:', error);
      }
    }
  };
  defineExpose({
    fetchBirdImages,
  });
  
  const openModal = (id: string, url: string, altText: string) => {
    emit('openModal', { id, url, altText });
  };

  watch(() => props.speciesId, fetchBirdImages, { immediate: true });
  </script>
  <style scoped>
  .bird-species-images {
    padding: 20px;
  }
  
  .images-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .bird-image {
    width: 100%;
    height: auto;
    cursor: pointer;
  }
  </style>
  
<style scoped>
.bird-species-images {
    padding: 10px;
    height: calc(100vh - 100px);
    overflow: auto;
}
.images-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 13px;
    /* justify-content: space-between; */
}
.bird-image {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
}
</style>
