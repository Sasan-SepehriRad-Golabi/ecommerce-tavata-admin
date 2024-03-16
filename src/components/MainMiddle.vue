<template>
    <v-loacle-provider rtl>
        <v-dialog id="modifyFilterContentsFirstOptions" v-model="modifyFilterContentsFirstOptions">
            <v-row class="justify-center align-center">
                <v-col cols="12" sm="6" lg="4">
                    <v-card class="w-100">
                        <v-card-actions class="justify-space-evenly">
                            <v-btn class="bg-red" variant="outlined" @click="modifyMemmbersOfFilter(selectedFilterId)">تغییر
                                اعضا</v-btn>
                            <v-btn class="bg-red" variant="outlined" @click="deleteMemmbersOfFilter(selectedFilterId)">حذف
                                این فیلتر</v-btn>
                            <v-btn class="bg-red" variant="outlined" @click="setAsDefault(selectedFilterId)">فیلتر
                                پیشفرض</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </v-loacle-provider>
    <v-locale-provider rtl>
        <v-dialog transition="dialog-top-transition" v-model="addFilterDialog">
            <v-card id="selectIconCard"
                :class="['mx-auto', displayName == 'xs' || displayName == 'sm' ? 'w-100' : displayName == 'md' || displayName == 'lg' ? 'w-75' : 'w-50']">
                <v-card-text class="pa-0">
                    <v-col cols="12">
                        <v-app-bar color="primary" style="top: 0 !important;">
                            <template #title>
                                <v-card-subtitle style="white-space:normal !important;">نام فیلتر و یک آیکون از بین آیکون
                                    های
                                    زیر را انتخاب
                                    نمایید</v-card-subtitle>
                            </template>
                        </v-app-bar>
                        <v-row class="justify-center align-center w-100 mt-12 mx-0">
                            <v-col cols="12">
                                <v-card-subtite>فیلتر ساخته شده</v-card-subtite>
                                <v-divider class="my-1"></v-divider>
                                <v-card elevation="4" class="w-100 px-2 py-3 d-flex mt-5" style="min-height:60px">
                                    <v-avatar v-show="isSelectedImagesIsLoaded">
                                        <v-img @load="selectedImagesIsLoaded" :src="`${baseUrl}${selectedIconUrl}`"></v-img>
                                    </v-avatar>
                                    <span class="mx-1">{{ selectedFilterName }}</span>
                                    <v-spacer></v-spacer>
                                    <v-icon @click="clearSelectionBox"
                                        v-if="selectedFilterName.length > 0 || isSelectedImagesIsLoaded">mdi-close-circle</v-icon>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="justify-center align-center my-2">
                            <v-col cols="12">
                                <v-text-field placeholder="نام دسته محصولات برای فیلتر"
                                    v-model="selectedFilterName"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="my-n8">
                                <v-card-subtite class="text-caption my-n3 w-100"
                                    style="white-space: normal !important; font-family:myfont !important;">یک آیکون
                                    انتخاب
                                    کنید یا گزینه پیش فرض را انتخاب
                                    کنید</v-card-subtite>
                                <v-card class="w-100 bg-grey-lighten-3 pa-2" style="min-height:200px !important;">
                                    <v-row>
                                        <v-col v-for="(iconUrl, index) in filterIconUrls" :key="index" cols="3" sm="2"
                                            md="1">
                                            <v-avatar @click="selectIcon(index)"
                                                :size="this.$vuetify.display.name == 'xs' ? 40 : this.$vuetify.display.name == 'sm' ? 50 : this.$vuetify.display.name == 'md' ? '60' : '70'"
                                                style="border:2px solid red;">
                                                <v-img :src="`${baseUrl}${iconUrl}`">

                                                </v-img>
                                            </v-avatar>
                                        </v-col>
                                    </v-row>
                                    <v-card-actions class="justify-end" style="margin-top:200px ;">
                                        <v-btn class="bg-red rounded-circle" style="width:50px; height:50px;">
                                            <v-icon style="font-size:30px !important">
                                                mdi-refresh
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                                <v-divider class="my-2"></v-divider>
                                <v-card-subtitle class="text-justify" style="white-space:normal !important;">یک فایل آیکون
                                    بسازید و از قسمت زیر
                                    آن را انتخاب نمایید تا وارد سیستم شود. سپس در قسمت بالا رفرش را بزنید تا آیکون ظاهر شود.
                                    حال می توانید آن را انتخاب نمایید.</v-card-subtitle>
                                <v-col cols="12">
                                    <v-file-input v-model="uploadIconInput" multiple chips clearable prepend-icon=""
                                        accept=".jpg,.jpeg,.png"
                                        prepend-inner-icon="mdi-emoticon-cool-outline"></v-file-input>
                                </v-col>
                                <v-col cols="12" sm="6" lg="4">
                                    <v-btn :loading="iconsUploading" @click="uploadIcon" type="submit"
                                        class="bg-red text-white font-weight-bold w-100">
                                        <v-icon>mdi-upload-box-outline</v-icon>
                                        <span>آپلود آیکون</span>
                                    </v-btn>
                                </v-col>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="outlined" class="bg-red" @click="addFilterDialog = false">بستن</v-btn>
                    <v-btn variant="outlined" :loading="iconsApplying" class="bg-green" @click="applyFilter">اعمال
                        فیلتر</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-locale-provider>
    <v-locale-provider rtl>
        <v-row dense style="flex: none !important;display: flex;"
            class="my-3 justify-center align-center w-100 bg-gray-lighten-3">
            <v-col>
                <v-btn variant="outlined" @click="addFilterDialog = true">
                    <v-icon color="red">
                        mdi-plus-box
                    </v-icon>
                    <span>افزودن فیلتر</span>
                </v-btn>
            </v-col>
            <v-col cols="12">
                <v-card :loading="filterLoading" elevation="0">
                    <v-slide-group v-if="filterLoading" class="mt-2">
                        <v-slide-group-item>
                            <v-skeleton-loader class="mx-auto" elevation="2" type="button"
                                style="min-width:120px;display:flex;justify-content:center">

                            </v-skeleton-loader>
                        </v-slide-group-item>
                        <v-slide-group-item>
                            <v-skeleton-loader class="mx-auto" elevation="2" type="button"
                                style="min-width:120px;display:flex;justify-content:center">

                            </v-skeleton-loader>
                        </v-slide-group-item>
                        <v-slide-group-item>
                            <v-skeleton-loader class="mx-auto" elevation="2" type="button"
                                style="min-width:120px;display:flex;justify-content:center">

                            </v-skeleton-loader>
                        </v-slide-group-item>
                        <v-slide-group-item>
                            <v-skeleton-loader class="mx-auto" elevation="2" type="button"
                                style="min-width:120px;display:flex;justify-content:center">

                            </v-skeleton-loader>
                        </v-slide-group-item>

                    </v-slide-group>
                    <v-slide-group v-else id="slide-group" show-arrows center-active>
                        <v-slide-group-item v-for="(filter, index) in filters" :key="index" value="specialOffers">
                            <v-btn @click="getOffers(filter.filterCategoryId)"
                                :class="['rounded-0', 'my-3', 'mx-2', 'rounded-lg', filter.filterCategoryId == defaultSelectedFilter ? 'elevation-5' : 'elevation-0']"
                                :style="{ 'min-height': '60px', 'background-color': filter.filterCategoryId == defaultSelectedFilter ? 'green' : 'white' }">
                                <v-avatar style="border:2px solid red;">
                                    <v-img :src="`${baseUrl}${filter.iconUrl}`">

                                    </v-img>
                                </v-avatar>
                                <span end>{{ filter.filterName }}</span>
                            </v-btn>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-card>
            </v-col>
        </v-row>
        <v-divider class="bg-red-darken-3 my-1 my-sm-3"></v-divider>
        <v-row dense class="align-center px-2">
            <v-col cols="12">
                <v-card :loading="shortVersionLoading" class="w-100 my-1 pa-3 d-flex justify-start" elevation="1">
                    <v-col>
                        <v-row dense>
                            <v-col cols="12">
                                <v-btn variant="text" style="position: relative;"
                                    @click="modifyMemmbersOfFilter(defaultSelectedFilter)"
                                    class="ml-n4 bg-red d-inline-flex align-center float-left rounded-xl ">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                    <span style="margin-top: -5px;">بیشتر</span>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row class="mb-4">
                            <v-col cols="12">
                                <FilterShortVersionsPlacement :filtersShortMembers="filtersShortMembers"
                                    :defaultSelectedFilter="defaultSelectedFilter" />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
        <v-divider class="bg-red-darken-3 my-1 my-sm-3"></v-divider>
    </v-locale-provider>
