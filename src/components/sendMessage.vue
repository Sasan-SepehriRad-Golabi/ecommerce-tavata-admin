<template>
    <v-row class="justify-center align-center pb-16" :style="{ 'margin-top': useMainStore().aph + 'px' }">
        <v-col cols="12" sm="6" lg="4">
            <v-locale-provider rtl>
                <v-card>
                    <v-row class="mx-3">
                        <v-col cols="12" sm="6">
                            <v-card-text>بر اساس شماره کاربری کاربر</v-card-text>
                            <v-text-field type="number" variant="outlined">{{ searchedId }}</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6"
                            :style="{ 'margin-top': this.$vuetify.display.name == 'xs' ? '-40px' : '' }">
                            <v-card-text>بر اساس نام کاربر</v-card-text>
                            <v-text-field @input="setUsers" v-model="searchedName">
                                <v-menu activator="parent">
                                    <v-card>
                                        <v-list>
                                            <v-list-item @click="selectUser(item.id)" v-for="(item, index) in filteredUsers"
                                                :key="index">
                                                {{ item.firstName }} {{ item.lastName }}
                                            </v-list-item>
                                        </v-list>
                                    </v-card>
                                </v-menu>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card class="elevation-2 rounded-lg text-center">
                    <template #prepend-icon>
                        <v-icon>mdi-message-bulleted</v-icon>
                    </template>
                    <template #title>
                        <span class="text-red-darken-3 text-subtitle2">ارسال پیام به کاربر</span>
                    </template>
                    <template #text>
                        <v-text-field v-model="mesSub" class="w-100 mb-3" type="outlined" hint="موضوع پیام"
                            persistent-hint></v-text-field>
                        <v-textarea v-model="mesText" rows="5" no-resize prepend-inner-icon="mdi-comment"></v-textarea>
                    </template>
                    <v-card-actions>
                        <v-btn block :loading="btnLoading" @click="sendMessage" class="bg-red">ارسال پیام</v-btn>
                    </v-card-actions>
                </v-card>
            </v-locale-provider>
        </v-col>
    </v-row>
</template>
<script>
import { useMainStore } from "@/store/main"
import { PostData_normal } from "@/services/remotedatamodify"
export default {
    data() {
        return {
            useMainStore: useMainStore,
            mesSub: "",
            mesText: "",
            btnLoading: false,
            users: [],
            filteredUsers: [],
            searchedItem: "",
            originalUsers: [],
            searchedName: "",
            searchedId: "",
            seacheMenu: false,
            reservedIds: []
        }
    },
    created() {
        this.getUsers()
    },
    methods: {
        setUsers() {
            this.getFilteredUsers();
        },
        selectUser(indexx) {
            this.searchedId = indexx;
            let selectedItem = this.originalUsers.find((item, index) => { return item.id == indexx });
            this.searchedName = selectedItem ? selectedItem.firstName + " " + selectedItem.lastName : "";
        },
        getFilteredUsers() {
            let regEx = new RegExp(this.searchedName);
            this.filteredUsers = this.originalUsers;
            let searchedName = this.searchedName.trim() ? this.searchedName.trim().length : this.searchedName.length;
            if (searchedName == 0) {
                this.filteredUsers = this.originalUsers;
            }
            else {
                this.filteredUsers = this.originalUsers.filter((item, index) => {
                    return regEx.test(item.firstName) || regEx.test(item.lastName)
                })
            }
            this.reservedIds = this.filteredUsers.map((item, index) => {
                return item.id
            });
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
                        this.originalUsers = res.data.users;
                        this.filteredUsers = this.originalUsers;
                        if (this.$route.params.id) {
                            this.searchedId = this.$route.params.id;
                            this.filteredUsers = this.filteredUsers.filter((item, index) => {
                                return item.id == this.$route.params.id;
                            })
                            if (this.filteredUsers.length == 1) {
                                this.searchedName = this.filteredUsers[0].firstName + " " + this.filteredUsers[0].lastName
                            }
                        }
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
        },
        sendMessage() {
            useMainStore().mps = true;
            this.btnLoading = true;
            PostData_normal("@dm1n/sendMessageToUser", { mesSub: this.mesSub, mesText: this.mesText, uId: this.searchedId }, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.floor(progressEvent.loaded * 100 / progressEvent.total)
                }
            }, (err, res) => {
                this.btnLoading = false;
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
                    else if (res && res.data && res.data.res == "R4") {
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
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارسال اطلاعات" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false
                            }
                        }, 2000);
                    }
                }
            })
        }
    }
}
</script>