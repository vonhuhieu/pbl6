import { defineStore } from 'pinia';

export const useModalConfirm = defineStore({
    id: 'modal-confirm',
    state: () => ({
        isShow: false,
        title: '',
        question: '',
        actionConfirm: null as any,
        actionCancel: null as any,
        data: null as any,
        haveReason: false,
    }),
    actions: {
        setQuestion(data: {
            title: string;
            question: string;
            actionConfirm: any;
            actionCancel?: any;
            data: any;
            haveReason?: boolean;
            update?: boolean;
        }) {
            this.isShow = true;
            this.title = data.title;
            this.question = data.question;
            this.actionConfirm = data.actionConfirm;
            this.actionCancel = data.actionCancel;
            this.data = data.data;
            this.haveReason = data.haveReason ? data.haveReason : false;
        },
        clearQuestion() {
            this.isShow = false;
            this.title = '';
            this.question = '';
            this.actionCancel = null;
            this.actionConfirm = null;
            this.data = null;
            this.haveReason = false;
        },
    },
});
