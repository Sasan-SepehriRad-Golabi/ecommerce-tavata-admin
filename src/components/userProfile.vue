<template>
    <v-dialog v-model="imageLargeScale" class="d-flex justify-center align-center">
        <v-row>
            <v-col cols="10" offset="1" md="4" offset-md="4" style="height:400px;">
                <v-card class="w-100 h-100">
                    <v-row class="h-75">
                        <img :src="imageLargeScaleSrc" style="width:100%;height:100%;" />
                    </v-row>
                    <v-row style="height:10%;">
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-card-actions>
                                <v-btn variant="outlined" block class="bg-red text-white"
                                    @click="imageLargeScale = !imageLargeScale">بستن</v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-dialog>
    <v-locale-provider rtl>
        <v-card :style="{ 'margin-top': aph + 'px', 'margin-bottom': 112 + 'px' }">
            <v-card-text>
                اطلاعات شخصی شما
            </v-card-text>
            <v-card-text>
                <v-container>
                    <v-row>
                        <!-- ##############################-->
                        <v-col cols="12" sm="12" md="4">
                            <v-text-field disabled v-model="employee.mobileNumber" label="شماره موبایل"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="4">
                            <v-text-field v-model="employee.name" label="نام" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="4">
                            <v-text-field v-model="employee.lastName" label="نام خانوادگی"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="4">
                            <v-select :items="ostans" v-model="employee.ostaneTavallod" label="استان محل سکونت"></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="4">
                            <v-text-field v-model="employee.address" label="آدرس دقیق"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="4">
                            <v-text-field v-model="employee.email" label="ایمیل"></v-text-field>
                        </v-col>
                        <!-- ######################## -->
                        <v-col cols="12" sm="12" md="4">
                            <v-col cols="12" md="12" class="d-flex align-center justify-center">
                                <v-file-input prepend-inner-icon="mdi-camera" accept="image/*" prepend-icon="" chips
                                    show-size v-model="employee.tasvirePersoneli" label="تصویر شما"
                                    placeholder="تصویر "></v-file-input>
                            </v-col>
                            <v-col cols="12" md="10" class="d-flex justify-center align-center">
                                <img @click="showImageLarge(employee.tasvirePersoneliPrev)"
                                    :src="employee.tasvirePersoneliPrev ? employee.tasvirePersoneliPrev : `${processDev ? '../../src/d@assets/images/unknownUser.png' : 'd@assets/images/unknownUser.png'}`"
                                    style="width:100%;height:100%;max-width:100px;max-height:100px;" />
                            </v-col>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions class="d-flex justify-start align-center">
                <v-btn :loading="btnLoading" block variant="outlined" class="bg-red d-flex d-md-none"
                    @click="updatePersonalInfo">
                    <v-icon>mdi-update</v-icon>
                    <span>آپدیت کردن اطلاعات کاربر</span>
                </v-btn>
                <v-btn :loading="btnLoading" variant="outlined" class="bg-red d-none d-md-flex" @click="updatePersonalInfo">
                    <v-icon>mdi-update</v-icon>
                    <span>آپدیت کردن اطلاعات کاربر</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-locale-provider>
