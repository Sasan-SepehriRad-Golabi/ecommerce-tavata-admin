<template>
    <v-progress-circular color="red" indeterminate></v-progress-circular>
    <v-locale-provider rtl>
        <v-row :style="{ 'margin-top': useMainStore().aph + 'px' }" v-if="transactionLoading" class="justify-center w-100">
            <v-skeleton-loader type="card,article"></v-skeleton-loader>
        </v-row>
        <v-row v-else class="justify-center w-100" :style="{ 'margin-top': useMainStore().aph + 'px' }">
            <v-col cols="12">
                <v-card class="pa-2 pb-16">
                    <v-card-subtitle class="text-red mb-2">اطلاعات مربوط به خرید</v-card-subtitle>
                    <v-card elevation="2">
                        <v-row>
                            <v-col cols="12" sm="6" lg="4">
                                <v-avatar class="mx-3">
                                    <v-img :src="`${baseURL}${transaction.pim}`"></v-img>
                                </v-avatar>
                                <v-card-text class="d-inline-flex">{{ transaction.pn && transaction.pn.length > 0 ?
                                    transaction.pn :
                                    'نامشخص'
                                }}</v-card-text>
                                <v-checkbox disabled="" label=" کالا در در حال حاضر در تخفیف است؟"
                                    :model-value="transaction.pdis == 1 ? true : false"></v-checkbox>
                                <v-checkbox disabled class="mt-n8" label=" کاربر با تخفیف کالا را خریده است؟"
                                    :model-value="transaction.boughtInDiscount == 1 ? true : false"></v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="6" lg="4" class="d-flex align-center">
                                <v-card-text :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">مشخصات خریدار</span>
                                    <v-avatar>
                                        <v-img :src="`${baseURL}${transaction.profileImage}`"></v-img>
                                    </v-avatar>
                                    <span class="text-blue mx-3" @click="showUser(`${transaction.peri}`)">{{
                                        transaction.firstName
                                    }}</span>
                                </v-card-text>
                            </v-col>
                            <v-col cols="12" sm="6" lg="4" class="d-flex align-center">
                                <v-card-text :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">هزینه کالا</span>
                                    <span class="font-weight-bold">{{ transaction.tamo }}</span>
                                </v-card-text>
                                <v-card-text v-if="transaction.boughtInDiscount"
                                    :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">هزینه بدون تخفیف کالا</span>
                                    <span class="font-weight-bold">{{ transaction.ppr }}</span>
                                </v-card-text>
                                <v-card-text :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">تعداد کالای خرید شده</span>
                                    <span class="font-weight-bold">{{ transaction.tnum }}</span>
                                </v-card-text>
                            </v-col>
                            <v-divider class="w-75 bg-red my-2"></v-divider>
                            <v-col cols="12" sm="6" lg="4" class="d-flex align-center">
                                <v-card-text :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">تاریخ رزرو کالا</span>
                                    <span class="font-weight-bold"
                                        style="overflow-wrap: anywhere;white-space-collapse: normal;">{{ transaction.ured
                                        }}</span>
                                </v-card-text>
                                <v-card-text :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">تاریخ خرید کالا توسط کاربر</span>
                                    <span class="font-weight-bold"
                                        style="overflow-wrap: anywhere;white-space-collapse: normal;">{{ transaction.ubud
                                        }}</span>
                                </v-card-text>
                            </v-col>
                            <v-col cols="12" sm="6" lg="4" class="d-flex align-center">
                                <v-card-text :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">تاریخ تایید نهایی کالا توسط ادمین </span>
                                    <span class="font-weight-bold"
                                        style="overflow-wrap: anywhere;white-space-collapse: normal;">{{ transaction.ubufd
                                        }}</span>
                                </v-card-text>
                            </v-col>
                            <v-col cols="12" sm="6" lg="4" class="d-flex align-center">
                                <v-card-text :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">دلیل رد درخواست خرید توسط ادمین</span>
                                    <span class="font-weight-bold"
                                        style="overflow-wrap: anywhere;white-space-collapse: normal;">{{ transaction.rfail
                                        }}</span>
                                </v-card-text>
                            </v-col>
                            <v-col cols="12" sm="6" lg="4" class="d-flex align-center">
                                <v-card-text :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">کامنت کاربر در مورد کالا</span>
                                    <span class="font-weight-bold"
                                        style="overflow-wrap: anywhere;white-space-collapse: normal;">{{ transaction.bcom
                                        }}</span>
                                </v-card-text>
                            </v-col>
                            <v-col cols="12" sm="6" lg="4" class="d-flex align-center">
                                <v-card-text :class="this.$vuetify.display.name == 'xs' ? 'mt-n8' : ''">
                                    <span class="mx-3 text-red">تاریخ کامنت کاربر</span>
                                    <span class="font-weight-bold"
                                        style="overflow-wrap: anywhere;white-space-collapse: normal;">{{
                                            transaction.bcomdate
                                        }}</span>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-row class="w-100">
                                <v-col cols="12" sm="6">
                                    <v-col><v-btn :loading="btnLoading" :disabled="transaction.isfinalVerified"
                                            @click="verifyPayment(transaction.tid, transaction.ts, transaction.peri)"
                                            class="mx-2 bg-green">تایید
                                            خرید</v-btn></v-col>
                                    <v-col>
                                        <v-card-subtitle v-if="transaction.isfinalVerified">قبلا تایید شده</v-card-subtitle>
                                    </v-col>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-col v-if="reasonOfFailBox" cols="12">
                                        <v-textarea v-model="reasonOfFailText">
                                        </v-textarea>
                                        <v-btn @click="cancelPayment(transaction.tid, transaction.ts, transaction.peri)"
                                            block class="bg-red"> رد کردن درخواست و ثبت دلیل
                                        </v-btn>
                                    </v-col>
                                    <v-col v-if="!reasonOfFailBox"><v-btn :loading="btnLoading"
                                            :disabled="transaction.ts == 62 || transaction.ts == 412 || transaction.ts == 422 || transaction.ts == 402 || transaction.ts == 502 || transaction.ts == 512 || transaction.ts == 522"
                                            @click="reasonOfFailBox = true;" class="mx-2 bg-red">رد کردن
                                            خرید</v-btn></v-col>
                                    <v-col>
                                        <v-card-subtitle
                                            v-if="transaction.ts == 62 || transaction.ts == 412 || transaction.ts == 422 || transaction.ts == 402 || transaction.ts == 502 || transaction.ts == 512 || transaction.ts == 522">قبلا
                                            رد شده</v-card-subtitle>
                                    </v-col>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
    </v-locale-provider>
