<template>
    <div class="w-100 h-100" v-if="!membersToShow || membersToShow.length == 0">
        <v-row>
            <v-col cols="12" md="4" sm="6">
                <v-skeleton-loader class="mx-auto" elevation="2" max-width="360"
                    type="card-avatar, article, actions"></v-skeleton-loader>
            </v-col>
            <v-col class="d-none d-sm-flex " cols="12" md="4" sm="6">
                <v-skeleton-loader class="mx-auto" elevation="2" max-width="360"
                    type="card-avatar, article, actions"></v-skeleton-loader>
            </v-col>
            <v-col class="d-none d-md-flex" cols="12" md="4" sm="6">
                <v-skeleton-loader class="mx-auto" elevation="2" max-width="360"
                    type="card-avatar, article, actions"></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
    <div v-else>
        <v-row v-if="membersToShow">
            <v-col v-for="(filterMember, index) in membersToShow" :key="index" cols="12" sm="6" lg="4">
                <v-card v-if="this.$vuetify.display.name != 'xs'" hover elevation="3"
                    class="d-flex-inline ma-5 justify-center" style="height:100%;">
                    <div style="position: relative;">
                        <v-img style="width:100%" height="220" :src="`${baseUrl}${filterMember.filterImageUrl}`"></v-img>
                    </div>
                    <v-card-item>
                        <v-card-text class="text-center text-red-darken-3">{{
                            filterMember.filterName
                        }}</v-card-text>
                        <div style="max-height:60px;overflow-y:auto;">
                            <v-card-subtitle class="text-justify  w-100" style="white-space:normal;">{{
                                filterMember.filterDescription }}</v-card-subtitle>
                        </div>
                    </v-card-item>
                    <v-divider class="bg-red text-red w-75 my-1"></v-divider>
                    <v-locale-provider ltr>
                        <div class="d-none d-sm-flex w-100 justify-start align-center">
                            <v-rating v-model="filterMember.filterRating" color="blue" active-color="orange-lighten-1"
                                density="comfortable"></v-rating>
                            <v-spacer></v-spacer>
                            <div>امتیاز محصول</div>
                        </div>
                        <div class="d-block d-sm-none justify-center">
                            <v-card-subtitle class="text-end">امتیاز محصول</v-card-subtitle>
                            <v-rating v-model="filterMember.filterRating" color="blue" active-color="orange-lighten-1"
                                density="comfortable"></v-rating>
                        </div>
                    </v-locale-provider>
                    <v-card-subtitle class="text-red-darken-4">هزینه کالا</v-card-subtitle>
                    <span class="font-weight-bold mx-2 text-red-darken-4">
                        {{ filterMember.filterPriceUnit }}</span>
                    <span
                        v-if="!filterMember.isdiscounted || (!filterMemberTotalD[index].seconds && !filterMemberTotalD[index].minutes && !filterMemberTotalD[index].hours && !filterMemberTotalD[index].days)"
                        class="text-justify font-weight-bold mx-2">{{
                            decorateNumber(filterMember.filterPrice)
                        }}</span>
                    <div v-else class="d-inline-flex flex-column mx-2">
                        <strike style="text-decoration-color:red;text-decoration-thickness:1px;text-decoration-style:wavy"
                            class="text-justify font-weight-bold text-black-darken-4">{{
                                decorateNumber(filterMember.filterPrice)
                            }}</strike>
                        <span class="text-justify font-weight-bold text-red-darken-4">{{
                            decorateNumberDiscounted(filterMember.filterpricediscounted)
                        }}</span>
                    </div>
                    <span class="text-justify font-weight-bold">تومان</span>
                    <v-col
                        v-if="filterMember.isdiscounted && (filterMemberTotalD[index].seconds || filterMemberTotalD[index].minutes || filterMemberTotalD[index].hours || filterMemberTotalD[index].days)"
                        cols="12">
                        <v-card-subtitle>زمان تا پایان تخفیف</v-card-subtitle>
                    </v-col>
                    <v-col
                        v-if="filterMember.isdiscounted && (filterMemberTotalD[index].seconds || filterMemberTotalD[index].minutes || filterMemberTotalD[index].hours || filterMemberTotalD[index].days)"
                        cols="12" class="text-caption text-red-darken-3 font-weight-bold">
                        {{ filterMemberTotalD[index].days }}روز و {{
                            filterMemberTotalD[index].hours }} ساعت و {{
        filterMemberTotalD[index].minutes }} دقیقه
                        {{ filterMemberTotalD[index].seconds }} ثانیه
                    </v-col>
                    <v-col cols="12" class="text-left">
                        <v-badge :color="filterMember.NumOfMessages && filterMember.NumOfMessages > 0 ? 'green' : 'red'"
                            :content="filterMember.NumOfMessages">
                            <v-card-subtitle @click="revealComments[index] = true"
                                class="bg-grey-lighten-3 rounded-lg ml-3 pa-2">نظرات
                                کاربران</v-card-subtitle>
                        </v-badge>
                    </v-col>
                    <v-card-actions class="justify-center" style="position:absolute;bottom:0px;width:100%;">
                        <v-col cols="10">
                            <v-btn block :loading="orderProductLoading" class="bg-red w-100"
                                @click="orderProduct(filterMember.filterMemberId)">سفارش
                                کالا</v-btn>
                        </v-col>
                    </v-card-actions>
                    <v-expand-transition>
                        <v-card v-if="revealComments[index]"
                            style="height:100%;position: absolute;bottom: 0;opacity: 1;width: 100%;"
                            class="d-flex flex-column">
                            <div style="height:85%;overflow-y:auto">
                                <USerComments :product="filterMember.filterMemberId"
                                    @change-reveal="revealComments[index] = false" />
                            </div>
                            <v-card-actions style="position:absolute;bottom:0;width: 100%;height: 15%;">
                                <v-btn block class="bg-red" @click="revealComments[index] = false">بستن</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-expand-transition>
                </v-card>
                <v-card class="mb-15" v-else>
                    <v-row class="justify-center">
                        <v-col cols="4">
                            <div style="position: relative;">
                                <v-img style="width:100%" height="220" cover
                                    :src="`${baseUrl}${filterMember.filterImageUrl}`"></v-img>
                            </div>
                        </v-col>
                        <v-col cols="8">
                            <v-row style="height:100px;">
                                <v-col cols="12">
                                    <v-card-item>
                                        <v-card-text class="text-center text-red-darken-3 mt-n5">{{
                                            filterMember.filterName
                                        }}</v-card-text>
                                        <div style="height:55px;margin-top: -15px;">
                                            <v-card-subtitle class="text-justify  w-100"
                                                style="white-space:normal;font-size: 10px;">{{
                                                    filterMember.filterDescription }}</v-card-subtitle>
                                        </div>
                                    </v-card-item>
                                </v-col>
                            </v-row>
                            <v-col cols="12">
                                <v-divider color="error" class="w-75 mb-1"></v-divider>
                            </v-col>
                            <v-row style="min-height:100px">
                                <v-locale-provider ltr>
                                    <div class="d-block w-100">
                                        <v-card-subtitle class="text-end">امتیاز محصول</v-card-subtitle>
                                        <v-rating class="ml-2" v-model="filterMember.filterRating" color="blue" size="25"
                                            active-color="orange-lighten-1"></v-rating>
                                    </div>
                                </v-locale-provider>
                                <v-col cols="12" class="mt-n5">
                                    <v-card-subtitle class="text-red-darken-4">هزینه کالا</v-card-subtitle>
                                </v-col>
                                <v-col cols="12">
                                    <v-row class="justify-center">
                                        <v-col cols="12" class="mt-n5 d-flex justify-center">
                                            <span style="font-size:13px" class=" mx-1 text-red-darken-4">{{
                                                filterMember.filterPriceUnit

                                            }}</span>
                                            <span
                                                v-if="!filterMember.isdiscounted || (!filterMemberTotalD[index].seconds && !filterMemberTotalD[index].minutes && !filterMemberTotalD[index].hours && !filterMemberTotalD[index].days)"
                                                class="text-justify font-weight-bold mx-2">{{
                                                    decorateNumber(filterMember.filterPrice)
                                                }}</span>
                                            <div v-else class="d-inline-flex flex-column mx-2">
                                                <strike
                                                    style="text-decoration-color:red;text-decoration-thickness:1px;text-decoration-style:wavy"
                                                    class="text-justify font-weight-bold text-black-darken-4">{{
                                                        decorateNumber(filterMember.filterPrice)
                                                    }}</strike>
                                                <span class="text-justify font-weight-bold text-red-darken-4">{{
                                                    decorateNumberDiscounted(filterMember.filterpricediscounted)
                                                }}</span>
                                            </div>

                                            <span style="font-size:13px">تومان</span>
                                        </v-col>
                                        <v-col
                                            v-if="filterMember.isdiscounted && (filterMemberTotalD[index].seconds || filterMemberTotalD[index].minutes || filterMemberTotalD[index].hours || filterMemberTotalD[index].days)"
                                            cols="12">
                                            <v-card-subtitle>زمان تا پایان تخفیف</v-card-subtitle>
                                        </v-col>
                                        <v-col
                                            v-if="filterMember.isdiscounted && (filterMemberTotalD[index].seconds || filterMemberTotalD[index].minutes || filterMemberTotalD[index].hours || filterMemberTotalD[index].days)"
                                            cols="12" class="text-caption text-red-darken-3 font-weight-bold">
                                            {{ filterMemberTotalD[index].days }}روز و {{
                                                filterMemberTotalD[index].hours }} ساعت و {{
        filterMemberTotalD[index].minutes }} دقیقه
                                            {{ filterMemberTotalD[index].seconds }} ثانیه
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-col cols="12" class="text-left">
                                <v-badge
                                    :color="filterMember.NumOfMessages && filterMember.NumOfMessages > 0 ? 'green' : 'red'"
                                    :content="filterMember.NumOfMessages">
                                    <v-card-subtitle @click="revealComments[index] = !revealComments[index]"
                                        class="bg-grey-lighten-3 rounded-lg ml-3 pa-2">نظرات
                                        کاربران</v-card-subtitle>
                                </v-badge>
                            </v-col>
                            <v-row class="justify-center">
                                <v-col cols="11">
                                    <v-btn block class="bg-red" :loading="orderProductLoading"
                                        @click="orderProduct(filterMember.filterMemberId)">سفارش
                                        کالا</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-expand-transition>
                        <v-card v-if="revealComments[index]"
                            style="height:100%;position: absolute;bottom: 0;opacity: 1;width: 100%;"
                            class="d-flex flex-column">
                            <div style="height:85%;overflow-y:auto">
                                <USerComments :product="filterMember.filterMemberId"
                                    @change-reveal="revealComments[index] = false" />
                            </div>
                            <v-card-actions style="position:absolute;bottom:0;width: 100%;height: 15%;">
                                <v-btn block class="bg-red" @click="revealComments[index] = false">بستن</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-expand-transition>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else class="justify-center align-center">
            <v-col cols="10">
                <v-alert title="توجه" text="در حال حاضر فیلتر مورد نظر عضو تعریف شده ای ندارد" color="warning"></v-alert>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import USerComments from "./USerComments.vue"
