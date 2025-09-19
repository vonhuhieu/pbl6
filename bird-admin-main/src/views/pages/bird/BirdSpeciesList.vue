<template>
  <div class="bird-species-list">
    <div class="bird-species-header">
      <p style="padding: 20px"><span>{{ orderName }} </span> > <span style="font-weight: bold">{{ familyName }}</span></p>
      <button class="inst-btn" @click="openModal">Insert</button>
    </div>

    <div v-if="birdSpecies.length">
      <ul>
        <li
          v-for="(species) in birdSpecies"
          :key="species.id"
          @click="selectSpecies(species.id, species.name)"
          :class="{ active: selectedSpeciesId === species.id }"
        >
          {{ species.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No bird species found for this family.</p>
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Insert Image URLs for {{ selectedSpeciesName }}</h2>
        <textarea v-model="urlInput" placeholder="Enter image URLs, one per line" rows="5"></textarea>
        <div class="modal-actions">
          <button @click="submitImages">Insert Images</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';
import { getBirdSpecies, insertImages } from '@/services/apiService';
import { useToast } from 'vue-toastification';
import type { BirdSpecies } from '@/types/BirdSpiecies';
const toast = useToast();
const emit = defineEmits(['species-selected', 'images-inserted']);

const props = defineProps<{
  familyId: string;
  familyName: string | null;
  orderName: string | null;
}>();

const selectedSpeciesId = ref<string | null>(null);
const selectedSpeciesName = ref<string | null>(null);
const birdSpecies = ref<BirdSpecies[]>([]);
const isModalOpen = ref(false);
const urlInput = ref('');

const fetchBirdSpecies = async () => {
  if (props.familyId) {
    try {
      const response = await getBirdSpecies(props.familyId);
      birdSpecies.value = response.data;
    } catch (error) {
      console.error('Error fetching bird species:', error);
    }
  }
};

const selectSpecies = (speciesId: string, speciesName: string) => {
  selectedSpeciesId.value = speciesId;
  selectedSpeciesName.value = speciesName;
  emit('species-selected', { speciesId, speciesName });
};

const openModal = () => {
  isModalOpen.value = true;
  urlInput.value = '';
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitImages = async () => {
  const urls = urlInput.value.split('\n').map(url => url.trim()).filter(url => url);
  if (urls.length > 0 && selectedSpeciesId.value) {
    try {
      await insertImages(selectedSpeciesId.value, urls); 
      toast.success('Image inserted successfully!');
      closeModal();
      emit('images-inserted');
    } catch (error) {
      console.error('Error inserting images:', error);
      toast.error('Image insert failed!');
    }
  } else {
    alert('Please enter at least one URL and select a species.');
  }
};

watch(() => props.familyId, fetchBirdSpecies, { immediate: true });
</script>

<style scoped>
.bird-species-list {
  margin-top: 20px;
}

.bird-species-list h3 {
  color: #333;
  padding-left: 10px;
}

.bird-species-list ul {
  list-style-type: none;
  padding: 10px;
  display: flex;
  gap: 10px;
}

.bird-species-list li {
  padding: 10px;
  border: 1px solid #ddd;
  margin: 5px 0;
  border-radius: 4px;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
  cursor: pointer;
}

.bird-species-list li:hover {
  background-color: #e0f7fa;
}

.bird-species-list li.active {
  background-color: #0056b3;
  color: white;
}

.bird-species-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  background-color: #4CAF50;
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
}
</style>
