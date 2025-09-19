<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue';
import { ArchiveIcon, CopyIcon, DownloadIcon, FileExportIcon, BinaryTree2Icon } from 'vue-tabler-icons';
import { getSpecieCount } from '@/services/dashboardService';
import iconCard from '@/assets/images/icons/icon-card.svg';
const specieCount = ref<number | null>(null);

const items = shallowRef([
  { title: 'Import Card', icon: DownloadIcon },
  { title: 'Copy Data', icon: CopyIcon },
  { title: 'Export', icon: FileExportIcon },
  { title: 'Archive File', icon: ArchiveIcon }
]);

onMounted(async () => {
  try{
    const response = await getSpecieCount();
    specieCount.value = response.data;
  }catch(error){
    console.error('Faild to get order count', error);
  }
})
</script>

<template>
  <v-card elevation="0" class="overflow-hidden bubble-shape-sm overflow-hidden bubble-warning">
    <v-card-text>
      <!-- <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darksecondary" variant="flat">
          <img :src="iconCard" width="25" />
        </v-btn>
      </div> -->
      <h2 class="text-h1 font-weight-medium">
        {{ specieCount !== null ? `${specieCount}` : 'Loading...' }}  <a href="#"><img src="/src/assets/images/icons/svg/specie.svg"/> </a>
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis">Total Species</span>
      <!-- <BinaryTree2Icon stroke-width="1.5" width="28" class="text-black" /> -->
    </v-card-text>
  </v-card>
</template>
