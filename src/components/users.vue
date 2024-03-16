<template>
    <v-locale-provider rtl>
        <v-row v-if="usersLoaded" class="w-100"
            :style="{ 'margin': '0 !important', 'margin-top': useMainStore().aph + 'px !important' }">

            <v-col cols="12" sm="6" lg="4" v-for="(user, index) in users" :key="index" style="height:150px;">
                <v-card class="h-100">
                    <v-card-text>
                        <v-list-item>
                            <v-list-item-title>
                                {{ user.firstName }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="mx-3 my-2">
                                {{ user.mobileNumber }}
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center" style="position: absolute;bottom:0;width:100%">
                        <v-btn class="bg-red" @click="showUser(user.id)">
                            تغییر مشخصات
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>


        </v-row>
        <v-row v-else class="w-100 h-screen align-center justify-center"
            :style="{ 'margin': '0 !important', 'margin-top': useMainStore().aph + 'px !important' }">
            <v-col>
                <v-skeleton-loader type="card,article"></v-skeleton-loader>
            </v-col>
            <v-col v-if="this.$vuetify.display.name != 'xs'">
                <v-skeleton-loader type="card,article"></v-skeleton-loader>
            </v-col>
            <v-col v-if="this.$vuetify.display.name != 'xs' && this.$vuetify.display.name != 'sm'">
                <v-skeleton-loader type="card,article"></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-locale-provider>
</template>
<script>
import { PostData_normal } from '@/services/remotedatamodify';
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            users: [],
            usersLoaded: false,
            useMainStore: useMainStore
        }
    },
    created() {
        this.getUsers();
    },
    methods: {
        showUser(userId) {
            this.$router.replace(`/user/${userId}`)
        },
        getUsers() {
            useMainStore().mps = true;
            useMainStore().mpv = 0;
            PostData_normal("@dm1n/users", {}, {
                onUploadProgress: (ProgressEvent) => {
                    useMainStore().mpv = Math.floor(ProgressEvent.loaded * 100 / ProgressEvent.total);
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
                    useMainStore().mps = false;
                    useMainStore().mpv = 0;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بروز رسانی کاربران" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    this.usersLoaded = true;
                    if (res && res.data && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید. لطفا دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            // useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else if (res && res.data && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت به روزرسانی شد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                        // console.log(res)
                        this.users = res.data.users;
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بروز رسانی کاربران" }
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