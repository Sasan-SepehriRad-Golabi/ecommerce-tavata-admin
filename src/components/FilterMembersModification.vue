<template>
    <v-locale-provider rtl>
        <v-dialog v-model="modifyFilterContentsMainContent" scrollable>
            <v-row class="justify-center">
                <v-col cols="12" sm="8" lg="5">
                    <v-card
                        :style="{ 'height': createFilterElementsCardMaxHeight + 'px', 'position': 'relative', 'overflow': 'auto' }">
                        <v-card-text>
                            <v-app-bar style="position:absolute;top:0">
                                <template #prepend>
                                    <v-icon>
                                        mdi-filter-variant-plus
                                    </v-icon>
                                </template>
                                <template #title>
                                    <v-card-subtite style="white-space:normal;">کالاهای زیر مجموعه فیلترانتخاب شده را وارد
                                        نمایید.</v-card-subtite>
                                </template>
                            </v-app-bar>
                            <v-divider style="color:red;" class="mt-4 mb-2"></v-divider>
                            <v-card class="mt-10 mb-4" elevation="2">
                                <v-card-subtitle style="white-space:normal;">نمونه نهایی محصول ساخته شده</v-card-subtitle>
                                <v-card hover elevation="3" class="d-flex-inline ma-5 justify-center">
                                    <div style="position: relative;">
                                        <v-img style="width:100%" height="200"
                                            v-if="filterMemberImagePrev && filterMemberImagePrev.length > 10" cover
                                            :src="filterMemberImagePrev"></v-img>
                                        <v-skeleton-loader @click="chooseImage" v-else type="image">
                                        </v-skeleton-loader>
                                        <div class="rounded-lg bg-red-lighten-3"
                                            style="position:absolute;top:10px;z-index: 10000;width:120px;height:50px">
                                            <v-file-input
                                                style="position: absolute;z-index:2;top: 0px;width:100%;height:100%;opacity: 0;"
                                                class="d-block" prepend-icon="" variant="outlined" id="chooseImage"
                                                v-model="filterMemberImage" accept=".jpg,.jpeg,.png"></v-file-input>
                                            <v-card-text style="position: absolute;z-index:1;top: 0px;">انتخاب
                                                تصویر</v-card-text>
                                        </div>
                                    </div>
                                    <v-card-item>
                                        <v-card-text v-if="filterMemberName.length > 0"
                                            class="text-center text-red-darken-3">{{ filterMemberName
                                            }}</v-card-text>
                                        <v-skeleton-loader v-else type="list-item"></v-skeleton-loader>
                                        <v-card-subtitle v-if="filterMemberDescription.length > 0"
                                            class="text-justify  w-100" style="white-space:normal;">{{
                                                filterMemberDescription }}</v-card-subtitle>
                                        <v-skeleton-loader type="list-item-three-line" v-else></v-skeleton-loader>
                                    </v-card-item>
                                    <v-divider class="bg-red text-red w-75 my-1"></v-divider>
                                    <v-locale-provider ltr>
                                        <div class="d-none d-sm-flex w-100 justify-start align-center">
                                            <v-rating v-model="productRating" color="blue" active-color="orange-lighten-1"
                                                density="comfortable"></v-rating>
                                            <v-spacer></v-spacer>
                                            <div>امتیاز محصول</div>
                                        </div>
                                        <div class="d-block d-sm-none justify-center">
                                            <v-card-subtitle class="text-end">امتیاز محصول</v-card-subtitle>
                                            <v-rating v-model="productRating" color="blue" active-color="orange-lighten-1"
                                                density="comfortable"></v-rating>
                                        </div>
                                    </v-locale-provider>
                                    <v-card-subtitle class="text-red-darken-4">هزینه کالا</v-card-subtitle>
                                    <span class="text-justify font-weight-bold">{{ filterMemberPriceUnit }}</span>
                                    <div v-if="!isDiscounted" class="d-inline-flex flex-column mx-2">
                                        <span class="text-justify font-weight-bold text-red-darken-4">{{
                                            decorateNumber(filterMemberPrice)
                                        }}</span>
                                    </div>
                                    <div v-else class="d-inline-flex flex-column mx-2">
                                        <strike
                                            style="text-decoration-color:red;text-decoration-thickness:1px;text-decoration-style:wavy"
                                            class="text-justify font-weight-bold text-black-darken-4">{{
                                                decorateNumber(filterMemberPrice)
                                            }}</strike>
                                        <span class="text-justify font-weight-bold text-red-darken-4">{{
                                            decorateNumberDiscounted(filterMemberPriceDiscounted)
                                        }}</span>
                                    </div>
                                    <span class="text-justify font-weight-bold">تومان</span>
                                    <v-row v-if="isDiscounted" class="mt-3" dense>
                                        <v-col cols="12">
                                            <v-card-subtitle>زمان تا پایان تخفیف</v-card-subtitle>
                                        </v-col>
                                        <v-col cols="12" class="text-caption text-red-darken-3 font-weight-bold">
                                            {{ days }}روز و {{ hours }} ساعت و {{ minutes }} دقیقه
                                            {{ seconds }} ثانیه
                                        </v-col>
                                    </v-row>
                                </v-card>

                                <v-card-actions>
                                    <v-btn class="bg-green-darken-3" @click="addMemberToFilter">می پسندم</v-btn>
                                    <v-btn class="bg-red"
                                        @click="this.modifyFilterContentsMainContent = false; clearInterval(this.timeHandle);">نمی
                                        پسندم</v-btn>
                                </v-card-actions>
                            </v-card>
                            <div>
                                <v-text-field variant="outlined" v-model="filterMemberName"
                                    placeholder="نام محصول"></v-text-field>
                                <v-textarea @input="changeTextArea" no-resize clearable rows="3" variant="outlined"
                                    v-model="filterMemberDescription" placeholder="توضیحات مختصر در مورد محصول">
                                </v-textarea>
                                <v-card-subtitle class="mt-n4" style="white-space:normal;">تعداد کاراکتر وارد شده {{
                                    numberOfDescriptionLetteres }} از 150 کاراکتر می
                                    باشد</v-card-subtitle>
                                <v-row>
                                    <v-col cols="12">
                                        <v-switch v-model="isDiscounted" label="آیا تخفیف  دارد؟"
                                            :color="!isDiscounted ? 'red' : 'success'">
                                        </v-switch>
                                    </v-col>
                                </v-row>
                                <v-row v-if="!isDiscounted" class="d-none d-md-flex justify-center align-center">
                                    <v-col cols="6">
                                        <v-text-field v-model="filterMemberPriceUnit" persistant-hint
                                            placeholder="واحد قیمت" hint="مثلا: هر کیلو، هر تن و ..."></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="filterMemberPrice" @input="decorateNumber(filterMemberPrice)"
                                            type="number" placeholder="قیمت به تومان" suffix="تومان"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-else class="d-none d-md-flex justify-center align-center">
                                    <v-col cols="4">
                                        <v-text-field v-model="filterMemberPriceUnit" persistant-hint
                                            placeholder="واحد قیمت" hint="مثلا: هر کیلو، هر تن و ..."></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field @input="decorateNumber(filterMemberPrice)" v-model="filterMemberPrice"
                                            placeholder="قیمت قبلی " suffix="تومان"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field @input="decorateNumberDiscounted(filterMemberPriceDiscounted)"
                                            v-model="filterMemberPriceDiscounted" placeholder="قیمت جدید "
                                            suffix="تومان"></v-text-field>
                                    </v-col>
                                    <v-col cols="12"><v-card-subtitle>انتخاب زمان پایان تخفیف</v-card-subtitle></v-col>
                                    <v-col cols="12"><date-picker @click="shwTotalTime()" v-model="endOfDiscountDate" simple
                                            type="datetime"></date-picker></v-col>
                                </v-row>
                                <v-row v-if="!isDiscounted" class="d-flex d-md-none justify-center align-center">
                                    <v-col cols="12">
                                        <v-text-field v-model="filterMemberPriceUnit" persistant-hint
                                            placeholder="واحد قیمت" hint="مثلا: هر کیلو، هر تن و ..."></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field @input="decorateNumber(filterMemberPrice)" v-model="filterMemberPrice"
                                            placeholder="قیمت به تومان" suffix="تومان"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-else class="d-flex d-md-none justify-center align-center">
                                    <v-col cols="12">
                                        <v-text-field v-model="filterMemberPriceUnit" persistant-hint
                                            placeholder="واحد قیمت" hint="مثلا: هر کیلو، هر تن و ..."></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field @input="decorateNumber(filterMemberPrice)" v-model="filterMemberPrice"
                                            placeholder="قیمت قبلی " suffix="تومان"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field @input="decorateNumberDiscounted(filterMemberPriceDiscounted)"
                                            v-model="filterMemberPriceDiscounted" placeholder="قیمت جدید "
                                            suffix="تومان"></v-text-field>
                                    </v-col>
                                    <v-col cols="12"><v-card-subtitle>انتخاب زمان پایان تخفیف</v-card-subtitle></v-col>
                                    <v-col cols="12"><date-picker @click="shwTotalTime()" v-model="endOfDiscountDate" simple
                                            type="datetime"></date-picker></v-col>
                                </v-row>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </v-locale-provider>
    <v-locale-provider rtl>
        <v-col cols="12" :style="{ 'margin-top': aph + 'px' }">
            <v-row class="justify-space-between align-center">
                <v-col cols="11">
                    <v-btn variant="outlined" class="bg-red" @click="openAddMemberToFilter">افزودن عضو</v-btn>
                    <v-btn class="bg-red " @click="removeAllMembers" variant="outlined">حذف همه اعضا</v-btn>
                </v-col>
            </v-row>
            <v-divider color="red" class="my-2"></v-divider>
            <v-row v-if="filterMembersLoading" class="justify-space-evenly">
                <v-col cols="11" sm="5" lg="3" class="elevation-2">
                    <v-skeleton-loader type="card,article,actions"></v-skeleton-loader>
                </v-col>
                <v-col
                    v-if="(this.$vuetify.display.name == 'sm' || this.$vuetify.display.name == 'md' || this.$vuetify.display.name == 'lg' || this.$vuetify.display.name == 'xl' || this.$vuetify.display.name == 'xxl')"
                    cols="11" sm="5" lg="3" class="elevation-2">
                    <v-skeleton-loader type="card,article,actions"></v-skeleton-loader>
                </v-col>
                <v-col
                    v-if="(this.$vuetify.display.name == 'lg' || this.$vuetify.display.name == 'xl' || this.$vuetify.display.name == 'xxl')"
                    cols="11" sm="5" lg="3" class="elevation-2">
                    <v-skeleton-loader type="card,article,actions"></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row v-else-if="filterMembers.length > 0">
                <v-col v-for="(filterMember, index) in filterMembers" :key="index" cols="12" sm="6" lg="4">
                    <v-card v-if="this.$vuetify.display.name != 'xs'" hover elevation="3"
                        class="d-flex-inline ma-5 justify-center" style="height:100%;">
                        <div style="position: relative;">
                            <v-img style="width:100%" height="220"
                                :src="`${baseUrl}${filterMember.filterImageUrl}`"></v-img>
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
                            <strike
                                style="text-decoration-color:red;text-decoration-thickness:1px;text-decoration-style:wavy"
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
                                            <v-rating class="ml-2" v-model="filterMember.filterRating" color="blue"
                                                size="25" active-color="orange-lighten-1"></v-rating>
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
                <v-locale-provider rtl>
                    <v-col cols="11" sm="6" md="4">
                        <v-alert class="text-center" title="توجه" type="warning"
                            text="این فیلتر هنوز عضو تعریف شده ای ندارد">
                        </v-alert>
                    </v-col>
                </v-locale-provider>
            </v-row>
        </v-col>
    </v-locale-provider>
