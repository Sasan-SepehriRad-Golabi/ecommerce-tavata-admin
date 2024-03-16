<template>
    <v-locale-provider rtl>
        <v-row v-if="!isRequestReceived" :style="{ 'margin-top': useMainStore().aph + 'px' }"
            class="justify-center w-100 align-center">
            <v-skeleton-loader type="card,article"></v-skeleton-loader>
            <v-skeleton-loader v-if="this.$vuetify.display.name.value != 'xs'" type="card,article"></v-skeleton-loader>
            <v-skeleton-loader v-if="this.$vuetify.display.name.value != 'xs' && this.$vuetify.display.name.value != 'sm'"
                type="card,article"></v-skeleton-loader>
        </v-row>
        <v-row v-else :style="{
            'margin-top': useMainStore().aph + 'px', 'flex': '0 1 auto !important'
        }" class="pb-15 align-start">
            <v-col cols="12">
                <v-col style="max-height: 100px;" cols="12" sm="6" lg="4">
                    <v-card-text class="text-red text-center font-weight-bold">درخواست ها</v-card-text>
                </v-col>
            </v-col>
            <v-col cols="12" class="w-100 mt-n4">
                <v-tabs v-model="tab" bg-color="primary">
                    <v-tab value="allRequests">همه درخواست ها</v-tab>
                    <v-tab value="activeRequests">درخواست های فعال</v-tab>
                </v-tabs>
            </v-col>
            <v-window v-model="tab" class="w-100">
                <v-window-item value="allRequests" class="w-100">
                    <v-row class="w-100">
                        <v-col cols="12" sm="6" lg="4" v-for="(request, index) in Requests" :key="index">
                            <v-card
                                :class="[request.totalStatus == 41 || request.totalStatus == 51 || request.totalStatus == 6 ? 'bg-orange-darken-2' : request.totalStatus == 4 || request.totalStatus == 5 ? 'bg-orange-lighten-2' :
                                    request.totalStatus == 1 ? 'bg-info-lighten-3' : request.totalStatus == 411 ||
                                        request.totalStatus == 421 || request.totalStatus == 511 ||
                                        request.totalStatus == 521 || request.totalStatus == 61 ? 'bg-green-lighten-2' :
                                        request.totalStatus == 412 || request.totalStatus == 422 || request.totalStatus == 512 ||
                                            request.totalStatus == 522 || request.totalStatus == 62 ? 'bg-red-lighten-2' : 'bg-red-lighten-3']">
                                <v-card-text>
                                    <span class="mx-2">شماره درخواست :</span>
                                    <span class="textcenter text-red font-weight-bold d-inline-flex"> {{
                                        request.transactionId
                                    }}</span>
                                </v-card-text>
                                <v-card-text>
                                    <span class="mx-2">وضعیت درخواست :</span>
                                    <span class="textcenter text-red font-weight-bold d-inline-flex">
                                        {{
                                            request.totalStatus == 1
                                            ? ' رزرو شده'
                                            : request.totalStatus == 2 ? 'کنسل شده در مرحله رزرو توسط کاربر'
                                                : request.totalStatus == 3 ? 'کنسل شده در مرحله رزرو به دلیل تمام شدن مهلت'
                                                    : request.totalStatus == 4 ? 'در مرحله خرید توسط زرین پال-وجهی پرداخت نشده است'
                                                        : request.totalStatus == 41 ? 'خرید از زرین پال-تاییدیه پرداخت وجه از زرین پال دارد'
                                                            : request.totalStatus == 401 ? `خرید از زرین پال-وجهی از طریق زرین پال پرداخت نشده-
                                        تایید
                                        ادمین`
                                                                : request.totalStatus == 402 ? `خرید از زرین پال-وجهی از طریق زرین پال پرداخت نشده-
                                        عدم
                                        تایید ادمین`
                                                                    : request.totalStatus == 411 ? `خرید از زرین پال-تاییدیه پرداخت وجه از زرین پال
                                        دارد-تاییدیه ادمین را هم دارد`
                                                                        : request.totalStatus == 412 ? `خرید از زرین پال-تاییدیه پرداخت وجه از زرین پال
                                        دارد- ادمین تایید نکرد`
                                                                            : request.totalStatus == 42 ? `خرید از زرین پال- عدم تایید پرداخت وجه از زرین پال `
                                                                                : request.totalStatus == 422 ? `خرید از زرین پال- عدم تایید پرداخت وجه از زرین پال
                                        -عدم تایید ادمین`
                                                                                    : request.totalStatus == 421 ? `خرید از زرین پال- عدم تایید پرداخت وجه از زرین پال -
                                        ادمین تایید کرد`
                                                                                        : request.totalStatus == 5 ? 'در مرحله خرید توسط درگاه بانکی- وجهی پرداخت نشده'
                                                                                            : request.totalStatus == 51 ? 'خرید از درگاه بانکی - تایید پرداخت از درگاه'
                                                                                                : request.totalStatus == 501 ? `خرید از درگاه بانکی-وجهی از طریق درگاه پرداخت نشده-
                                        تایید
                                        ادمین`
                                                                                                    : request.totalStatus == 502 ? `خرید از زرین پال-وجهی از طریق درگاه پرداخت نشده-
                                        عدم
                                        تایید ادمین`
                                                                                                        : request.totalStatus == 511 ? `خرید از درگاه بانکی - تایید پرداخت از درگاه-ادمین
                                        تایید کرد-`
                                                                                                            : request.totalStatus == 512 ? `خرید از درگاه بانکی - تایید پرداخت از درگاه-عدم
                                        تایید ادمین-`
                                                                                                                : request.totalStatus == 52 ? `خرید از درگاه بانکی - عدم تایید درگاه`
                                                                                                                    : request.totalStatus == 521 ? `خرید از درگاه بانکی - عدم تایید درگاه- ادمین تایید
                                        کرد`
                                                                                                                        : request.totalStatus == 522 ? `خرید از درگاه بانکی - عدم تایید درگاه- ادمین تایید
                                        نکرد`
                                                                                                                            : request.totalStatus == 6 ? 'در مرحله خرید به صورت دستی توسط ادمین'
                                                                                                                                : request.totalStatus == 61 ? 'خرید به صورت دستی - تایید شده توسط ادمین'
                                                                                                                                    : request.totalStatus == 62 ? 'خرید توسط ادمین به صورت دستی - رد شده توسط ادمین' :
                                                                                                                                        `نا
                                        مشخص`

                                        }} </span>
                                </v-card-text>
                                <v-card-text>
                                    <span>تاریخ رزرو</span>
                                    <span class="mx-3 text-red font-weight-bold">{{ request.dateOfReserveInPersian }}</span>
                                </v-card-text>
                                <v-card-text>
                                    <span>تاریخ خرید</span>
                                    <span class="mx-3 text-red font-weight-bold">{{ request.dateOfBuyInPersian &&
                                        request.dateOfBuyInPersian.length > 3 ? request.dateOfBuyInPersian : 'ندارد'
                                    }}</span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn class="bg-red-lighten-3 pa-2" block
                                        @click="showTransaction(request.transactionId)">مشاهده</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-window-item>
                <v-window-item value="activeRequests" class="w-100">
                    <v-row class="w-100">
                        <v-col cols="12" sm="6" lg="4" v-for="(request, index) in activeRequests" :key="index">
                            <v-card
                                :class="[request.totalStatus == 1 || request.totalStatus == 4 || request.totalStatus == 5 || request.totalStatus == 6 ? 'bg-warning' : request.totalStatus == 41 || request.totalStatus == 51 || request.totalStatus == 61 ? 'bg-green' : 'bg-grey']">
                                <v-card-text>
                                    <span class="mx-2">شماره درخواست :</span>
                                    <span class="textcenter text-red font-weight-bold d-inline-flex"> {{
                                        request.transactionId
                                    }}</span>
                                </v-card-text>
                                <v-card-text>
                                    <span class="mx-2">وضعیت درخواست :</span>
                                    <span class="textcenter text-red font-weight-bold d-inline-flex">
                                        {{
                                            request.totalStatus == 1
                                            ? ' رزرو شده'
                                            : request.totalStatus == 2 ? 'کنسل شده در مرحله رزرو توسط کاربر'
                                                : request.totalStatus == 3 ? 'کنسل شده در مرحله رزرو به دلیل تمام شدن مهلت'
                                                    : request.totalStatus == 4 ? 'در مرحله خرید توسط زرین پال-وجهی پرداخت نشده است'
                                                        : request.totalStatus == 41 ? 'خرید از زرین پال-تاییدیه پرداخت وجه از زرین پال دارد'
                                                            : request.totalStatus == 401 ? `خرید از زرین پال-وجهی از طریق زرین پال پرداخت نشده-
                                        تایید
                                        ادمین`
                                                                : request.totalStatus == 402 ? `خرید از زرین پال-وجهی از طریق زرین پال پرداخت نشده-
                                        عدم
                                        تایید ادمین`
                                                                    : request.totalStatus == 411 ? `خرید از زرین پال-تاییدیه پرداخت وجه از زرین پال
                                        دارد-تاییدیه ادمین را هم دارد`
                                                                        : request.totalStatus == 412 ? `خرید از زرین پال-تاییدیه پرداخت وجه از زرین پال
                                        دارد- ادمین تایید نکرد`
                                                                            : request.totalStatus == 42 ? `خرید از زرین پال- عدم تایید پرداخت وجه از زرین پال `
                                                                                : request.totalStatus == 422 ? `خرید از زرین پال- عدم تایید پرداخت وجه از زرین پال
                                        -عدم تایید ادمین`
                                                                                    : request.totalStatus == 421 ? `خرید از زرین پال- عدم تایید پرداخت وجه از زرین پال -
                                        ادمین تایید کرد`
                                                                                        : request.totalStatus == 5 ? 'در مرحله خرید توسط درگاه بانکی- وجهی پرداخت نشده'
                                                                                            : request.totalStatus == 51 ? 'خرید از درگاه بانکی - تایید پرداخت از درگاه'
                                                                                                : request.totalStatus == 501 ? `خرید از درگاه بانکی-وجهی از طریق درگاه پرداخت نشده-
                                        تایید
                                        ادمین`
                                                                                                    : request.totalStatus == 502 ? `خرید از زرین پال-وجهی از طریق درگاه پرداخت نشده-
                                        عدم
                                        تایید ادمین`
                                                                                                        : request.totalStatus == 511 ? `خرید از درگاه بانکی - تایید پرداخت از درگاه-ادمین
                                        تایید کرد-`
                                                                                                            : request.totalStatus == 512 ? `خرید از درگاه بانکی - تایید پرداخت از درگاه-عدم
                                        تایید ادمین-`
                                                                                                                : request.totalStatus == 52 ? `خرید از درگاه بانکی - عدم تایید درگاه`
                                                                                                                    : request.totalStatus == 521 ? `خرید از درگاه بانکی - عدم تایید درگاه- ادمین تایید
                                        کرد`
                                                                                                                        : request.totalStatus == 522 ? `خرید از درگاه بانکی - عدم تایید درگاه- ادمین تایید
                                        نکرد`
                                                                                                                            : request.totalStatus == 6 ? 'در مرحله خرید به صورت دستی توسط ادمین'
                                                                                                                                : request.totalStatus == 61 ? 'خرید به صورت دستی - تایید شده توسط ادمین'
                                                                                                                                    : request.totalStatus == 62 ? 'خرید توسط ادمین به صورت دستی - رد شده توسط ادمین'
                                                                                                                                        : `نا مشخص`
                                        }} </span>
                                </v-card-text>
                                <v-card-text>
                                    <span>تاریخ رزرو</span>
                                    <span class="mx-3 text-red font-weight-bold">{{ request.dateOfReserveInPersian }}</span>
                                </v-card-text>
                                <v-card-text>
                                    <span>تاریخ خرید</span>
                                    <span class="mx-3 text-red font-weight-bold">{{ request.dateOfBuyInPersian &&
                                        request.dateOfBuyInPersian.length > 3 ? request.dateOfBuyInPersian : 'ندارد'
                                    }}</span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn class="bg-red-lighten-3 pa-2" block
                                        @click="showTransaction(request.transactionId)">مشاهده</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-window-item>
            </v-window>
        </v-row>
    </v-locale-provider>
