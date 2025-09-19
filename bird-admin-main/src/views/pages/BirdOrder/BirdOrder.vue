<template>
  <div class="header-container">
    <div>
      <BreadCrumb :routes="routes"/>

    </div>
    <div>
      <BaseButton @openModal="showAddModal = true" title="Add Order"/>

    </div>
  </div>
  <div>
    <ConfirmModal />
    <MAddOrder v-if="showAddModal" @close="showAddModal = false" @order-added="fetchOrders"/>

    <!-- Edit Modal -->
    <MEditOrder v-if="showEditModal" :order="selectedOrder" @close="showEditModal = false" @order-edited="fetchOrders" />

    <BaseTable
      :columns="columns"
      :data="orders"
      :currentPage="currentPage"
      :itemsPerPage="10"
      :isHaveEdit="true"
      @edit="openEditModal"
      @delete="openModalConfirmDelete"
      @view-child="toFamily"
      view_title="View Families"
    />

    <Pagination
      :totalItems="orders.length"
      :itemsPerPage="10"
      :currentPage="currentPage"
      @page-changed="currentPage = $event"
    />
    <!-- Confirm Delete Modal -->
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useModalConfirm } from '@/stores/useConfirmStore';
import ConfirmModal from '@/components/Modal/ConfirmModal.vue';
import BaseTable from '@/components/shared/comon/ui-kit/BaseTable.vue';
import Pagination from '@/components/Pagination.vue';
import MAddOrder from '@/components/Order/MAddOrder.vue';
import BreadCrumb from '@/components/Navigation/BreadCrumb.vue';
import MEditOrder from '@/components/Order/MEditOrder.vue';
import BaseButton from '@/components/shared/comon/ui-kit/BaseButton.vue';
import { useToast } from 'vue-toastification';
import { getOrder, deleteOrder } from '@/services/orderService';
import type { BirdOrder } from '@/types/BirdOrder';

const routes = [
    { name: 'Bird Orders', url: '/birdorders' },
];

const toast = useToast();
const router = useRouter();
const confirmStore = useModalConfirm();
const currentPage = ref(1);
const columns = ref([
  { label: 'Order', key: 'image_url' },
  { label: 'Name', key: 'name' },
  // Thêm các cột khác nếu cần
]);

const orders = ref<BirdOrder[]>([]);
const showAddModal = ref(false);
const showEditModal = ref(false);
const selectedOrder = ref<BirdOrder | null>(null);

const fetchOrders = async () => {
  try {
    const response = await getOrder();
    orders.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách họ chim:', error);
  }
};

const openEditModal = (order: BirdOrder) => {
  selectedOrder.value = order;
  showEditModal.value = true;
};

const handleDeleteOrder = async (orderId: string) => {
  try {
    await deleteOrder(orderId);
    toast.success('Delete successfully')
    fetchOrders(); // Refresh the orders after deletion
  } catch (error) {
    toast.error('Failed to delete order');
    console.error('Error deleting order:', error);
  }
};

const openModalConfirmDelete = (id: string) => {
    confirmStore.setQuestion({
        title: 'Confirm',
        question: 'Are you sure you want to delete this order?',
        actionConfirm: handleDeleteOrder,
        data: id,
    });
};

fetchOrders();

const toFamily = (row:{id: string}) => {
    router.push(`/pages/birdorders/${row.id}/birdfamily`);
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
