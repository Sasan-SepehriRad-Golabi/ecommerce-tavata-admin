<template>
    <v-overlay id="mainOverlay" v-model="mol">
        <v-row dense class="justify-center align-center h-screen w-100">
            <div class="d-inline-flex flex-column">
                <img src="@/d@assets/images/loading.gif" width="150px" height="150px" />
                <span class="my-n4 text-red-darken-4 font-weight-bold"><v-card-text
                        :class="['font-weight-bold', checkMobile ? 'text-red' : 'text-white']">در حال دریافت
                        اطلاعات</v-card-text></span>
            </div>
        </v-row>
    </v-overlay>
</template>
<script>
import { useMainStore } from '@/store/main';
import { PostData_normal } from "@/services/remotedatamodify"
export default {
    data() {
        return {

        }
    },
    computed: {
        mol() {
            return useMainStore().mol;
        },
        checkMobile() {
            let name = this.$vuetify.display.name;
            if (name == "xs" || name == "sm") {
                return true;
            }
            else {
                return false;
            }
        }
    },
    created() {
        useMainStore().mol = true;
        this.getUserInfos();
    },
    methods: {
        getUserInfos() {
            PostData_normal("/@dm1n/giin", {}, null, (err, res) => {
                if (res && res.data && res.data.res && res.data.res == "R4") {
                    useMainStore().sn.isLogin = true
                    useMainStore().gtlis = true;
                }
                else {
                    useMainStore().sn.isLogin = false
                    useMainStore().gtlis = false;
                }
                if (err) {
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "error", alT: "توجه", alt: "در دریافت اطلاعات خطایی رخ داد. از اتصال اینترنت خود مطمعن شوید و دوباره تلاش نمایید" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    var result = res.data;
                    useMainStore().mol = false;
                    if (result.res == "R4") {
                        useMainStore().u.uln = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "موفق به شناسایی شما نشدیم. لطفا دوباره وارد سایت شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().sn.sn = false;
                            this.$router.replace("/login/admin$$!")
                        }, 2000);
                    }
                    else if (result.res == "R5") {
                        useMainStore().u.uln = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در دریافت اطلاعات" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else if (result.res == "R1") {
                        useMainStore().u.uln = true;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "خوش آمدید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else {
                        useMainStore().u.uln = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در دریافت اطلاعات" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
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
#mainOverlay .v-overlay__content {
    width: 100% !important;
}
</style>