</template>
<script>
import { PostData_normal, baseURL } from '@/services/remotedatamodify';
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            transactionLoading: true,
            transaction: {},
            baseURL: baseURL,
            useMainStore: useMainStore,
            btnLoading: false,
            reasonOfFailText: "",
            reasonOfFailBox: false
        }
    },
    created() {
        this.getTransactionDetails();
    },
    methods: {
        cancelPayment(transactionId, transactionState, userId) {
            useMainStore().mps = true;
            this.btnLoading = true;
            PostData_normal("@dm1n/cancelPayment", { tId: transactionId, ts: transactionState, rof: this.reasonOfFailText }, {
                onUploadProgress: (ProgressEvent) => {
                    useMainStore().mpv = Math.floor((ProgressEvent.loaded * 100) / ProgressEvent.total);
                }
            }, (err, res) => {
                useMainStore().mps = false;
                this.btnLoading = false;
                this.reasonOfFailBox = false
                if (res && res.data && res.data.res && res.data.res == "R4") {
                    useMainStore().sn.isLogin = true
                    useMainStore().gtlis = true;
                }
                else {
                    useMainStore().sn.isLogin = false
                    useMainStore().gtlis = false;
                }
                if (err) {
                    useMainStore().mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارسال اطلاعات" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        if (!useMainStore().gtlis) {
                            useMainStore().sn.sn = false;
                        }
                    }, 2000);
                }
                else {
                    if (res && res.data && res.data.res && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت ثبت شد. در حال انتقال به صفحه ارسال پیام به کاربر" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        this.transaction = res.data && res.data.transaction.length > 0 ? res.data.transaction[0] : [];
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                            this.$router.replace(`/sendMessage/${userId}`)
                        }, 2000);
                    }
                    else if (res && res.data && res.data.res && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید. دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارسال اطلاعات" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                }
            })
        },
        verifyPayment(transactionId, transactionState, userId) {
            useMainStore().mps = true;
            this.btnLoading = true;
            PostData_normal("@dm1n/verifyPayment", { tId: transactionId, ts: transactionState }, {
                onUploadProgress: (ProgressEvent) => {
                    useMainStore().mpv = Math.floor((ProgressEvent.loaded * 100) / ProgressEvent.total);
                }
            }, (err, res) => {
                useMainStore().mps = false;
                this.btnLoading = false;
                this.reasonOfFailBox = false
                if (res && res.data && res.data.res && res.data.res == "R4") {
                    useMainStore().sn.isLogin = true
                    useMainStore().gtlis = true;
                }
                else {
                    useMainStore().sn.isLogin = false
                    useMainStore().gtlis = false;
                }
                if (err) {
                    useMainStore().mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارسال اطلاعات" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        if (!useMainStore().gtlis) {
                            useMainStore().sn.sn = false;
                        }
                    }, 2000);
                }
                else {
                    if (res && res.data && res.data.res && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت ثبت شد. در حال انتقال به صفحه ارسال پیام به کاربر" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        this.transaction = res.data && res.data.transaction.length > 0 ? res.data.transaction[0] : [];
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                            this.$router.replace(`/sendMessage/${userId}`)
                        }, 2000);
                    }
                    else if (res && res.data && res.data.res && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید. دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارسال اطلاعات" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                }
            })
        },
        showUser(userId) {
            this.$router.push(`/user/${userId}`)
        },
        getTransactionDetails() {
            useMainStore().mps = true;
            useMainStore().mpv = 0;
            PostData_normal("@dm1n/transactiondetails", { tId: this.$route.params.tId }, {
                onUploadProgress: (ProgressEvent) => {
                    useMainStore().mpv = Math.floor((ProgressEvent.loaded * 100) / ProgressEvent.total)
                }
            }, (err, res) => {
                useMainStore().mps = false;
                this.transactionLoading = false;
                this.reasonOfFailBox = false
                if (res && res.data && res.data.res && res.data.res == "R4") {
                    useMainStore().sn.isLogin = true
                    useMainStore().gtlis = true;
                }
                else {
                    useMainStore().sn.isLogin = false
                    useMainStore().gtlis = false;
                }
                if (err) {
                    useMainStore().mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارسال اطلاعات" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        if (!useMainStore().gtlis) {
                            useMainStore().sn.sn = false;
                        }
                    }, 2000);
                }
                else {
                    if (res && res.data && res.data.res && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید. دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else if (res && res.data && res.data.res && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت به روزرسانی گردید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                        this.transaction = res.data.transaction[0];
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارسال اطلاعات" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                }

            })
        }
    }
}
</script>