</template>
<script>
import { PostData_normal, PostData_formData, baseURL } from "@/services/remotedatamodify"
import { useMainStore } from "@/store/main"
import USerComments from "./USerComments.vue"
import DatePicker from 'vue3-persian-datetime-picker'
import moment from "moment-jalaali"
export default {
    data() {
        return {
            filterMembersLoading: true,
            orderProductLoading: false,
            modifyFilterContentsMainContent: false,
            filterMembers: [],
            filterMemberName: "",
            filterMemberDescription: "",
            filterMemberPrice: "",
            filterMemberPriceDiscounted: "",
            filterMemberImage: "",
            filterMemberImagePrev: "",
            productRating: 3,
            isDiscounted: false,
            numberOfDescriptionLetteres: "",
            filterMemberPriceUnit: "",
            decoratedPrice: "",
            baseUrl: baseURL,
            revealComments: [],
            endOfDiscountDate: "",
            totalD: "",
            days: "",
            hours: "",
            minutes: "",
            seconds: "",
            timeHandle: "",
            filterMemberTimeHandle: [],
            filterMemberTotalD: []
        }
    },
    computed: {
        aph() {
            return useMainStore().aph;
        },
        pageHeight() {
            return this.$vuetify.display.height;
        },
        createFilterElementsCardMaxHeight: {
            get() {
                // console.log(window.screen.height)
                if (window.screen.height < 450) {
                    return window.screen.height - 50;
                }
                else {
                    return 2 * (window.screen.height / 2 - 50);
                }
            },
            set(value) {
                return value
            }
        }
    },
    watch: {
        endOfDiscountDate(newVal) {
            clearInterval(this.timeHandle);
            if (newVal.length > 0) {
                moment().format('jYYYY/jM/jD');
                let date = newVal.split(" ")[0];
                let time = newVal.split(" ")[1];
                let hour = time.split(":")[0];
                let minute = time.split(":")[1];
                let m = moment(`${date.split("/")[0]}/${date.split("/")[1]}/${date.split("/")[2]} ${hour}:${minute}`, 'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm:ss');
                // console.log(m)
                let d = new Date(m).getTime();
                // let timeInMiliseconds = hour * 60 * 60 * 1000 + minute * 60 * 1000;
                // let totalD = d + timeInMiliseconds;
                this.totalD = d;
                // console.log(`${date.split("/")[0]}/${date.split("/")[1]}/${date.split("/")[2]} ${hour}:${minute}`)
                // console.log(this.totalD)
                this.endOfDiscountDateCountDown(this.totalD);
            }
        },
        pageHeight(newVal) {
            // console.log(newVal)
            if (window.screen.height < 450) {
                this.createFilterElementsCardMaxHeight = window.screen.height - 50

            }
            else {
                let x = window.screen.height / 2;
                // console.log(x)
                this.createFilterElementsCardMaxHeight = 2 * (x - 50);
            }
        },
        filterMemberImage(newval) {
            // console.log(newval)
            if (newval.length > 0) {
                let image = this.filterMemberImage[0];
                this.filterMemberImagePrev = URL.createObjectURL(image);
            }
        },
    },
    components: {
        USerComments, DatePicker
    },
    created() {
        this.getFilterMembers();
    },
    methods: {
        shwTotalTime() {
            // console.log(this.totalD)
        },
        createTimes(totalD, index) {
            // console.log(totalD)
            // console.log(index)
            let tempTotalD = totalD - Date.now();
            this.filterMemberTimeHandle[index] = setInterval(() => {
                tempTotalD = tempTotalD - 1000;
                // console.log(this.filterMemberTimeHandle[index])
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
        caculatetime(totalD) {
            // console.log(totalD)
            if (totalD > 0) {
                // totalD = totalD - Date.now()
                this.days = Math.floor(totalD / (24 * 60 * 60 * 1000));
                let remainedHoursDown = totalD - this.days * (24 * 60 * 60 * 1000);
                this.hours = Math.floor(remainedHoursDown / (60 * 60 * 1000));
                let remainedMinutesDown = remainedHoursDown - (this.hours * 60 * 60 * 1000);
                this.minutes = Math.floor(remainedMinutesDown / (60 * 1000));
                let remainedSecondsDown = remainedMinutesDown - this.minutes * 60 * 1000;
                this.seconds = Math.floor(remainedSecondsDown / 1000);
            }
            else {
                this.days = '-';
                this.minutes = '-';
                this.hours = '-';
                this.seconds = '-';
            }
        },
        endOfDiscountDateCountDown(totalD) {
            let tempTotalD = totalD - new Date().getTime();
            this.timeHandle = setInterval(() => {
                tempTotalD = tempTotalD - 1000;
                if (tempTotalD <= 0) {
                    clearInterval(this.timeHandle);
                }
                else {
                    this.caculatetime(tempTotalD)
                }
            }, 1000);
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
        changeTextArea() {
            this.numberOfDescriptionLetteres = this.filterMemberDescription.length;
            if (this.filterMemberDescription && this.filterMemberDescription.length > 150) {
                this.filterMemberDescription = this.filterMemberDescription.substring(0, 150)
            }
        },
        getFilterMembers() {
            if (this.$route.params.fi) {
                PostData_normal("/@dm1n/gfm", { fi: this.$route.params.fi }, null, (err, res) => {
                    if (res && res.data && res.data.res && res.data.res == "R4") {
                        useMainStore().sn.isLogin = true
                        useMainStore().gtlis = true;
                    }
                    else {
                        useMainStore().sn.isLogin = false
                        useMainStore().gtlis = false;
                    }
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
                        this.filterMembersLoading = false;
                    }
                    else {
                        this.filterMembersLoading = false;
                        if (res.data && res.data.res) {
                            if (res.data.res == "R4") {
                                useMainStore().mpv = 0;
                                useMainStore().mps = false;
                                useMainStore().mol = false;
                                useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی توسط سیستم شناسایی نشدید. لطفا دوباره وارد شوید" }
                                useMainStore().sn.sn = true;
                                useMainStore().sn.snt = 2000
                                setTimeout(() => {
                                    useMainStore().mpv = 0;
                                    useMainStore().sn.sn = false;
                                    this.$router.replace("/login/admin$$!")
                                }, 2000);
                            }
                            else if (res.data.res == "R6") {
                                useMainStore().mpv = 0;
                                useMainStore().mps = false;
                                useMainStore().mol = false;
                                useMainStore().al = { alC: "error", alT: "توجه", alt: "خطا در ارتباط با پایگاه داده" }
                                useMainStore().sn.sn = true;
                                useMainStore().sn.snt = 2000
                                setTimeout(() => {
                                    useMainStore().mpv = 0;
                                    useMainStore().sn.sn = false;
                                }, 2000);
                            }
                            else if (res.data.res == "R1") {
                                this.filterMembers = res.data.fm;
                                // console.log(this.filterMembers)
                                this.revealComments = [];
                                for (let i = 0; i < this.filterMembers.length; i++) {
                                    this.revealComments.push(false)
                                }
                                for (let i = 0; i < this.filterMembers.length; i++) {
                                    this.filterMemberTimeHandle.push(null)
                                }
                                for (let i = 0; i < this.filterMembers.length; i++) {
                                    this.filterMemberTotalD.push({ days: '', hours: '', minutes: '', seconds: '' })
                                }
                                for (let i = 0; i < this.filterMembers.length; i++) {
                                    this.filterMemberTotalD.push(this.createTimes(this.filterMembers[i].timeTofinishDiscount, i))
                                }
                                useMainStore().mpv = 0;
                                useMainStore().mps = false;
                                useMainStore().mol = false;
                                useMainStore().al = { alC: "success", alT: "توجه", alt: "اعضای فیلتر مورد نظر به روزرسانی شدند" }
                                useMainStore().sn.sn = true;
                                useMainStore().sn.snt = 2000
                                setTimeout(() => {
                                    useMainStore().mpv = 0;
                                    useMainStore().sn.sn = false;
                                }, 2000);
                            }
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
            }
            else {
                useMainStore().mpv = 0;
                useMainStore().mps = false;
                useMainStore().mol = false;
                useMainStore().al = { alC: "warning", alT: "توجه", alt: "فیلتر مربوطه شناسایی نشد. لطفا دوباره از صفحه اول وارد شوید" }
                useMainStore().sn.sn = true;
                useMainStore().sn.snt = 2000
                setTimeout(() => {
                    useMainStore().mpv = 0;
                    useMainStore().sn.sn = false;
                }, 2000);
            }
        },
        openAddMemberToFilter() {
            this.modifyFilterContentsMainContent = true;
        },
        removeAllMembers() {
            useMainStore().mps = true;
            PostData_normal("/@dm1n/ram", { fd: this.$route.params.fi }, {
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
                if (err) {
                    clearInterval(this.timeHandle);
                    // console.log(err)
                    useMainStore().mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در انجام عملیات موردنظر" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    clearInterval(this.timeHandle);
                    if (res.data && res.data.res && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت حذف گردید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                        this.getFilterMembers();
                    }
                    else if (res.data && res.data.res && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "سیستم به درستی شما را شناسایی نکرد. دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                            this.$route.replace("/login/admin$$!")
                        }, 2000);

                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در انجام عملیات موردنظر" }
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
        addMemberToFilter() {
            useMainStore().mps = true;
            PostData_formData("/@dm1n/addmembertofilter", {
                fd: this.$route.params.fi, fmi: this.filterMemberImage[0], fmn: this.filterMemberName,
                fmd: this.filterMemberDescription, fmp: this.filterMemberPrice, fmr: this.productRating, fmpu: this.filterMemberPriceUnit,
                fmpd: this.filterMemberPriceDiscounted, fmid: this.isDiscounted, fmded: this.totalD
            }, {
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
                if (err) {
                    clearInterval(this.timeHandle);
                    // console.log(err)
                    useMainStore().mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در انجام عملیات موردنظر" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    clearInterval(this.timeHandle);
                    if (res.data && res.data.res && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات به فیلتر موردنظر اضافه گردید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                        this.getFilterMembers();
                    }
                    else if (res.data && res.data.res && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "سیستم به درستی شما را شناسایی نکرد. دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                            this.$route.replace("/login/admin$$!")
                        }, 2000);

                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در انجام عملیات موردنظر" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                }
            })
        }
    }

}
</script>