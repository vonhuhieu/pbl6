<script setup lang="ts">
import BaseButton2 from '../shared/comon/ui-kit/BaseButton2.vue';
import { useModalConfirm } from '@/stores/useConfirmStore';
import { XIcon } from 'vue-tabler-icons';
import { ref } from 'vue';
const modalConfirm = useModalConfirm();
const reason = ref<string>('');

const close = () => {
    modalConfirm.clearQuestion();
    reason.value = '';
};

const confirm = () => {
    modalConfirm.actionConfirm(modalConfirm.data, reason.value);
    close();
};

const cancel = () => {
    if (typeof modalConfirm.actionCancel === 'function') {
        modalConfirm.actionCancel(modalConfirm.data);
    }
    close();
};
</script>

<template>
    <div
        v-if="modalConfirm.isShow"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        class="modal__wrapper"
        @click="close"
    >
        <div
            v-motion
            :initial="{ opacity: 0, scale: 0.5 }"
            :enter="{ opacity: 1, scale: 1 }"
            class="modal__main"
            @click.stop
        >
            <p class="modal__main--title">{{ modalConfirm.title }}</p>
            <div
                class="ic-close"
                @click="cancel"
            >
                <XIcon/>
            </div>
            <p class="modal__main--question">{{ modalConfirm.question }}</p>
            <BaseTextArea
                v-if="modalConfirm.haveReason"
                v-model="reason"
                placeholder=""
                class="modal__reason"
            />
            <div class="modal__action">
                <BaseButton2
                    style-type="light"
                    title="Cancel"
                    border-radius="30px"
                    font-weight="600"
                    width="50%"
                    @click="cancel"
                />
                <BaseButton2
                    style-type="solid"
                    width="50%"
                    title="Confirm"
                    border-radius="30px"
                    font-weight="600"
                    @click="confirm"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.6);
}

.modal__main {
    background-color: #fff;
    border-radius: 20px;
    width: 400px;
    padding: 32px;
    position: relative;
}

.ic-close {
    position: absolute;
    top: 25px;
    right: 20px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #f0f0f0; /* Replacing $color-gray-50 */
}

.ic-close:hover {
    background-color: #e0e0e0; /* Replacing $color-gray-100 */
}

.modal__main--title {
    display: block;
    margin-bottom: 16px;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
}

.modal__main--question {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
}

.modal__reason {
    margin-top: 16px;
}

.modal__action {
    display: flex;
    margin-top: 32px;
    gap: 16px;
    width: 100%;
    align-items: center;
    justify-content: center;
}

</style>
