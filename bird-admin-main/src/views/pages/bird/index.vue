<template>
  <div class="bird-management-container">
    <div class="bird-orders-container">
      <h2>Bird Orders</h2>
      <div class="button-container">
        <button 
          v-for="(order, index) in birdOrders" 
          :key="order.id" 
          @click="selectBirdOrder(index)"
          :class="{ active: selectedOrderIndex === index }"
        >
          {{ order.name }}
        </button>
      </div>

      <div class="bird-families">
        <div v-if="birdFamilies.length">      
          <h3>Bird Families</h3>
          <div 
            v-for="(family) in birdFamilies" 
            :key="family.id" 
            class="bird-family-card"
            :class="{ active: selectedFamilyIndex === family.id }"
            @click="selectFamily(family.id, family.name)"
          >
            <p class="family-name">{{ family.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bird-species-container">
      <BirdSpeciesList 
        v-if="selectedFamilyId" 
        :familyId="selectedFamilyId" 
        :familyName="selectedFamilyName" 
        @species-selected="onSpeciesSelected"
        @images-inserted="fetchBirdImages"
        :orderName="selectedOrderName"
      />   
      <div class="bird-images-container" v-if="selectedSpeciesId">
        <BirdSpeciesImages 
          ref="birdSpeciesImagesRef"
          :speciesId="selectedSpeciesId" 
          :speciesName="selectedSpeciesName" 
          @openModal="openImageModal"
        />
      </div>
    </div>

    <ImageModal 
      v-if="isModalOpen" 
      :isOpen="isModalOpen"
      :imageUrl="selectedImageUrl"
      :imageName="selectedImageName"
      :selectedBirdId="selectedBirdId"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getBirdOrder, getBirdFamily } from '@/services/apiService';
import type { BirdOrder } from '@/types/BirdOrder';
import BirdSpeciesList from '@/views/pages/bird/BirdSpeciesList.vue';
import BirdSpeciesImages from './BirdSpeciesImages.vue';
import ImageModal from './ImageModal.vue';

interface BirdSpeciesImagesInstance {
  fetchBirdImages: () => void; 
}

const birdOrders = ref<BirdOrder[]>([]);
const selectedOrderIndex = ref<number | null>(null);
const selectedFamilyIndex = ref<string | null>(null);
const birdFamilies = ref<BirdOrder[]>([]);
const selectedFamilyId = ref<string | null>(null);
const selectedFamilyName = ref<string | null>(null);
const selectedSpeciesId = ref<string | null>(null);
const selectedSpeciesName = ref<string | null>(null);
const selectedOrderName = ref<string | null>(null);

const isModalOpen = ref(false);
const selectedImageUrl = ref('');
const selectedImageName = ref('');
const selectedBirdId = ref('');
const birdSpeciesImagesRef = ref<BirdSpeciesImagesInstance | null>(null);

const fetchBirdOrders = async () => {
  try {
    const response = await getBirdOrder();
    birdOrders.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách họ chim:', error);
  }
};

const selectBirdOrder = async (index: number) => {
  selectedOrderIndex.value = index;
  const selectedOrderId = birdOrders.value[index].id;
  selectedOrderName.value = birdOrders.value[index].name;

  selectedFamilyId.value = null;
  selectedFamilyName.value = null;
  selectedFamilyIndex.value = null;
  selectedSpeciesId.value = null;
  selectedSpeciesName.value = null;

  try {
    const response = await getBirdFamily(selectedOrderId);
    birdFamilies.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bộ chim:', error);
  }
};

const fetchBirdImages = () => {
  if (birdSpeciesImagesRef.value && selectedSpeciesId.value) {
    birdSpeciesImagesRef.value.fetchBirdImages();
  }
};

const selectFamily = (familyId: string, name: string) => {
  selectedFamilyId.value = familyId;
  selectedFamilyName.value = name;
  selectedFamilyIndex.value = familyId;
  selectedSpeciesId.value = null; 
}

const onSpeciesSelected = ({ speciesId, speciesName }: { speciesId: string, speciesName: string }) => {
  selectedSpeciesId.value = speciesId;
  selectedSpeciesName.value = speciesName;
}

const openImageModal = ({ id, url, altText }: { id: string; url: string; altText: string }) => {
  selectedBirdId.value = id;
  selectedImageUrl.value = url;
  selectedImageName.value = altText;
  isModalOpen.value = true; // Mở modal
};

const closeModal = () => {
  isModalOpen.value = false; // Đóng modal
};

onMounted(fetchBirdOrders);
</script>

<style scoped>
.bird-management-container {
  display: flex;
  gap: 10px;
  width: 100%;
}
.bird-orders-container {
  flex-basis: 20%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}
.bird-species-container{
  flex-basis: 80%;
}
h1, h2 {
  color: #333;
}
.button-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
button {
  width: 100%;
  margin: 8px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: rgb(0, 0, 0);
  font-size: 18px;
  transition: background-color 0.3s, transform 0.3s;
  text-align: left;
}
button:hover {
  background-color: #e0f0ff;
  /* transform: translateY(-2px); */
  color: #4592d9;
}
button.active {
  background-color: #c3def7;
  color: #0962b5;  
  font-weight: 500px;
}
.bird-family-card.active {
  background-color: #b5e6b5;
  color: #0b7a0b;

}
.bird-families {
  border-top: 1px solid #ddd;
  padding-top: 20px;
}
.bird-family-card {
  font-size: 16px;
  padding: 10px;
  margin: 10px 0;
  /* border: 1px solid #ddd; */
  border-radius: 5px;
  /* transition: box-shadow 0.3s; */
  cursor: pointer;
}
.bird-family-card:hover {
  background-color: #d0f2d0;
  color: #80d180;
}
.family-name {
  font-weight: bold;
  font-size: 18px;
  /* color: #555; */
}
.no-families-message {
  font-style: italic;
  color: #777;
}
</style>
