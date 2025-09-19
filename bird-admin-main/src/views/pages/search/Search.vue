<script setup lang="ts">
import { ref } from 'vue';

const file = ref<File | null>(null);
const preview = ref<string | null>(null);
const result = ref<any>(null);
const loading = ref(false);

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
    preview.value = URL.createObjectURL(file.value);
  }
}

function onSubmit() {
  if (!file.value) return;
  loading.value = true;
  result.value = null;

  setTimeout(() => {
    result.value = {
      name: 'Chim Chào Mào',
      scientific: 'Pycnonotus jocosus',
      description:
        'Loài chim hót phổ biến ở Việt Nam, thường được nuôi làm cảnh.',
      habitat: 'Rừng cây, vườn, khu dân cư.'
    };
    loading.value = false;
  }, 2000);
}
</script>

<template>
  <div class="search-page">
    <h1 class="title">Bird Search</h1>
    <p class="subtitle">Upload ảnh để hệ thống phân tích loài chim</p>

    <div class="upload-box">
      <input type="file" accept="image/*" @change="onFileChange" />
      <div v-if="preview" class="preview">
        <img :src="preview" alt="preview" />
      </div>
    </div>

    <button class="submit-btn" @click="onSubmit" :disabled="!file || loading">
      <span v-if="!loading">Submit</span>
      <span v-else class="loader"></span>
    </button>

    <div v-if="loading" class="loading-text">Đang phân tích...</div>

    <div v-if="result" class="result">
      <h2>Kết quả phân tích</h2>
      <p><strong>Tên thường gọi:</strong> {{ result.name }}</p>
      <p><strong>Tên khoa học:</strong> {{ result.scientific }}</p>
      <p><strong>Mô tả:</strong> {{ result.description }}</p>
      <p><strong>Môi trường sống:</strong> {{ result.habitat }}</p>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
}

.subtitle {
  color: #666;
  margin-bottom: 24px;
}

.upload-box {
  border: 2px dashed #bbb;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  cursor: pointer;
}

.preview img {
  max-width: 100%;
  margin-top: 12px;
  border-radius: 8px;
}

.submit-btn {
  background: #1976d2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-bottom: 20px;
  font-style: italic;
  color: #555;
}

.result {
  text-align: left;
  margin-top: 20px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
}
</style>