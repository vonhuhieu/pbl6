<script setup lang="ts">
// imported components
import TotalEarning from './TotalEarning.vue';
import TotalOrder from './TotalOrder.vue';
import TotalIncome from './TotalIncome.vue';
import ImageCountChart from './ImageCountChart.vue';
import CountSpecie from './CountSpecie.vue';
import TotalGrowth from './TotalGrowth.vue';
import PopularStocks from './PopularStocks.vue';
import CountOrder from './CountOrder.vue';
import CountFamily from './CountFamily.vue';
</script>

<template>
  <v-row>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Earning -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <CountOrder />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Order -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <CountFamily />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Income -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <!-- <TotalIncome/> -->
       <CountSpecie/>
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Total Growth -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" lg="12">
      <!-- <TotalGrowth /> -->
       <ImageCountChart/>
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Popular Stocks -->
    <!-- -------------------------------------------------------------------- -->
    <!-- <v-col cols="12" lg="4">
      <PopularStocks />
       <ImageCountChart/>
    </v-col> -->
  </v-row>
</template>
