<template>
    <v-locale-provider rtl>
        <v-row v-if="!messagesReceived" style="margin:0 !important" class="justify-center align-center w-100 ">
            <v-col cols="12" sm="6" lg="4">
                <v-skeleton-loader type="card,article"></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row :style="{ 'margin-top': useMainStore().aph + 'px', 'margin': 0 }"
            v-else-if="messagesReceived && messages.length > 0" class="justify-center align-center w-100">
            <v-card>
                <v-card-subtitle class="text-red-darken-3">پیام های دریافتی شما</v-card-subtitle>
                <v-expansion-panels id="messagespanel">
                    <v-expansion-panel v-for="(message, index) in messages" :key="index" class="elevation-0">
                        <v-expansion-panel-title>
                            <v-list-item :class="[message.isRead ? 'bg-green' : 'bg-orange', 'rounded-lg', 'w-50']">
                                <v-list-item-title>{{ message.mesSub }}</v-list-item-title>
                                <v-list-item-subtitle>{{ message.dateInPersian }}</v-list-item-subtitle>
                            </v-list-item>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-card>
                                <v-card-text class="text-subtitle2 bg-grey-lighten-3 rounded-lg"
                                    @click="this.$router.replace(`/user/${message.userId}`)">
                                    <span>از طرف کاربر:</span>
                                    <v-avatar class="d-inile-flex">
                                        <v-img
                                            :src="message.profileImage && message.profileImage.length > 0 ? `${baseUrl}${message.profileImage}` : `${processDev ? '../../src/d@assets/images/unknownUser.png' : 'd@assets/images/unknownUser.png'}`"></v-img>
                                    </v-avatar>
                                    <span class="mx-1">{{ message.firstName }}</span>
                                    <span class="mx-1">{{ message.lastName }}</span>
                                    <span
                                        v-if="(!message.firstName || message.firstName.toString().trim() <= 0) && (!message.lastName || message.lastName.toString().trim() <= 0)">ناشناس
                                    </span>
                                </v-card-text>
                                <v-card-text>
                                    {{ message.mesText }}
                                </v-card-text>
                                <v-card-actions class="d-flex justify-center">
                                    <btn block variant="outlined" :disabled="message.isRead" @click="makeRead(message.id)"
                                        class="text-center bg-red pa-4 rounded-lg">
                                        خوانده
                                        شده
                                    </btn>
                                </v-card-actions>
                            </v-card>
                        </v-expansion-panel-text>
                        <v-divider class="bg-red w-75 my-2"></v-divider>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </v-row>
        <v-row v-else class="justify-center align-center w-100">
            <v-col cols="12" sm="6" lg="4">
                <v-card>
                    <v-alert title="توجه">
                        <template #text>
                            <v-card-text class="text-red">پیامی برای نمایش وجود ندارد</v-card-text>
                        </template>
                    </v-alert>
                </v-card>
            </v-col>
        </v-row>
    </v-locale-provider>
</template>
<script>
import { PostData_normal, baseURL } from "@/services/remotedatamodify"
import { useMainStore } from "@/store/main"
export default {
    data() {
        return {
            messagesReceived: false,
            messages: [],
            useMainStore: useMainStore,
            baseUrl: baseURL,
            processDev: process.env.dev
        }
    },
    created() {
        this.getMessages();
        // document.body.style.position = "fixed"
    },
    beforeUnmount() {
        // document.body.style.position = "relative"
    },
    methods: {
        makeRead(messageId) {
            useMainStore().mps = true
            PostData_normal("/@dm1n/mkr", { mId: messageId }, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.floor(progressEvent.loaded * 100 / progressEvent.total)
                }
            }, (err, res) => {
                this.messagesReceived = true
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
                    if (res && res.data && res.data.res == "R1") {
                        this.messages = res.data.messages
                        // console.log(this.messages)
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
        },
        getMessages() {
            useMainStore().mps = true;
            PostData_normal("/@dm1n/getMessages", {}, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.floor(progressEvent.loaded * 100 / progressEvent.total)
                }
            }, (err, res) => {
                useMainStore().mps = false;
                // console.log(res)
                this.messagesReceived = true
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
                        this.messages = res.data.messages
                        // console.log(this.messages)
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
<style>
#messagespanel .v-expansion-panel__shadow {
    display: none;
}
</style>