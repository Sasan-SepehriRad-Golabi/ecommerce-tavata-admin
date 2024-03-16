<template>
    <v-dialog v-model="changeFooter" persistent>
        <v-locale-provider rtl>
            <v-row class="justify-center">
                <v-col cols="12" sm="6" lg="4">
                    <v-card style="max-height:400px;overflow-y:auto;">
                        <v-card-subtitle>
                            تغییر اطلاعات
                        </v-card-subtitle>
                        <v-divider class="my-2 w-75 bg-red"></v-divider>
                        <v-card-subtitle>شماره های تماس</v-card-subtitle>
                        <div class="d-flex justify-center">
                            <v-text-field v-model="contactPhones" style="margin:10px 20px;width:80%"></v-text-field>
                        </div>
                        <v-divider class="my-2 w-75 bg-red"></v-divider>
                        <v-card-subtitle>آدرس شرکت</v-card-subtitle>
                        <div class="d-flex justify-center">
                            <v-text-field v-model="address" style="margin:10px 20px;width:80%"></v-text-field>
                        </div>
                        <v-card-subtitle>آدرس اینستاگرام</v-card-subtitle>
                        <div class="d-flex justify-center">
                            <v-text-field v-model="instagramAddress" style="margin:10px 20px;width:80%"></v-text-field>
                        </div>
                        <v-card-subtitle>آدرس توییتر</v-card-subtitle>
                        <div class="d-flex justify-center">
                            <v-text-field v-model="twitterAddress" style="margin:10px 20px;width:80%"></v-text-field>
                        </div>
                        <v-card-subtitle>آدرس لینکدین</v-card-subtitle>
                        <div class="d-flex justify-center">
                            <v-text-field v-model="linkedinAddress" style="margin:10px 20px;width:80%"></v-text-field>
                        </div>
                        <v-card-actions>
                            <v-btn class="bg-red" @click="changeFooter = false">بستن</v-btn>
                            <v-btn class="bg-green" @click="sendFooter()">ارسال اطلاعات</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-locale-provider>
    </v-dialog>
    <v-locale-provider rtl>
        <v-divider class="bg-red w-75"></v-divider>
        <v-row class="justify-center w-100" style="margin:0 !important">
            <v-col cols="12">
                <v-card class="elevation-0  w-100 mt-n5" style="min-height:300px">
                    <v-row style="position: relative;width:100%" class="justify-center">
                        <v-btn @click="changeFooter = true"
                            :style="{ 'position': 'absolute', 'z-index': 1000000, 'top': this.$vuetify.display.name == 'xs' ? '60px' : '10px', 'right': this.$vuetify.display.name != 'xs' ? '40%' : 'unset', 'left': this.$vuetify.display.name == 'xs' ? '10px' : 'unset', }"
                            class="pa-3 bg-red">تغییر مشخصات</v-btn>
                        <v-col cols="12" sm="6">
                            <v-card-title>
                                <v-avatar>
                                    <v-img src="@/d@assets/images/palm-tree-animation.gif"></v-img>
                                </v-avatar>
                                <span class="mx-2 text-red font-weight-bold" style="letter-spacing:8px;">شرکت تاواتا</span>
                            </v-card-title>
                            <v-card-text>
                                <v-list-item>
                                    <v-list-item-title>شماره های تماس</v-list-item-title>
                                    <v-list-item-subtitle class="my-3 mr-5">{{ contactPhones &&
                                        contactPhones.length > 3 ? contactPhones : 'هنوز شماره های تماس وارد نشده اند'
                                    }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-card-text>
                            <v-list-item>
                                <v-list-item-title>آدرس شرکت</v-list-item-title>
                                <v-list-item-subtitle class="my-3 mr-5">{{ address && address.length > 3 ? address :
                                    'هنوز آدرسی وارد نشده است'
                                }} </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>ما را در شبکه های اجتماعی دنبال کنید</v-list-item-title>
                                <v-list-item-subtitle class="my-3 mr-5">
                                    <v-icon class="text-blue-darken-4 mx-2">mdi-twitter</v-icon>
                                    <v-icon class="text-blue-darken-4 mx-2">mdi-instagram</v-icon>
                                    <v-icon class="text-blue-darken-4 mx-2">mdi-linkedin</v-icon>
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3468.6537409499997!2d52.499638875044845!3d29.613750438849266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fb2125b1e85e36f%3A0x6712e8c2b401ad62!2sFars%20Province%2C%20Shiraz%2C%20District%204%2C%20Shaban%2C%20Iran!5e0!3m2!1sen!2s!4v1708652629396!5m2!1sen!2s"
                                height="300" style="border:0;width:100%" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-locale-provider>
</template>
<script>
import { PostData_normal } from "@/services/remotedatamodify";
import { useMainStore } from "@/store/main";
export default {
    data() {
        return {
            changeFooter: false,
            contactPhones: "",
            address: "",
            instagramAddress: "",
            twitterAddress: "",
            linkedinAddress: ""
        }
    },
    created() {
        this.getFooter()
    },
    methods: {
        sendFooter() {
            useMainStore().mps = true
            PostData_normal("@dm1n/sf", {
                contactPhones: this.contactPhones, address: this.address, instagramAddress
                    : this.instagramAddress, twitterAddress: this.twitterAddress, linkedinAddress: this.linkedinAddress
            }, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
                }
            }, (err, res) => {
                useMainStore().mps = false;
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
                    if (res && res.data && res.data.res) {
                        if (res.data.res == "R4") {
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
                        else if (res.data.res == "R1") {
                            useMainStore().mps = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت ارسال شد" }
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
        getFooter() {
            PostData_normal("/@dm1n/getFooter", {}, {}, (err, res) => {
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
                    useMainStore().mpv = 0;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بروز رسانی اطلاعات تماس  " }
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
                        if (res.data.info[0]) {
                            this.contactPhones = res.data.info[0].contactPhones && res.data.info[0].contactPhones.length > 3 ? res.data.info[0].contactPhones : "";
                            this.address = res.data.info[0].address && res.data.info[0].address.length > 3 ? res.data.info[0].address : "";
                            this.instagramAddress = res.data.info[0].instagramAddress && res.data.info[0].instagramAddress.length > 3 ? res.data.info[0].instagramAddress : "";
                            this.twitterAddress = res.data.info[0].twitterAddress && res.data.info[0].twitterAddress.length > 3 ? res.data.info[0].twitterAddress : "";
                            this.linkedinAddress = res.data.info[0].linkedinAddress && res.data.info[0].linkedinAddress.length > 3 ? res.data.info[0].linkedinAddress : "";
                        }
                    }
                    else if (res && res.data && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "سیستم شما را شاسایی نکرد دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            // useMainStore().sn.sn = false;
                            // this.$router.replace("/login")
                        }, 2000);
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بروز رسانی اطلاعات تماس  " }
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
<style></style>