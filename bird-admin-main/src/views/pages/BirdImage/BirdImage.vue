<template>
  <div class="images-header">
    <IconChevronsLeft @click="goBack" />
    <h3>{{ speciesImages.length }} image(s)</h3>
    <button class="inst-btn" @click="openModal">Insert</button>
    <button class="choose-btn" @click="toggleSelectionMode">
      {{ isSelectionMode ? 'Cancel' : 'Choose Images' }}
    </button>
    <button v-if="isSelectionMode && selectedImages.length > 0" class="delete-btn" @click="deleteSelectedImages">Delete Selected</button>
  </div>
  <div class="bird-species-images">
    <div v-if="speciesImages.length" class="images-grid">
      <div v-for="(image, index) in speciesImages" :key="image.id" class="image-container">
        <span class="image-index">{{ index + 1 }}</span>
      <img  
        :src="image.url"
        :key="image.id"
        :alt="image.altText || 'Bird Image'"
        class="bird-image"
        @click="isSelectionMode ? toggleImageSelection(image.id) : openImageModal({ id: image.id, url: image.url, altText: image.altText })"
      />
      <input
        v-if="isSelectionMode"
        type="checkbox"
        class="image-checkbox"
        :checked="isImageSelected(image.id)"
        @change="toggleImageSelection(image.id)"
      />
      </div>
    </div>
    <div v-if="isModalInsertOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <textarea v-model="urlInput" placeholder="Enter image URLs, one per line" rows="5"></textarea>
        <div class="modal-actions">
          <button @click="submitImages">Insert Images</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  <ImageModal
    v-if="isModalOpen"
    :isOpen="isModalOpen"
    :imageUrl="selectedImageUrl"
    :imageName="selectedImageName"
    :selectedBirdId="selectedBirdId"
    @updateImages="fetchBirdImages"
    @image-deleted="fetchBirdImages"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, computed, defineExpose } from 'vue';
import { IconChevronsLeft } from '@tabler/icons-vue';
import ImageModal from '@/components/BirdImage/ImageModal.vue';
import { getBirdImages, insertImages, deleteMultiImage } from '@/services/apiService';
import ConfirmModal from '@/components/Modal/ConfirmModal.vue';
import { useModalConfirm } from '@/stores/useConfirmStore';
import type { BirdImage } from '@/types/BirdImage';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';
const confirmStore = useModalConfirm();
const router = useRouter();
const toast = useToast();
const isModalOpen = ref(false);
const isModalInsertOpen = ref(false);
const selectedImageUrl = ref('');
const selectedImageName = ref('');
const selectedBirdId = ref('');
const route = useRoute();
const urlInput = ref('');
const isSelectionMode = ref(false);
const selectedImages = ref<string[]>([]);
console.log('Route params:', route.params);
console.log('Route query:', route.query);

const toggleSelectionMode  = () => {
  isSelectionMode.value = !isSelectionMode.value;
  if (!isSelectionMode.value) {
    selectedImages.value = [];
  }
};

const toggleImageSelection = (id: string) => {
  if (selectedImages.value.includes(id)) {
    selectedImages.value = selectedImages.value.filter((imageId) => imageId !== id);
  } else {
    selectedImages.value.push(id);
  }
};
const isImageSelected = (id: string) => {
  return selectedImages.value.includes(id);
};
const deleteSelectedImages = async () => {
  if (selectedImages.value.length > 0) {
    try {
      await deleteMultiImage(selectedImages.value);
      toast.success('Delete selected images successfully');
      fetchBirdImages();
      selectedImages.value = [];
      isSelectionMode.value = false;
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete selected images');
    }
  } else {
    toast.warning('Please select at least one image to delete');
  }
};
const openModal = () => {
  isModalInsertOpen.value = true;
  urlInput.value = '';
};
const submitImages = async () => {
  const urls = urlInput.value
    .split('\n')
    .map((url) => url.trim())
    .filter((url) => url);
  if (urls.length > 0 && specieId.value) {
    try {
      await insertImages(specieId.value, urls);
      toast.success('Image inserted successfully!');
      closeModal();
      fetchBirdImages();
    } catch (error) {
      console.error('Error inserting images:', error);
      toast.error('Image insert failed!');
    }
  } else {
    alert('Please enter at least one URL and select a species.');
  }
};
const specieId = computed(() => {
  const id = route.params.specieId;
  return Array.isArray(id) ? id[0] : id;
});
const closeModal = () => {
  isModalOpen.value = false;
  isModalInsertOpen.value = false;
};
const props = defineProps<{
  speciesId: string;
  speciesName: string | null;
}>();
const speciesImages = ref<BirdImage[]>([]);
const openImageModal = ({ id, url, altText }: { id: string; url: string; altText: string }) => {
  selectedBirdId.value = id;
  selectedImageUrl.value = url;
  selectedImageName.value = altText;
  isModalOpen.value = true;
};
const fetchBirdImages = async () => {
  if (specieId.value) {
    try {
      const response = await getBirdImages(specieId.value);
      speciesImages.value = response.data;
    } catch (error) {
      console.error('Error fetching bird images:', error);
    }
  }
};
defineExpose({
  fetchBirdImages
});

fetchBirdImages();
const goBack = () => {
  router.back();
};
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
.images-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.bird-species-images {
  padding: 10px;
  height: calc(100vh - 120px);
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

/* Modal styles */
.modal-overlay {
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
  width: 650px;
  max-width: 90%;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

textarea {
  padding: 5px;
  width: 100%;
  resize: none;
  margin-top: 10px;
}
.inst-btn {
  background-color: #0D8AE3;
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
}
.image-container {
  position: relative;
}

.image-checkbox {
  position: absolute;
  top: 10px;
  left: 10px;
  transform: scale(1.5);
}

.choose-btn {
  background-color: #2196f3;
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  margin-left: 10px;
}

.delete-btn {
  background-color: #f44336;
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  margin-left: 10px;
}
.image-index {
  position: absolute;
  top: 5px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 5px;
  font-size: 12px;
  border-radius: 3px;
}
</style>
