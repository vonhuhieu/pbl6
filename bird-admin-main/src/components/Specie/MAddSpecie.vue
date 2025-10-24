<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal"><XIcon /></button>
      <h2>Add Specie</h2>
      <form @submit.prevent="openModalConfirmAdd">
        <input v-model="specieName" placeholder="Enter specie name" required />
        <input v-model="specieLifeSpan" placeholder="Enter specie lifespan" required />
        <input v-model="specieSize" placeholder="Enter specie size" required />
        <input v-model="specieImageUrl" placeholder="Enter specie imageUrl" required />
        <input v-model="specieDescription" placeholder="Enter specie description" required />
        <input v-model="specieColor" placeholder="Enter specie color" required />
        <input v-model="specieWeight" placeholder="Enter specie weight" required />
        <input v-model="sepeciePopulation" placeholder="Enter specie population" required />
        <input v-model="specieOffspring" placeholder="Enter specie offspring" required />
        <input v-model="specieRegion" placeholder="Enter specie region" required />
        <button type="submit">Add Specie</button>
      </form>
    </div>
  </div>
  <ConfirmModal />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { insertSpecie } from '@/services/specieService';
import { defineEmits } from 'vue';
import ConfirmModal from '../Modal/ConfirmModal.vue';
import { useModalConfirm } from '@/stores/useConfirmStore';
import { useToast } from 'vue-toastification';
import { XIcon } from 'vue-tabler-icons';
const confirmStore = useModalConfirm();
const toast = useToast();
const emit = defineEmits(['close', 'specie-added']);
const props = defineProps<{ familyId: string }>();
const specieName = ref('');
const specieLifeSpan = ref('');
const specieSize = ref('');
const specieImageUrl = ref('');
const specieDescription = ref('');
const specieColor = ref('');
const specieWeight = ref('');
const sepeciePopulation = ref('');
const specieOffspring = ref('');
const specieRegion = ref('');
const openModalConfirmAdd = (event: Event) => {
  event.preventDefault();
  confirmStore.setQuestion({
    title: 'Confirm',
    question: 'Are you sure you want to add this specie?',
    actionConfirm: submitSpecie,
    data: props.familyId
  });
};
const submitSpecie = async () => {
  try {
    await insertSpecie(
      props.familyId,
      specieName.value,
      specieLifeSpan.value,
      specieSize.value,
      specieImageUrl.value,
      specieDescription.value,
      specieColor.value,
      specieWeight.value,
      sepeciePopulation.value,
      specieOffspring.value,
      specieRegion.value
    );
    specieName.value = '';
    specieLifeSpan.value = '';
    specieSize.value = '';
    specieImageUrl.value = '';
    specieDescription.value = '';
    specieColor.value = '';
    specieWeight.value = '';
    sepeciePopulation.value = '';
    specieOffspring.value = '';
    specieRegion.value;
    toast.success('Specie inserted successfully!');
    emit('close');
    emit('specie-added');
  } catch (error) {
    toast.error('Failed to insert specie!');
    console.error('Error adding specie:', error);
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
  align-items: center;
  background-color: #0D8AE3;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}
/*   
  button:hover {
    background-color: #989e98;
  }
   */
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
  color: red;
}
</style>
