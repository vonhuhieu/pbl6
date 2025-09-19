t<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getSpecieDetails, updateSpecie } from '@/services/specieService';
import type { BirdSpecies } from '@/types/BirdSpiecies';
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import ConfirmModal from '@/components/Modal/ConfirmModal.vue';
import { useModalConfirm } from '@/stores/useConfirmStore';
import { IconChevronsLeft } from '@tabler/icons-vue';

const confirmStore = useModalConfirm();

const toast = useToast();
const router = useRouter();
const route = useRoute();
const species = ref<BirdSpecies | null>(null);
const isEditing = ref(false);

const specieId = computed(() => {
  const id = route.params.specieId;
  return Array.isArray(id) ? id[0] : id;
});
const openModalConfirmEdit = (event: Event) => {
    event.preventDefault();
    confirmStore.setQuestion({
        title: 'Confirm',
        question: 'Are you sure you want to update this specie?',
        actionConfirm: confirmEdit,
        data: specieId,
    });
};
const form = ref({
  name: '',
  lifespan: '',
  size: '',
  weight: '',
  color: '',
  population: '',
  offspring: '',
  region: '',
  description: '',
  image_url: ''
});

const fetchSpecieDetails = async () => {
  try {
    if (specieId.value) {
      const response = await getSpecieDetails(specieId.value);
      species.value = response.data;
      Object.assign(form.value, response.data);
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách loài chim:', error);
  }
};

const startEdit = () => {
  isEditing.value = true;
};

const confirmEdit = async () => {
  try {
    if (specieId.value) {
      const updatedSpecie = {
        name: form.value.name,
        lifespan: form.value.lifespan,
        size: form.value.size,
        weight: form.value.weight,
        color: form.value.color,
        population: form.value.population,
        offspring: form.value.offspring,
        region: form.value.region,
        description: form.value.description,
        imageUrl: form.value.image_url,
      };

      await updateSpecie(
        specieId.value, 
        updatedSpecie.name, 
        updatedSpecie.lifespan, 
        updatedSpecie.size, 
        updatedSpecie.imageUrl, 
        updatedSpecie.description, 
        updatedSpecie.color, 
        updatedSpecie.weight, 
        updatedSpecie.population, 
        updatedSpecie.offspring, 
        updatedSpecie.region
      );

      if (species.value?.id) {
        species.value = {
          ...species.value,
          ...form.value,
          id: species.value.id
        };
      }
      toast.success('Species updated successfully!')
      isEditing.value = false;
    }
  } catch (error) {
    toast.error('Failed to update species!')
    console.error('Lỗi khi cập nhật thông tin loài chim:', error);
  }
};

const goBack = () => {
    router.back();
    }
onMounted(fetchSpecieDetails);
</script>


<template>    
    <div v-if="species" class="header-container">
      <IconChevronsLeft @click="goBack"/> 
      <span><p>Back to Species</p></span>
    </div>
  <div v-if="species" class="profile-container">

    <div class="profile-header">
      <div class="left-header">
      <img :src="species.image_url || '/default-image.jpg'" alt="Species image" class="profile-image" />
      <h2>{{ species.name }}</h2>
      </div>

      <div class="edit-buttons">
      <button v-if="!isEditing" @click="startEdit">Edit Mode</button>
      <div v-else>
        <button class="btn-submit" @click="openModalConfirmEdit">Submit</button>
        <button class="btn-cancel" @click="isEditing = false">Cancel</button>
      </div>
    </div>
    </div>
    <table class="profile-details">
      <tr v-if="isEditing">
        <th>Image Url</th>
        <td><input v-model="form.image_url" type="text"></td>
      </tr>
      <tr>
        <th>Lifespan</th>
        <td v-if="!isEditing">{{ species.lifespan || 'N/A' }}</td>
        <td v-else><input v-model="form.lifespan" type="text" /></td>
      </tr>
      <tr>
        <th>Size</th>
        <td v-if="!isEditing">{{ species.size || 'N/A' }}</td>
        <td v-else><input v-model="form.size" type="text" /></td>
      </tr>
      <tr>
        <th>Weight</th>
        <td v-if="!isEditing">{{ species.weight || 'N/A' }}</td>
        <td v-else><input v-model="form.weight" type="text" /></td>
      </tr>
      <tr>
        <th>Color</th>
        <td v-if="!isEditing">{{ species.color || 'N/A' }}</td>
        <td v-else><input v-model="form.color" type="text" /></td>
      </tr>
      <tr>
        <th>Population</th>
        <td v-if="!isEditing">{{ species.population || 'N/A' }}</td>
        <td v-else><input v-model="form.population" type="text" /></td>
      </tr>
      <tr>
        <th>Offspring</th>
        <td v-if="!isEditing">{{ species.offspring || 'N/A' }}</td>
        <td v-else><input v-model="form.offspring" type="text" /></td>
      </tr>
      <tr>
        <th>Region</th>
        <td v-if="!isEditing">{{ species.region || 'N/A' }}</td>
        <td v-else><input v-model="form.region" type="text" /></td>
      </tr>
      <tr>
        <th>Description</th>
        <td v-if="!isEditing">{{ species.description || 'No description available' }}</td>
        <td v-else><textarea v-model="form.description" /></td>
      </tr>
    </table>
    <ConfirmModal/>
  </div>
</template>

<style scoped>
.profile-container {
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-header {
  justify-content: space-between;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #919191;
  border-left: 5px solid #1c7a33;
  padding: 20px;
}
.left-header {
  display: flex;
  align-items: center;
  gap: 20px;
}
.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.profile-details {
  width: 100%;
  border-spacing: 0 10px;
  padding: 10px;
}

.profile-details th, .profile-details td {
  padding: 10px;
  text-align: left;
}

.profile-details th {
  font-size: 18px;
  font-weight: 500;
  width: 15%;
  align-items: center;
}

.profile-details td {
  width: 85%;
  border: 1px solid #d2d8df;
  border-radius: 8px;
}
.edit-buttons {
  align-items: center;
  text-align: center;
}

button {
  margin: 5px;
  padding: 10px 20px;
  background-color: #1c7a33;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #145a25;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
input, textarea {
  width: 100%;
  border: none;
}
.btn-submit {
  background-color: #1c597a;
  color: white;
}
.btn-cancel {
  background-color: #971919;
  color: white;
}
.btn-submit:hover {
  background-color: #206990;
  color: white;
}
.btn-cancel:hover {
  background-color: #bd1d1d;
  color: white;
}
.header-container {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 0;
  font-weight: 500;
}
.header-container:hover{
  font-weight: bold;
}
</style>
