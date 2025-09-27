<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

const file = ref<File | null>(null)
const preview = ref<string | null>(null)
const resultImage = ref<string | null>(null)
const birdName = ref<string | null>(null)   // 🆕 Tên chim
const loading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const pasteArea = ref<HTMLDivElement | null>(null)

function setPreviewFromFile(f: File) {
  file.value = f
  preview.value = URL.createObjectURL(f)
  if (fileInput.value) fileInput.value.value = ''
}

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    setPreviewFromFile(target.files[0])
  }
}

// ✅ Dán ảnh từ clipboard
function onPaste(e: ClipboardEvent) {
  if (!e.clipboardData) return
  for (const item of e.clipboardData.items) {
    if (item.kind === 'file') {
      const pastedFile = item.getAsFile()
      if (pastedFile && pastedFile.type.startsWith('image/')) {
        setPreviewFromFile(pastedFile)
        break
      }
    }
  }
}

onMounted(() => {
  pasteArea.value?.addEventListener('paste', onPaste)
})
onBeforeUnmount(() => {
  pasteArea.value?.removeEventListener('paste', onPaste)
})

async function onSubmit() {
  if (!file.value) return
  loading.value = true
  resultImage.value = null
  birdName.value = null

  try {
    const formData = new FormData()
    formData.append('file', file.value)

    // 🆕 API trả JSON chứ không phải blob
    const response = await axios.post(
      'https://apiflask.dinlaan.site/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    // Lấy tên chim
    birdName.value = response.data.name_bird

    // Chuyển base64 -> data URL
    const base64 = response.data.image_base64
    resultImage.value = `data:image/jpeg;base64,${base64}`
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="big-box">
    <!-- Upload -->
    <div class="small-box">
      <input
        v-if="!preview"
        type="file"
        accept="image/*"
        @change="onFileChange"
        ref="fileInput"
      />

      <div
        ref="pasteArea"
        class="paste-zone"
        :class="{ active: !preview }"
        tabindex="0"
      >
        Click or paste here
      </div>

      <div v-if="preview" class="preview">
        <img :src="preview" alt="preview" />
      </div>
    </div>

    <!-- Kết quả -->
    <div class="small-box">
      <h3>Ảnh Kết Quả</h3>
      <div v-if="resultImage" class="result-image">
        <img :src="resultImage" alt="result" />
        <p class="bird-name">🐦 {{ birdName }}</p>
      </div>
      <div v-else class="placeholder">Chưa có kết quả</div>
    </div>
  </div>

  <div class="btn-wrap">
    <button class="submit-btn" @click="onSubmit" :disabled="!file || loading">
      <span v-if="!loading">Submit</span>
<span v-else class="loader"></span>
    </button>
  </div>
</template>

<style scoped>
.big-box {
  display: flex;
  gap: 20px;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.small-box {
  flex: 1;
  border: 1px dashed #bbb;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  background: #fafafa;
  min-width: 250px;
}
.paste-zone {
  margin-top: 12px;
  padding: 12px;
  border: 2px dashed #aaa;
  border-radius: 8px;
  color: #555;
  cursor: pointer;
}
.paste-zone.active:hover {
  border-color: #1976d2;
}
.preview img,
.result-image img {
  max-width: 100%;
  margin-top: 12px;
  border-radius: 8px;
}
.bird-name {
  margin-top: 10px;
  font-weight: bold;
  color: #1976d2;
}
.placeholder {
  color: #888;
  font-style: italic;
  margin-top: 20px;
}
.btn-wrap {
  text-align: center;
  margin-top: 20px;
}
.submit-btn {
  background: #1976d2;
  color: white;
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
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
</style>
