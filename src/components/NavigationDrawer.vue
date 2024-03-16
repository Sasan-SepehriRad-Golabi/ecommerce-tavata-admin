<template>
    <v-locale-provider rtl>
        <v-navigation-drawer :style="{ 'top': useMainStore().aph + 'px !important' }" v-model="useMainStore().dwr"
            temporary>
            <v-list-item class="my-5" v-if="u.uln"
                :prepend-avatar="u.upi ? `${baseUrl}${u.upi}` : '@/d@assets/images/unknownUser.png'"
                :title="(u.upn && u.upln) ? `${u.upn} ${u.upln}` : (u.upn && !u.upln) ? `${u.upn}  کاربر` : (!u.upn && u.upln) ? `${u.upln}  کاربر` : 'کاربر ناشناس'"></v-list-item>
            <v-list-item class="my-5" v-else prepend-avatar="@/d@assets/images/unknownUser.png"
                title="شما وارد نشده اید"></v-list-item>
            <v-divider></v-divider>

            <v-list lines="3" nav>
                <v-list-item class="my-5 font-weight-bold" @click="this.$router.replace('/')"
                    prepend-icon="mdi-view-dashboard" title="خانه" value="home"></v-list-item>
                <v-list-item class="my-5 font-weight-bold" :disabled="!u.uln ? true : false"
                    @click="this.$router.replace('/messages')" prepend-icon="mdi-message-bulleted" title="پیام های کاربران"
                    value="userMessages"></v-list-item>
                <v-list-item class="my-5 font-weight-bold" :disabled="!u.uln ? true : false"
                    @click="this.$router.replace('/sendMessage/0')" prepend-icon="mdi-message-bulleted"
                    title="ارسال پیام به کاربران" value="userMessages"></v-list-item>
                <v-list-item class="my-5 font-weight-bold " @click="this.$router.replace('/users')"
                    :disabled="!u.uln ? true : false" prepend-icon="mdi-order-bool-descending" title="کاربران"
                    value="userOrders"></v-list-item>
                <v-list-item class="my-5 font-weight-bold " @click="this.$router.replace('/UserUpdates')"
                    :disabled="!u.uln ? true : false" prepend-icon="mdi-order-bool-descending" title="به روز رسانی کاربران"
                    value="userOrders"></v-list-item>
                <v-list-item class="my-5 font-weight-bold " prepend-icon="mdi-information-outline"
                    :disabled="!u.uln ? true : false" @click="this.$router.replace('/requests')" title="درخواست ها و خریدها"
                    value="aboutUs"></v-list-item>
                <v-list-item class="my-5 font-weight-bold " prepend-icon="mdi-information-outline" title="درباره ما"
                    :disabled="!u.uln ? true : false" value="aboutUs"></v-list-item>
                <v-list-item class="my-5 font-weight-bold " :disabled="!u.uln ? true : false" prepend-icon="mdi-exit-to-app"
                    title="خروج" value="exit"></v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-locale-provider>
</template>
<script>
import { mapState } from 'pinia'
import { useMainStore } from "@/store/main"
import { baseURL, PostData_normal } from "@/services/remotedatamodify"
export default {
    data() {
        return {
            group: null,
            baseUrl: baseURL,
            useMainStore: useMainStore
        }
    },
    mounted() {
        // setTimeout(() => {

        //     this.$refs["myNav3333"].$el.addEventListener("click", () => {
        //         useMainStore().dwr = !useMainStore().dwr;
        //     })
        // }, 100);
    },
    computed: {
        ...mapState(useMainStore, ['u'])
    },
    methods: {
        exit() {
            PostData_normal("@dm1n/exit", {}, null, (err, res) => {
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
                        if (!useMainStore().gtlis) {
                            useMainStore().sn.sn = false;
                        }
                    }, 2000);
                }
                else {
                    if (res.data.res == "R1") {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().u.uln = false;
                        useMainStore().u.upn = "";
                        useMainStore().u.upln = "";
                        useMainStore().u.upi = "";
                        useMainStore().u.bup = 0;
                        useMainStore().u.mr = 0;
                        useMainStore().u.mu = 0;
                        useMainStore().u.rep = 0;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "شما با موفقیت خارج شدید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else if (res.data.res == "R4") {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما توسط سیستم شناسایی نشدید" }
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
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
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
<style scoped></style>