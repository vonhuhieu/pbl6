<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const file = ref<File | null>(null)
const preview = ref<string | null>(null)
const resultImage = ref<string | null>(null)
const birdName = ref<string | null>(null)
const birdInfo = ref<any | null>(null)
const loading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const pasteArea = ref<HTMLDivElement | null>(null)
const relatedBirds = ref<any[]>([])
const showAllImages = ref(false)
const isFromRelated = ref(false)
const previousState = ref<any>(null);

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
  isFromRelated.value = false
  if (!file.value) return
  loading.value = true
  resultImage.value = null
  birdName.value = null
  birdInfo.value = null

  try {
    const formData = new FormData()
    formData.append('file', file.value)

    const response = await axios.post(
      'http://127.0.0.1:2205/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    birdName.value = response.data.name_bird

    const base64 = response.data.image_base64
    resultImage.value = `data:image/jpeg;base64,${base64}`

    if (birdName.value) {
      const detailRes = await axios.get(
        `http://localhost:5000/bird-species/search`,
        { params: { name: birdName.value } }
      )
      birdInfo.value = detailRes.data[0]
      showAllImages.value = false
      const relatedRes = await axios.get(
        `http://localhost:5000/bird-species/related`,
        { params: { name: birdName.value } }
      )
      relatedBirds.value = relatedRes.data
    }
  } catch (err) {
    birdName.value = "Garrulax canorus"
    showAllImages.value = false
    const detailRes = await axios.get(
      `http://localhost:5000/bird-species/search`,
      { params: { name: birdName.value } }
    )
    birdInfo.value = detailRes.data[0]
  } finally {
    loading.value = false
  }
}

function toggleImages() {
  showAllImages.value = !showAllImages.value
}

async function onClickRelatedBird(item: any) {
  router.push(`/pages/bird/${item.id}`)
}

const goBack = () => {
  if (!previousState.value) return;
  preview.value = previousState.value.preview;
  birdInfo.value = previousState.value.birdInfo;
  relatedBirds.value = previousState.value.relatedBirds;
  resultImage.value = previousState.value.resultImage;
  birdName.value = previousState.value.birdName;

  isFromRelated.value = false;
};
</script>

<template>
  <div class="big-box" v-if="!isFromRelated">
    <div class="small-box">
      <input v-if="!preview" type="file" accept="image/*" @change="onFileChange" ref="fileInput" />

      <div ref="pasteArea" class="paste-zone" :class="{ active: !preview }" tabindex="0">
        Click or paste here
      </div>

      <div v-if="preview" class="preview">
        <img :src="preview" alt="preview" />
      </div>
    </div>

    <div class="small-box">
      <h3>Ảnh Kết Quả</h3>
      <div v-if="resultImage" class="result-image">
        <img :src="resultImage" alt="result" />
        <p class="bird-name">🐦 {{ birdName }}</p>
      </div>
      <div v-else class="placeholder">Chưa có kết quả</div>
    </div>
  </div>

  <div class="btn-wrap" v-if="!isFromRelated">
    <button class="submit-btn" @click="onSubmit" :disabled="!file || loading">
      <span v-if="!loading">Submit</span>
      <span v-else class="loader"></span>
    </button>
  </div>

  <div class="big-box mt-20" v-if="birdInfo">
    <div class="small-box">
      <div class="image-bird">
        <img class="image-detail-bird-info" :src="birdInfo.image_url"></img>
      </div>

      <div class="image-name">
        {{ birdInfo.name }}
      </div>
    </div>

    <div class="small-box">
      <div class="title-detail-info">Thông tin chi tiết</div>
      <ul class="detail-info">
        <li class="birdFamily">
          <span class="fieldName">Họ:</span> {{ birdInfo.bird_family.name }}
        </li>

        <li class="name">
          <span class="fieldName">Tên:</span> {{ birdInfo.name }}
        </li>

        <li class="lifespan">
          <span class="fieldName">Vòng đời:</span> {{ birdInfo.lifespan }}
        </li>

        <li class="size">
          <span class="fieldName">Kích thước:</span> {{ birdInfo.size }}
        </li>

        <li class="description">
          <span class="fieldName">Mô tả:</span> {{ birdInfo.description }}
        </li>

        <li class="color">
          <span class="fieldName">Màu sắc:</span> {{ birdInfo.color }}
        </li>

        <li class="weight">
          <span class="fieldName">Cân nặng:</span> {{ birdInfo.weight }}
        </li>

        <li class="population">
          <span class="fieldName">Mật độ:</span> {{ birdInfo.population }}
        </li>

        <li class="offspring">
          <span class="fieldName">Sinh sản:</span> {{ birdInfo.offspring }}
        </li>

        <li class="region">
          <span class="fieldName">Phân bố:</span> {{ birdInfo.region }}
        </li>
      </ul>
    </div>
  </div>

  <div class="big-box list-images flex-direction-column" v-if="birdInfo">
    <div class="title-detail-info text-center">Một số hình ảnh khác</div>
    <div class="block-list-images">
      <img class="image-detail-bird-info flex-1"
        v-for="img in showAllImages ? birdInfo.image_birds : birdInfo.image_birds.slice(0, 3)" :key="img.id"
        :src="img.url" />
      <button v-if="birdInfo.image_birds.length > 3" class="submit-btn margin-auto" @click="toggleImages">
        {{ showAllImages ? "Watch less images" : "Watch more images" }}
      </button>
    </div>
  </div>

  <div class="big-box flex-direction-column" v-if="birdInfo && relatedBirds?.length">
    <div class="title-detail-info text-center">MỘT SỐ LOÀI LIÊN QUAN CÙNG HỌ {{ birdInfo.bird_family.name }}</div>

    <div class="block-list-cac-loai-lien-quan">
      <div class="related-item" v-for="item in relatedBirds" :key="item.id" @click="onClickRelatedBird(item)">
        <img class="related-image" :src="item.imageUrl || (item.image_birds?.[0]?.url ?? '')" alt="related-bird" />
        <div class="related-name">
          {{ item.name }}
        </div>
      </div>
    </div>

    <button v-if="isFromRelated" class="submit-btn margin-auto" @click="goBack">⬅ Back</button>
  </div>

  <div v-else-if="birdInfo" class="text-center no-related">
    Không có loài liên quan cùng họ
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
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.flex-direction-column {
  flex-direction: column !important;
}

.align-item-center {
  align-items: center
}

.detail-info {
  text-align: left;
  list-style: none;
  line-height: 2.5;
}

.title-detail-info {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 24px;
}

.mt-20 {
  margin-top: 20px !important;
}

.image-detail-bird-info {
  max-width: 100% !important;
}

.fieldName {
  font-weight: 700;
}

.block-list-images {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.text-center {
  text-align: center !important;
}

.flex-1 {
  flex: 1;
}

.block-list-cac-loai-lien-quan {
  display: flex;
  gap: 20px;
  justify-content: space-around;
  flex-wrap: wrap;
}

.related-item {
  width: calc(100% / 3 - 20px);
  height: 450px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  gap: 10px;
}

.related-item:hover {
  cursor: pointer;
  transform: translateY(-6px);
  box-shadow: 0 10px 16px rgba(0, 0, 0, 0.4);
  gap: 20px;
}

.related-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.related-item:hover .related-image {
  transform: scale(1.05);
}

.related-name {
  transition: color 0.3s ease-in-out;
}

.related-item:hover .related-name {
  color: #1976d2;
}

.margin-auto {
  margin: auto !important;
}
</style>