import { baseURL, PostData_normal } from "@/services/remotedatamodify"
import { useMainStore } from "@/store/main"
export default {
    data() {
        return {
            x: true,
            membersToShow: [],
            revealComments: [],
            orderProductLoading: false,
            filterMemberTotalD: [],
            filterMemberTimeHandle: [],
            baseUrl: baseURL,
            useMainStore: useMainStore

        }
    },
    components: {
        USerComments
    },
    props: {
        filtersShortMembers: [],
        defaultSelectedFilter: Number
    },
    created() {
        // console.log(this.filtersShortMembers)
        // console.log(this.defaultSelectedFilter)

        this.membersToShow = this.filtersShortMembers.filter((item, index) => {
            return item.filterCategoryId == this.defaultSelectedFilter;
        })
        this.revealComments = [];
        for (let i = 0; i < this.membersToShow.length; i++) {
            this.revealComments.push(false)
        }
        for (let i = 0; i < this.membersToShow.length; i++) {
            this.filterMemberTotalD.push({ days: '', hours: '', minutes: '', seconds: '' })
        }
        for (let i = 0; i < this.membersToShow.length; i++) {
            this.filterMemberTotalD.push(this.createTimes(this.membersToShow[i].timeTofinishDiscount, i))
        }
    },
    watch: {
        defaultSelectedFilter(newval) {
            // console.log("###############")
            // console.log(newval)
            this.membersToShow = this.filtersShortMembers.filter((item, index) => {
                return item.filterCategoryId == newval;
            })
            // console.log(this.membersToShow)
            this.revealComments = [];
            for (let i = 0; i < this.membersToShow.length; i++) {
                this.revealComments.push(false)
            }
            for (let i = 0; i < this.membersToShow.length; i++) {
                this.filterMemberTotalD.push({ days: '', hours: '', minutes: '', seconds: '' })
            }
            for (let i = 0; i < this.membersToShow.length; i++) {
                this.filterMemberTotalD.push(this.createTimes(this.membersToShow[i].timeTofinishDiscount, i))
            }
            for (let i = 0; i < this.membersToShow.length; i++) {
                this.filterMemberTimeHandle.push(null)
            }
        },
        filtersShortMembers(newval) {
            this.membersToShow = newval.filter((item, index) => {
                return item.filterCategoryId == this.defaultSelectedFilter;
            })
            // console.log(this.membersToShow)
            this.revealComments = [];
            for (let i = 0; i < this.membersToShow.length; i++) {
                this.revealComments.push(false)
            }
            for (let i = 0; i < this.membersToShow.length; i++) {
                this.filterMemberTotalD.push({ days: '', hours: '', minutes: '', seconds: '' })
            }
            for (let i = 0; i < this.membersToShow.length; i++) {
                this.filterMemberTotalD.push(this.createTimes(this.membersToShow[i].timeTofinishDiscount, i))
            }
            for (let i = 0; i < this.membersToShow.length; i++) {

            }
        }
    },
    methods: {
        createTimes(totalD, index) {
            // console.log(totalD)
            // console.log(index)
            let tempTotalD = totalD - Date.now();
            this.filterMemberTimeHandle[index] = setInterval(() => {
                tempTotalD = tempTotalD - 1000;
                if (tempTotalD <= 0) {
                    clearInterval(this.filterMemberTimeHandle[index]);
                }
                else {
                    this.caculateTimeForMembers(tempTotalD, index)
                }
            }, 1000);
        },
        caculateTimeForMembers(totalD, index) {
            if (totalD > 0) {
                let days = Math.floor(totalD / (24 * 60 * 60 * 1000));
                let remainedHoursDown = totalD - days * (24 * 60 * 60 * 1000);
                let hours = Math.floor(remainedHoursDown / (60 * 60 * 1000));
                let remainedMinutesDown = remainedHoursDown - (hours * 60 * 60 * 1000);
                let minutes = Math.floor(remainedMinutesDown / (60 * 1000));
                let remainedSecondsDown = remainedMinutesDown - minutes * 60 * 1000;
                let seconds = Math.floor(remainedSecondsDown / 1000);
                this.filterMemberTotalD[index] = {
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                }
            }
            else {
                this.filterMemberTotalD[index] = {
                    days: '',
                    hours: '',
                    minutes: '',
                    seconds: ''
                }
            }
            // console.log(this.filterMemberTotalD[index])
        },
        orderProduct(productId) {
            this.orderProductLoading = true;
            PostData_normal("/@dm1n/adtt", { pid: productId }, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            }, (err, res) => {
                if (res && res.data && res.data.res && res.data.res == "R4") {
                    useMainStore().sn.isLogin = true
                    useMainStore().gtlis = true;
                }
                else {
                    useMainStore().sn.isLogin = false
                    useMainStore().gtlis = false;
                }
                this.orderProductLoading = false;
                if (err) {
                    useMainStore().mpv = 0;
                    useMainStore().mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    if (res.data && res.data.res && res.data.res == "R4") {
                        useMainStore().mpv = 0;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید. لطفا دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                            this.$router.replace("/login/admin$$!")
                        }, 2000);
                    }
                    else if (res.data && res.data.res && res.data.res == "R1") {
                        useMainStore().mpv = 0;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت ثبت شد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else if (res.data && res.data.res && res.data.res == "R11") {
                        useMainStore().mpv = 0;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "error", alT: "توجه", alt: "برای درخواست کالا باید به عنوان کاربر وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else {
                        useMainStore().mpv = 0;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                }

            })
        },
        decorateNumber(priceString) {
            let decoratedPrice = "";
            // eslint-disable-next-line no-constant-condition
            while (true) {
                if (priceString.length <= 3) {
                    decoratedPrice = priceString + decoratedPrice
                    break;
                }
                else {
                    let y = (priceString.length <= 3) ? priceString : priceString.slice(-3);
                    decoratedPrice = "," + y + decoratedPrice;
                    priceString = priceString.substring(0, priceString.length - 3);
                }
            }
            return decoratedPrice
        },
        decorateNumberDiscounted(priceString) {
            let decoratedPrice = "";
            // eslint-disable-next-line no-constant-condition
            while (true) {
                if (priceString.length <= 3) {
                    decoratedPrice = priceString + decoratedPrice
                    break;
                }
                else {
                    let y = (priceString.length <= 3) ? priceString : priceString.slice(-3);
                    decoratedPrice = "," + y + decoratedPrice;
                    priceString = priceString.substring(0, priceString.length - 3);
                }
            }
            return decoratedPrice
        },
    }
}
</script>