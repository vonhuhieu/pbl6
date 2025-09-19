<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useRouter } from 'vue-router';
import BaseTable from '@/components/shared/comon/ui-kit/BaseTable.vue';
import MAddSpecie from '@/components/Specie/MAddSpecie.vue';
import Pagination from '@/components/Pagination.vue';
import BaseButton from '@/components/shared/comon/ui-kit/BaseButton.vue';
import BreadCrumb from '@/components/Navigation/BreadCrumb.vue';
import { ref } from 'vue';
import { getSpecie, deleteSpecie } from '@/services/specieService';
import type { BirdSpecies } from '@/types/BirdSpiecies';

const route = useRoute();
const currentPage = ref(1);

const baseRoutes  = [
  { name: 'Bird Orders', url: '/pages/birdorders' },
  { name: 'Bird Families', url: '/pages/birdorders/:orderId/birdfamily' },
  { name: 'Bird Species', url: '/pages/birdorders/:orderId/birdfamily/:id/birdspecies' },
];

const familyId = computed(() => {
  const id = route.params.familyId;
  if (!id) {
    console.error('familyId is missing from the route parameters');
    return '';
  }
  return Array.isArray(id) ? id[0] : id;
});

const orderId = computed(() => {
  const id = route.params.orderId;
  if (!id) {
    console.error('Order is missing from the route parameters');
    return '';
  }
  return Array.isArray(id) ? id[0] : id;
});

const routes = computed(() => {
  if (orderId.value && familyId.value) {
    return baseRoutes.map(route => ({
      ...route,
      url: route.url.replace(':orderId', orderId.value).replace(':id', familyId.value),
    }));
  }
  return baseRoutes;
});

console.log('Received params:', route.params);

const router = useRouter();
const columns = ref([
  { label: 'Name', key: 'name' },
]);

const species = ref<BirdSpecies[]>([]);
const showAddModal = ref(false);
const selectedSpecie = ref<BirdSpecies | null>(null);

const fetchSpecies = async () => {
  try {
    if (familyId.value) {
      const response = await getSpecie(familyId.value);
      species.value = response.data;
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách loài chim:', error);
  }
};
const handleDeleteSpecie = async (specieId: string) => {
  try {
    await deleteSpecie(specieId);
    await fetchSpecies();
  } catch (error) {
    console.error('Lỗi khi xoá loài chim:', error);
  }
};

fetchSpecies();

const toImage = (specie: BirdSpecies) => {
  const id = specie.id;
  router.push(`/pages/birdSpecies/${id}/birdimages`);
};
const viewDetail = (specie: BirdSpecies) => {
  router.push(`/pages/birdspecies/details/${specie.id}`);
};

</script>

<template>
  <div class="header-container">
    <div>
      <BreadCrumb :routes="routes"/>

    </div>
    <div>
      <BaseButton @openModal="showAddModal = true" title="Add Specie"/>

    </div>
  </div>
  <div>
    <MAddSpecie v-if="showAddModal" :familyId="familyId" @close="showAddModal = false" @specie-added="fetchSpecies"/>
    
    <!-- Edit Modal -->
    <BaseTable 
    :columns="columns" 
    :data="species"
    :current-page="currentPage"
    :items-per-page="10"
    @delete="handleDeleteSpecie" 
    @view-child="toImage" 
    @view-detail="viewDetail"
    :isHaveDetail="true"
    view_title="View Specie's images"/>

    <Pagination
      :totalItems="species.length"
      :itemsPerPage="10"
      :currentPage="currentPage"
      @page-changed="currentPage = $event"
    />
  </div>
</template>
<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>