<template>
    <v-locale-provider rtl>
        <v-app-bar id="appBar" ref="myAppBar" :style="{ 'height': aph + 'px !important' }" elevation="2"
            density="prominent">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click.stop="changeDrawerCndition"></v-app-bar-nav-icon>
            </template>
            <v-app-bar-title v-if="this.$vuetify.display.name != 'xs'">
                <v-list-item-title class="text-red-darken-3 font-weight-bold"
                    style="letter-spacing: 5px !important;white-space: normal !important;">تاواتا</v-list-item-title>
                <v-list-item-subtitle>
                    <div class="d-flex align-center" style="margin-top:-12px !important;">
                        <span style="margin-top:15px">سالم بمانید</span>
                        <v-img src="@/d@assets/images/palm-tree-animation.gif" class="flex-0-0"
                            style="width:50px;height:50px"></v-img>
                    </div>
                </v-list-item-subtitle>
            </v-app-bar-title>
            <template v-slot:append>
                <v-btn>
                    <v-icon>mdi-web</v-icon>
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item>
                                <v-list-item-subtitle><span>فارسی</span></v-list-item-subtitle>

                            </v-list-item>
                            <v-list-item>
                                <v-list-item-subtitle><span>English</span></v-list-item-subtitle>

                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
                <v-badge color="error" v-if="uln && (urep && urep > 0)" :content="urep" size="xs">
                    <v-btn @click="this.$router.replace('/portfolio')" :disabled="!uln ? true : false"
                        icon="mdi-cart-outline"></v-btn>
                </v-badge>
                <v-btn v-else :disabled="!uln ? true : false" icon="mdi-cart-outline"></v-btn>
                <v-btn id="loginBtn" v-if="uln">
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-avatar color="red">
                                        <v-img
                                            :src="upi && upi.length > 0 ? `${baseUrl}${upi}` : `${processDev ? '../../src/d@assets/images/adminIcon.jpg' : 'd@assets/images/adminIcon.jpg'}`">
                                        </v-img>
                                    </v-avatar>
                                </template>
                                <template #append>
                                    <v-icon color="red">
                                        mdi-arrow-left-circle
                                    </v-icon>
                                </template>
                                <v-list-item-title @click="this.$router.replace('/login/admin$$!')">
                                    <v-card-text>صفحه ورود</v-card-text>
                                </v-list-item-title>
                            </v-list-item>
                            <v-divider class="my-2"></v-divider>
                        </v-list>
                    </v-menu>
                    <div style="display:flex !important;align-items:center !important;">
                        <span>
                            <v-avatar color="red">
                                <v-img
                                    :src="upi && upi.length > 0 ? `${baseUrl}${upi}` : `${processDev ? '../../src/d@assets/images/adminIcon.jpg' : 'd@assets/images/adminIcon.jpg'}`">
                                </v-img>
                            </v-avatar>
                        </span>
                        <span>
                            <v-card-text>خوش آمدید</v-card-text>
                        </span>
                    </div>
                </v-btn>
                <v-btn v-else @click="this.$router.replace('/login')">
                    <div class="loginIconInAppBar" style="display:flex !important;align-items:center !important;"
                        v-if="!uln">
                        <v-icon>
                            mdi-login-variant
                        </v-icon>
                    </div>
                </v-btn>
            </template>
        </v-app-bar>
        <v-bottom-navigation style="position:fixed; bottom:-2px;" v-if="this.$vuetify.display.name == 'xs'" :elevation="3">
            <v-btn value="recent">
                <v-list-item-title class="text-red-darken-3 font-weight-bold w-100"
                    style="letter-spacing: 5px !important;white-space: normal !important;margin-right: -50px;font-weight:bolder !important;">تاواتا</v-list-item-title>
                <v-list-item-subtitle style="margin-top:-20px;">
                    <div class="d-flex align-center">
                        <span style="margin-top: 12px;">سالم بمانید</span>
                        <v-img style="width:50px;height:50px;" src="@/d@assets/images/palm-tree-animation.gif"></v-img>
                    </div>
                </v-list-item-subtitle>
            </v-btn>
        </v-bottom-navigation>
    </v-locale-provider>
</template>
<script>
import { useMainStore } from '@/store/main';
import { baseURL } from "@/services/remotedatamodify"
export default {
    data() {
        return {
            baseUrl: baseURL,
            useMainStoree: useMainStore,
            processDev: process.env.dev
        }
    },
    computed: {
        aph() {
            return useMainStore().aph
        },
        uln() {
            return useMainStore().u.uln;
        },
        urep() {
            return useMainStore().u.rep;
        },

        ubup() {
            return useMainStore().u.bup;
        },
        userName() {
            return useMainStore().u.upn;
        },
        userLastName() {
            return useMainStore().u.upln;
        },
        userProfileImage() {
            return useMainStore().u.upi;
        },
        userUnreadMessages() {
            return useMainStore().u.mu;
        },
        userReadedMessages() {
            return useMainStore().u.mr;
        },
        userIsProfileComplete() {
            return useMainStore().u.uc;
        },
        userBuyedProducsNums() {
            return useMainStore().u.bup;
        },
        upi() {
            console.log(useMainStore().u.upi)
            return useMainStore().u.upi;
        },

    },
    methods: {
        changeDrawerCndition() {
            useMainStore().dwr = !useMainStore().dwr;
        }
    }
}
</script>
<style>
#loginBtn {
    height: auto !important;
}

#appBar {
    display: flex !important;
    align-items: center !important;
}

#appBar .v-toolbar-title.v-app-bar-title {
    align-self: center !important;
}



#appBar .v-list-item-title {
    line-height: 3.5rem !important;
    overflow: visible !important;
    font-size: 35px !important;
}

#appBar .v-toolbar__content {
    height: 100% !important;
}

#appBar .loginIconInAppBar {
    transform: rotateY(180deg);
}

#secondItem .v-list-item__prepend {
    width: 30px !important;
    height: 30px !important;
}
</style>