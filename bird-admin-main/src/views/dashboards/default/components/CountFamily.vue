<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue';
import { ArchiveIcon, CopyIcon, DownloadIcon, FileExportIcon, BinaryTree2Icon } from 'vue-tabler-icons';
import { getFamilyCount } from '@/services/dashboardService';
import iconCard from '@/assets/images/icons/icon-card.svg';
const familyCount = ref<number | null>(null);

const items = shallowRef([
  { title: 'Import Card', icon: DownloadIcon },
  { title: 'Copy Data', icon: CopyIcon },
  { title: 'Export', icon: FileExportIcon },
  { title: 'Archive File', icon: ArchiveIcon }
]);

onMounted(async () => {
  try{
    const response = await getFamilyCount();
    familyCount.value = response.data;
  }catch(error){
    console.error('Faild to get order count', error);
  }
})
</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape bubble-primary-shape">
    <v-card-text>
      <!-- <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darksecondary" variant="flat">
          <img :src="iconCard" width="25" />
        </v-btn>
      </div> -->
      <h2 class="text-h1 font-weight-medium">
        {{ familyCount !== null ? `${familyCount}` : 'Loading...' }}  <a href="#"><img src="/src/assets/images/icons/svg/order.svg"/> </a>
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis text-white">Total Families</span>
    </v-card-text>
  </v-card>
</template>
