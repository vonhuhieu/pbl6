<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const id = route.params.id
const birdInfo = ref<any | null>(null)

const showAllImages = ref(false)
const relatedBirds = ref<any[]>([])
const isFromRelated = ref(true)

async function loadData() {
  const detailRes = await axios.get(
    `http://localhost:5000/bird-species/detail/${id}`
  )
  birdInfo.value = detailRes.data

  const relatedRes = await axios.get(
    `http://localhost:5000/bird-species/related`,
    { params: { name: birdInfo.value.name } }
  )
  relatedBirds.value = relatedRes.data
}

function toggleImages() {
  showAllImages.value = !showAllImages.value
}

function goBack() {
  router.back()
}

onMounted(loadData)
</script>


<template>
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

    <div class="big-box flex-direction-column" v-if="birdInfo">
        <button v-if="isFromRelated" class="submit-btn margin-auto" @click="goBack">⬅ Back</button>
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