</template>
<script>
import { provinces } from "@/services/constantprovider";
import { PostData_normal, PostData_formData, baseURL } from "@/services/remotedatamodify"
import { useMainStore } from "@/store/main";
export default {
    data() {
        return {
            imageLargeScale: false,
            imageLargeScaleSrc: "",
            btnLoading: false,
            ostans: [],
            baseUrl: baseURL,
            employee: {
                name: "",
                lastName: "",
                mobileNumber: "",
                ostaneTavallod: "",
                address: "",
                email: "",
                tasvirePersoneli: "",
                tasvirePersoneliPrev: ""
            },
        }
    },
    computed: {
        aph() {
            return useMainStore().aph
        }
    },
    created() {
        URL.revokeObjectURL(this.employee.tasvirePersoneli[0]);
        this.ostans = provinces.map(province => province.name);
        // console.log(this.$route.params.id)
        this.getUserData(this.$route.params.id);
    },
    watch: {
        'employee.tasvirePersoneli'(newVal) {
            if (newVal && newVal[0] && newVal[0].name && newVal[0].name.length > 0 && newVal[0].size > 0) {
                URL.revokeObjectURL(this.employee.tasvirePersoneli[0]);
                this.employee.tasvirePersoneliPrev = URL.createObjectURL(newVal[0])
            }
            else {
                this.employee.tasvirePersoneliPrev = '@/d@assets/images/unknownUser.png'
            }
        }

    },
    methods: {
        getUserData(userId) {
            PostData_normal("@dm1n/gpi", { userId: userId }, null, (err, res) => {
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
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بازیابی اطلاعات" }
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
                    // console.log(res)
                    if (res.data) {
                        if (res.data.res == "R4") {
                            useMainStore().mps = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید. لطفا دوباره وارد شوید" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                // useMainStore().sn.sn = false;
                                // this.$router.replace("/login")
                            }, 2000);

                        }
                        else if (res.data.res == "R5") {
                            useMainStore().mps = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارسال اطلاعات مشکلی ایجاد شد." }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                if (!useMainStore().gtlis) {
                                    useMainStore().sn.sn = false;
                                }
                            }, 2000);
                        }
                        else if (res.data.res == "R1") {
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
                            let user = res.data.user && res.data.user.length > 0 ? res.data.user[0] : null;
                            this.employee.mobileNumber = user && user.mobileNumber && user.mobileNumber != 'null' ? user.mobileNumber : '';
                            this.employee.name = user && user.firstName && user.firstName != 'null' ? user.firstName : '';
                            this.employee.lastName = user && user.lastName && user.lastName != 'null' ? user.lastName : '';
                            this.employee.ostaneTavallod = user && user.ostaneTavallod && user.ostaneTavallod != 'null' ? user.ostaneTavallod : '';
                            this.employee.address = user && user.address && user.address != 'null' ? user.address : '';
                            this.employee.email = user && user.email && user.email != 'null' ? user.email : '';
                            this.employee.tasvirePersoneliPrev = user && user.profileImage ? `${this.baseUrl}${user.profileImage}` : ``;
                            // console.log(this.employee.tasvirePersoneliPrev)
                        }
                    }
                }
            })
        },
        closeSelectedJob(item) {
            let index = this.selectedJobArray.indexOf(item);
            this.selectedJobArray.splice(index, 1);
            // console.log(this.selectedJobArray);
        },
        openDialog() {
            this.dialog = true;
        },

        showImageLarge(imageSrcValue) {
            this.imageLargeScale = true;
            this.imageLargeScaleSrc = imageSrcValue;
        },
        updatePersonalInfo() {
            URL.revokeObjectURL(this.employee.tasvirePersoneli[0]);
            this.btnLoading = true;
            let fmData = new FormData();
            // console.log(this.employee)


            fmData.append("name", this.employee.name);
            fmData.append("lastName", this.employee.lastName);

            fmData.append("ostaneTavallod", this.employee.ostaneTavallod);
            fmData.append("address", this.employee.address);
            fmData.append("email", this.employee.email);
            fmData.append("id", this.$route.params.id)

            for (let i = 0; i < this.employee.tasvirePersoneli.length; i++) {
                fmData.append("Personeli", this.employee.tasvirePersoneli[i], `tasvire-Personeli.${(this.employee.tasvirePersoneli[i] && this.employee.tasvirePersoneli[i].name) ? this.employee.tasvirePersoneli[i].name.split(".").pop() : "txt"}`);
            }
            useMainStore().mps = true
            PostData_formData("@dm1n/uusi", fmData, {
                onUploadProgress: (progressEvent) => {
                    // console.log(progressEvent)
                    useMainStore().mpv = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            }, (err, res) => {
                useMainStore().mps = false;
                this.btnLoading = false;
                if (err) {
                    useMainStore().mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بازیابی اطلاعات" }
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
                    // console.log(res)
                    if (res.data) {
                        if (res.data.res == "R4") {
                            useMainStore().mps = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی وارد شده اید. لطفا دوباره تلاش نمایید" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                if (!useMainStore().gtlis) {
                                    useMainStore().sn.sn = false;
                                }
                            }, 2000);
                        }
                        else if (res.data.res == "R5") {
                            useMainStore().mps = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "حطا در ارسال اطلاعات" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                if (!useMainStore().gtlis) {
                                    useMainStore().sn.sn = false;
                                }
                            }, 2000);
                        }
                        else if (res.data.res == "R1") {
                            useMainStore().mps = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت آپدیت شد" }
                            useMainStore().sn.sn = true;
                            useMainStore().sn.snt = 2000
                            setTimeout(() => {
                                useMainStore().mpv = 0;
                                if (!useMainStore().gtlis) {
                                    useMainStore().sn.sn = false;
                                }
                            }, 2000);
                            let user = res.data.info && res.data.info.length > 0 ? res.data.info[0] : null;
                            this.employee.mobileNumber = user && user.mobileNumber && user.mobileNumber != 'null' ? user.mobileNumber : '';
                            this.employee.name = user && user.firstName && user.firstName != 'null' ? user.firstName : '';
                            this.employee.lastName = user && user.lastName && user.lastName != 'null' ? user.lastName : '';
                            this.employee.ostaneTavallod = user && user.ostaneTavallod && user.ostaneTavallod != 'null' ? user.ostaneTavallod : '';
                            this.employee.address = user && user.address && user.address != 'null' ? user.address : '';
                            this.employee.email = user && user.email && user.email != 'null' ? user.email : '';
                            this.employee.tasvirePersoneliPrev = user && user.profileImage ? `${this.baseUrl}${user.profileImage}` : ``;
                        }
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بازیابی اطلاعات" }
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
    }
}
</script>
<style>
.v-expansion-panel-text__wrapper {
    max-height: 400px;
    overflow-y: auto
}

.vpd-input-group {
    height: 58px !important;
}

.vpd-input-group>label {
    background-color: lightgrey !important;
}
</style>