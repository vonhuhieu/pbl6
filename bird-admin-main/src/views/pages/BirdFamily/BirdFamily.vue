<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useRouter } from 'vue-router';
import BaseTable from '@/components/shared/comon/ui-kit/BaseTable.vue';
import MAddFamily from '@/components/Family/MAddFamily.vue';
import MEditFamily from '@/components/Family/MEditFamily.vue';
import Pagination from '@/components/Pagination.vue';
import BaseButton from '@/components/shared/comon/ui-kit/BaseButton.vue';
import BreadCrumb from '@/components/Navigation/BreadCrumb.vue';
import { useModalConfirm } from '@/stores/useConfirmStore';
import ConfirmModal from '@/components/Modal/ConfirmModal.vue';
import { ref } from 'vue';
import { getFamily, deleteFamily } from '@/services/familyService';
import type { BirdFamily } from '@/types/BirdFamily';
import { useToast } from 'vue-toastification';
const baseRoutes  = [
{ name: 'Bird Orders', url: '/pages/birdorders' },
{ name: 'Bird Families', url: '/pages/birdorders/:id/birdfamily' },
]
const toast = useToast();
const route = useRoute();
const confirmStore = useModalConfirm();
const currentPage = ref(1);
const orderId = computed(() => {
  const id = route.params.orderId;
  return Array.isArray(id) ? id[0] : id;
});
const routes = computed(() => {
  if (orderId.value) {
    return baseRoutes.map(route => ({
      ...route,
      url: route.url.replace(':id', orderId.value), 
    }));
  }
  return baseRoutes;
});
const router = useRouter();
const columns = ref([
  { label: 'Name', key: 'name' },
]);

const families = ref<BirdFamily[]>([]);
const showAddModal = ref(false);
const showEditModal = ref(false);
const selectedFamily = ref<BirdFamily | null>(null);

const fetchFamilies = async () => {
  try {
    if (orderId.value) {
      const response = await getFamily(orderId.value);
      families.value = response.data;
      console.log(families.value);
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bộ chim:', error);
  }
};

const openEditModal = (family: BirdFamily) => {
  selectedFamily.value = family;
  showEditModal.value = true;
};

const handleDeleteFamily = async (familyId: string) => {
  try {
    await deleteFamily(familyId);
    toast.success('family successfully deleted');
    await fetchFamilies();
  } catch (error) {
    toast.error('Failed to delete family:');
    console.error('Lỗi khi xoá bộ chim:', error);
  }
};

fetchFamilies();

const toSpecie = (row: { id: string }) => {
  router.push(`/pages/birdorders/${orderId.value}/birdfamily/${row.id}/birdspecies`);
};


const openModalConfirmDelete = (id: string) => {
    confirmStore.setQuestion({
        title: 'Confirm',
        question: 'Are you sure you want to delete this family?',
        actionConfirm: handleDeleteFamily,
        data: id,
    });
};
</script>

<template>
  <div class="header-container">
    <div>
      <BreadCrumb :routes="routes"/>

    </div>
    <div>
      <BaseButton @openModal="showAddModal = true" title="Add Family"/>

    </div>
  </div>
  <div>
    <ConfirmModal/>
    <MAddFamily v-if="showAddModal" :orderId="orderId" @close="showAddModal = false" @family-added="fetchFamilies"/>

    <!-- Edit Modal -->
    <MEditFamily v-if="showEditModal" :orderId="orderId" :family="selectedFamily" @close="showEditModal = false" @family-edited="fetchFamilies"/>

    <BaseTable 
    :columns="columns" 
    :data="families" 
    :currentPage="currentPage"
    :itemsPerPage="10"
    :isHaveEdit="true"
    @edit="openEditModal" 
    @view-child="toSpecie" 
    @delete="openModalConfirmDelete" 
    view_title="View Species"/>
    <Pagination
      :totalItems="families.length"
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