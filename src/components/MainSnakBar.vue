<template>
    <v-locale-provider rtl>
        <v-snackbar id="msnackBar" v-model="sn">
            <template #text>
                <v-alert id="snackBarAlert" @click:close="closeSanck()" :class="alt && alt.length > 2 ? 'd-flex' : 'd-none'"
                    closable density="compact" :type="alC" :title="alT">
                    <template v-slot:text>
                        <v-card-text>{{ alt }}</v-card-text>
                        <v-card-actions v-if="useMainStore().sn.isLogin">
                            <v-btn variant="outlined" class="bg-red" block @click="goToLogin()">
                                <v-icon>mdi-login</v-icon>
                                <span>ورود به سایت</span>
                            </v-btn>
                        </v-card-actions>
                    </template>

                </v-alert>
            </template>

        </v-snackbar>
    </v-locale-provider>
</template>
<script>
import { useMainStore } from "@/store/main"
export default {
    data() {
        return {
            useMainStore: useMainStore
        }
    },
    computed: {
        alC() {
            return useMainStore().al.alC;
        },
        alT() {
            return useMainStore().al.alT;
        },
        alt() {
            return useMainStore().al.alt
        },
        sn() {
            return useMainStore().sn.sn;
        },
        snt() {
            return useMainStore().sn.snt
        }
    },
    methods: {
        closeSanck() {
            useMainStore().sn.isLogin = false
            useMainStore().gtlis = false;
            useMainStore().sn.sn = false;
        },
        goToLogin() {
            useMainStore().sn.isLogin = false
            useMainStore().gtlis = false;
            useMainStore().sn.sn = false;
            this.$router.replace("/login/admin$$!")
        }
    }
}
</script>
<style>
#msnackBar .v-snackbar__content {
    padding: 0px !important;
}

#snackBarAlert {
    display: flex !important;
    justify-content: space-between;
}
</style>