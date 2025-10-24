<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { getCountImages } from '@/services/dashboardService';
import type { ImageCount } from '@/types/ImageCount';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = ref<{
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    data: number[];
  }[];
}>({
  labels: [],
  datasets: [
    {
      label: 'Number of Images',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: []
    }
  ]
});

const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => `${tooltipItem.raw} images`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Image Count'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Species Name'
      }
    }
  }
};

const fetchData = async () => {
  try {
    const response = await getCountImages();
    const imageCounts = response.data ? response.data : response;

    if (Array.isArray(imageCounts)) {
      const labels = imageCounts.map(item => item.name);
      const data = imageCounts.map(item => item.count);

      chartData.value = JSON.parse(
        JSON.stringify({
          labels: labels,
          datasets: [
            {
              label: 'Number of Images',
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: data
            }
          ]
        })
      );
    } else {
      console.error('API response is not an array:', imageCounts);
    }
  } catch (error) {
    console.error('Error fetching image counts:', error);
  }
};


onMounted(() => {
  fetchData();
});
</script>

<style scoped>
div {

  margin: auto;
}
</style>