</template>
<script>
import FilterShortVersionsPlacement from './FilterShortVersionsPlacement.vue'
import { PostData_normal, PostData_formData, baseURL } from '@/services/remotedatamodify'
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            mdAndUp: false,
            mdAndDown: false,
            defaultSelectedFilter: "",
            shortVersionLoading: true,
            addFilterDialog: false,
            filterIconUrls: [],
            filterIconIds: [],
            iconsUploading: false,
            iconsApplying: false,
            uploadIconInput: "",
            selectedFilterName: "",
            selectedIconId: "",
            selectedIconUrl: "",
            baseUrl: baseURL,
            isSelectedImagesIsLoaded: false,
            filters: [],
            filtersShortMembers: [],
            filterLoading: true,
            modifyFilterContentsFirstOptions: false,
            modifyFilterContentsMainContent: false,
            selectedFilterId: ""
        }
    },
    components: {
        FilterShortVersionsPlacement
    },
    computed: {
        displayName() {
            return this.$vuetify.display.name
        },
        pageHeight() {
            return this.$vuetify.display.height;
        },
        createFilterElementsCardMaxHeight() {
            if (document.body.clientHeight < 450) {
                return document.body.clientHeight - 50

            }
            else {
                return 2 * (document.body.clientHeight / 2 - 50);
            }
        }
    },
    created() {
        let newval = this.displayName
        switch (newval) {
            case 'xs':
                this.mdAndDown = true;
                this.mdAndUp = false;
                break;
            case 'sm':
            case 'md':
            case 'lg':
            case "xl":
            case 'xxl':
                this.mdAndUp = true;
                this.mdAndDown = false;

        }
        // console.log(this.filterMemberImagePrev)
        this.getFilterIconUrls();
        this.getFilters();
        this.getFilterShortMembers();
    },
    watch: {
        pageHeight(newVal) {
            // console.log(newVal)
            if (document.body.clientHeight < 450) {
                return document.body.clientHeight - 50

            }
            else {
                let x = document.body.clientHeight / 2;
                // console.log(x)
                return 2 * (x - 50);
            }
        },
        filterMemberImage(newval) {
            // console.log(newval)
            if (newval.length > 0) {
                let image = this.filterMemberImage[0];
                this.filterMemberImagePrev = URL.createObjectURL(image);
            }
        },
        displayName(newval) {
            // console.log(newval)
            switch (newval) {
                case 'xs':
                    this.mdAndDown = true;
                    this.mdAndUp = false;
                    break;
                case 'sm':
                case 'md':
                case 'lg':
                case "xl":
                case 'xxl':
                    this.mdAndUp = true;
                    this.mdAndDown = false;

            }
        }
    },
    methods: {
        getFilterShortMembers() {
            useMainStore().mps = true;
            useMainStore().mpv = 0;
            PostData_normal("/@dm1n/gsfm", {}, {
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
                useMainStore().mpv = 0;
                useMainStore().mps = false
                this.shortVersionLoading = false;
                if (err) {

                }
                else {
                    if (res.data.res && res.data.res == "R1") {
                        this.filtersShortMembers = res.data.fm
                        // console.log(this.filtersShortMembers)
                    }
                }
            })
        },
        getFilters() {
            PostData_normal("/@dm1n/filters", {}, null, (err, res) => {
                this.filterLoading = false;
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
                    this.iconsApplying = false;
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
                    if (res.data && res.data.res == "R5") {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
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
                    else if (res.data && res.data.res == "R6") {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "فیلتر پیدا نشد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else if (res.data && res.data.res == "R1") {
                        let filters = res.data.filters;
                        this.filters = filters;
                        for (let i = 0; i < this.filters.length; i++) {
                            if (this.filters[i].isDefault) {
                                this.defaultSelectedFilter = this.filters[i].filterCategoryId;
                                break;
                            }
                        }
                        // console.log(this.filters)
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "فیلترها با موفقیت آپدیت شدند" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
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
        applyFilter() {
            this.iconsApplying = true;
            useMainStore().mps = true;
            useMainStore().mpv = 0;
            PostData_normal("/@dm1n/applyfilter", { sfn: this.selectedFilterName, sfi: this.selectedIconId }, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
                // eslint-disable-next-line no-unused-vars
            }, (err, res) => {
                this.filterLoading = false;
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
                    this.iconsApplying = false;
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
                    if (res.data.res && res.data.res == "R1") {
                        this.getFilters();
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت ثبت شد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
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
        selectedImagesIsLoaded() {
            // console.log("image icon is loaded")
            this.isSelectedImagesIsLoaded = true;
        },
        uploadIcon() {
            this.iconsUploading = true;
            useMainStore().mps = true;
            useMainStore().mpv = 0;
            let fmData = new FormData();
            for (let i = 0; i < this.uploadIconInput.length; i++) {
                // console.log(this.uploadIconInput[i])
                fmData.append("newIcon", this.uploadIconInput[i]);
            }
            PostData_formData("/@dm1n/iconsUpload", fmData, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            }, (err, res) => {
                if (err) {
                    this.iconsUploading = false;
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
                    useMainStore().mps = false;
                    if (res.data.res) {
                        let result = res.data.res;
                        if (result == "R4") {
                            this.iconsUploading = false;
                            useMainStore().u.uln = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی توسط سیستم شناسایی نشدید. لطفا دوباره وارد شوید" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                useMainStore().sn.sn = false;
                                useMainStore().u.uln = false;
                                this.$router.replace("/login")
                            }, 2000);
                        }
                        else if (result == "R5") {
                            this.iconsUploading = false;
                            useMainStore().u.uln = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در تبدیل تصاویر" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                useMainStore().sn.sn = false;
                            }, 2000);
                        }
                        else if (result == "R6") {
                            this.iconsUploading = false;
                            useMainStore().u.uln = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "آیکونی برای ذخیره انتخاب نشده است" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                useMainStore().sn.sn = false;
                            }, 2000);
                        }
                        else if (result == "withError") {
                            this.iconsUploading = false;
                            useMainStore().u.uln = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط باپایگاه داده خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                useMainStore().sn.sn = false;
                            }, 2000);
                        }
                        else if (result == "ok") {
                            this.iconsUploading = false;
                            useMainStore().u.uln = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "success", alT: "توجه", alt: "فایل ها با موفقیت آپلود شد" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                useMainStore().sn.sn = false;
                            }, 2000);
                            this.getFilterIconUrls();
                        }
                        else {
                            this.iconsUploading = false;
                            useMainStore().u.uln = false;
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
                }

            })
            // console.log("testtt submit")
        },
        getFilterIconUrls() {
            PostData_normal("/@dm1n/icons", {}, null, (err, res) => {
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
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در دانلود آیکون ها خطایی رخ داده است." }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    if (res.data && res.data.length > 0) {
                        if (res.data && res.data[0] && res.data[0].res == "ok") {
                            this.filterIconUrls = res.data[1].map((icon) => {
                                return icon.iv;
                            })
                            this.filterIconIds = res.data[1].map((icon) => {
                                return icon.in;
                            })
                            // console.log(this.filterIconUrls);
                            useMainStore().mps = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "success", alT: "توجه", alt: "آیکون ها با موفقیت دانلود شدند" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                useMainStore().sn.sn = false;
                            }, 2000);
                        }
                        else {
                            useMainStore().mps = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "آیکون ها به درستی دانلود نشدند" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                useMainStore().sn.sn = false;
                            }, 2000);
                        }
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "آیکون ها به درستی دانلود نشدند" }
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
        selectIcon(index) {
            this.selectedIconUrl = this.filterIconUrls[index];
            this.selectedIconId = this.filterIconIds[index];
            this.isSelectedImagesIsLoaded = true;
            // console.log(this.selectedIconUrl)
        },
        clearSelectionBox() {
            this.selectedFilterName = "";
            this.selectedIconUrl = "";
            this.isSelectedImagesIsLoaded = false;
        },
        getOffers(filterCategoryId) {
            // console.log(filterCategoryId)
            this.modifyFilterContentsFirstOptions = true;
            this.defaultSelectedFilter = filterCategoryId;
            this.selectedFilterId = filterCategoryId;
        },
        setAsDefault(filterCategoryId) {
            useMainStore().ups = true;
            PostData_normal("/@dm1n/sDf", { fid: filterCategoryId }, {
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
                    if (res.data && res.data.res == "R4") {
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
                    else if (res.data && res.data.res == "R1") {
                        useMainStore().mpv = 0;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت ثبت گردید." }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                            this.$router.replace("/")
                        }, 2000);
                    }
                    else {
                        useMainStore().mpv = 0;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید. لطفا دوباره وارد شوید" }
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
        modifyMemmbersOfFilter(selectedFilterId) {
            // console.log(selectedFilterId)
            this.$router.replace(`/iltermembers/${this.defaultSelectedFilter}`)
        },
        deleteMemmbersOfFilter(selectedFilterID) {
            useMainStore().mps = true;
            PostData_normal("/@dm1n/rf", { id: selectedFilterID }, {
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
                    if (res.data.res == "R4") {
                        useMainStore().mpv = 0;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی  نشدید. لطفا دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else if (res.data.res == "R5") {
                        useMainStore().mpv = 0;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارتباط با سرور" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else if (res.data.res == "R1") {
                        useMainStore().mpv = 0;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت به روزرسانی شد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                        this.getFilters();
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

    }
}
</script>
<style>
#slide-group button {
    padding: 25px;
    display: flex;
    font-size: 15px;
}

@media screen and (min-width:600px) {
    .selectionbtn {
        font-weight: bold !important;
    }
}

#modifyFilterContentsFirstOptions .v-overlay__scrim {}



.selectionbtn1 {
    background-color: red !important;
}
</style>