</template>
<script>
import { PostData_normal } from '@/services/remotedatamodify';
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            Requests: [],
            activeRequests: [],
            isRequestReceived: false,
            useMainStore: useMainStore,
            RequestConditions: [],
            tab: "allRequests"
        }
    },
    mounted() {
        this.getRequests();
    },
    methods: {
        showTransaction(transactionId) {
            this.$router.push(`/transactionPage/${transactionId}`)
        },
        getRequests() {
            useMainStore().mps = true;
            PostData_normal("/@dm1n/requests", {}, {
                onUploadProgress: (ProgressEvent) => {
                    useMainStore().mpv = Math.floor(ProgressEvent.loaded * 100 / ProgressEvent.total);
                }
            }, (err, res) => {
                useMainStore().mps = false;
                this.isRequestReceived = true;
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
                    if (res && res.data && res.data.res == "R1") {
                        this.Requests = res.data.requests.requests;
                        this.activeRequests = this.Requests.filter((item, index) => {
                            return item.totalStatus == 1 || item.totalStatus == 4 || item.totalStatus == 41 || item.totalStatus == 42 ||
                                item.totalStatus == 5 || item.totalStatus == 51 || item.totalStatus == 52 || item.totalStatus == 6
                        })
                        this.RequestConditions = res.data.requests.requestConditions
                        // console.log(this.Requests)
                        // console.log(this.activeRequests)
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت به روز رسانی شد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else if (res && res.data && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "شما در سیستم شناسایی نشدید. دوباره وارد شوید" }
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
        }
    }
}

</script>