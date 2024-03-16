<template>
    <v-locale-provider rtl>
        <v-row class="justify-center align-center w-100 h-screen">
            <v-col cols="11" sm="6" lg="4">
                <v-card class="w-100 h-100" elevation="2">
                    <v-card-title class="text-center">
                        <v-icon>mdi-cloud-key-outline</v-icon>
                        <span>ورود ادمین</span>
                        <v-card-text v-if="logged" class="text-green-darken-3">شما قبلا وارد شده اید</v-card-text>
                    </v-card-title>
                    <v-card-text>
                        <v-form :disabled="logged" class="w-100" @submit.prevent="adminLogin">
                            <v-col cols="12">
                                <v-text-field v-model="userName" variant="outlined" hint="نام کاربری خود را وارد نمایید"
                                    placeholder="نام کاربری" prepend="">
                                    <template #prepend-inner>
                                        <v-icon>
                                            mdi-account
                                        </v-icon>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="password" v-model="password" variant="outlined"
                                    hint="پسورد خود را وارد نمایید" placeholder="پسورد" prepend="">
                                    <template #prepend-inner>
                                        <v-icon>
                                            mdi-account
                                        </v-icon>
                                    </template>
                                </v-text-field>
                                <v-col cols="12">
                                    <v-card-actions class="d-none d-md-flex justify-end">
                                        <v-btn :disabled="logged" class="bg-red text-white font-weight-bold w-50">
                                            <v-icon>mdi-login-variant</v-icon>
                                            <span>ورود</span>
                                        </v-btn>
                                    </v-card-actions>
                                    <v-card-actions class="d-flex d-md-none justify-end">
                                        <v-btn :disabled="logged" :loading="adlgld" type="submit"
                                            class="bg-red text-white font-weight-bold w-100">
                                            <v-icon>mdi-login-variant</v-icon>
                                            <span>ورود</span>
                                        </v-btn>
                                    </v-card-actions>
                                </v-col>
                            </v-col>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-locale-provider>
</template>
<script>
import { PostData_normal } from "../services/remotedatamodify"
import { useMainStore } from "../store/main"
export default {
    data() {
        return {
            userName: "",
            password: "",
            adlgld: false
        }
    },
    computed: {
        logged() {
            return useMainStore().u.uln;
        }
    },
    methods: {
        adminLogin() {
            this.adlgld = true;
            if (!this.userName.length > 0 || !this.password.length > 0) {
                this.adlgld = false;
                useMainStore().mps = false;
                useMainStore().u.uln = false;
                useMainStore().mol = false;
                useMainStore().al = { alC: "error", alT: "توجه", alt: "نام کاربری و رمز عبور باید وارد شوند" }
                useMainStore().sn.sn = true;
                useMainStore().sn.snt = 2000
                setTimeout(() => {
                    useMainStore().mpv = 0;
                    useMainStore().sn.sn = false;
                }, 2000);
            }
            PostData_normal("/@dm1n/login", { adu: this.userName, adp: this.password }, null, (err, res) => {
                if (err) {
                    this.adlgld = false;
                    useMainStore().mps = false;
                    useMainStore().u.uln = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "error", alT: "توجه", alt: "ارتباط با سرور دچار خطا شد" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    this.adlgld = false;
                    let result = res.data.res;
                    if (result == "R4") {
                        useMainStore().mps = false;
                        useMainStore().u.uln = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "error", alT: "توجه", alt: "شما به درستی به عنوان ادمین شناسایی نشدید. لطفا مجددا وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else if (result == "R1") {
                        useMainStore().mps = false;
                        useMainStore().u.uln = true;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "خوش آمدید..." }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().u.uln = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "در انجام فرآیند مورد نظر خطایی رخ داد" }
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