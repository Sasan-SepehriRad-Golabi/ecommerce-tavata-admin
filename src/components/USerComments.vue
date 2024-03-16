<template>
    <v-col cols="12">
        <v-row class="pa-4 justify-start align-center">
            <v-icon @click="$emit('changeReveal')">mdi-arrow-right</v-icon>
        </v-row>
        <v-row v-if="cpb">
            <v-progress-linear :model-value="cpv"></v-progress-linear>
        </v-row>
        <v-row>
            <v-col cols="12" v-if="!commentsLoaded">
                <div>
                    <v-skeleton-loader loading="false" type="article"></v-skeleton-loader>
                    <v-divider class="my-2"></v-divider>
                </div>
                <div>
                    <v-skeleton-loader type="article"></v-skeleton-loader>
                    <v-divider class="my-2"></v-divider>
                </div>
                <div>
                    <v-skeleton-loader type="article"></v-skeleton-loader>
                    <v-divider class="my-2"></v-divider>
                </div>
                <div>
                    <v-skeleton-loader type="article"></v-skeleton-loader>
                    <v-divider class="my-2"></v-divider>
                </div>
            </v-col>
            <v-col cols="12" class="w-100 h-100" v-else>
                <div v-if="!comments || comments.length == 0" class="w-100 h-100 d-flex justfy-center align-center">
                    <v-alert color="warning" text="پیامی ثبت نشده است">

                    </v-alert>
                </div>
                <v-col cols="12" class="w-100 h-100" v-else>
                    <v-locale-provider rtl>
                        <v-card class="elevation-1 w-100">
                            <v-expansion-panels>
                                <v-expansion-panel v-for="(comment, index) in comments" :key="index">
                                    <v-expansion-panel-title>
                                        <v-list-item>
                                            <v-list-item-title>
                                                <v-icon color="red-lighten-3">mdi-comment</v-icon>
                                                <span class="mx-2">{{ comment.firstName ? comment.firstName : 'ناشناس'
                                                }}</span>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                <span class="mx-2">تاریخ</span>
                                                <span>{{ comment.buyerCommentDateInPersian }}</span>
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        {{ comment.buyerComment }}
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-card>
                    </v-locale-provider>
                </v-col>
            </v-col>
        </v-row>
    </v-col>
</template>
<script>
import { PostData_normal } from '@/services/remotedatamodify';
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            commentsLoaded: false,
            comments: [],
            cpv: 0,
            cpb: false,
            skeleton: [1, 2, 3]
        }
    },
    props: {
        product: Number
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments() {
            this.mps = true;
            PostData_normal("/@dm1n/gpc", { pid: this.product }, {
                onUploadProgress: (progressEvent) => {
                    this.cpv = Math.round((progressEvent.loaded * 100) / progressEvent.total);
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
                    this.commentsLoaded = true;
                    this.mpv = 0;
                    this.mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    this.mpv = 0;
                    this.mps = false;
                    this.commentsLoaded = true;
                    // console.log(this.commentsLoaded)
                    if (res.data && res.data.res == "R4") {
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "error", alT: "توجه", alt: "شما به درستی شناسایی نشدید. دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().sn.sn = false;
                            this.$router.replace("/login/admin$$!")
                        }, 2000);
                    }
                    else if (res.data && res.data.res == "R1") {
                        this.comments = res.data.cms
                        // console.log(this.comments)
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت بروزرسانی گردید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else {
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
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