<template>
    <v-row class="justify-center" :style="{ 'margin-top': useMainStore().aph + 'px' }">
        <v-col cols="12" sm="6" lg="4">
            <v-card>
                <v-card-text class="text-center my-3">
                    بروز رسانی کاربران
                </v-card-text>
                <v-divider class="w-75 bg-red my-2"></v-divider>
                <v-card-actions>
                    <v-btn block :loading="updateUsers" @click="update" class="bg-red">بروز رسانی</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import { socket } from "../socket"
import { useMainStore } from "@/store/main"
export default {
    data() {
        return {
            updateUsers: false,
            useMainStore: useMainStore
        }
    },
    methods: {
        update() {
            // console.log("in the admin socket to update users")
            this.updateUsers = true;
            socket.emit("updateUsers");
            setTimeout(() => {
                this.updateUsers = false;
            }, 2000);
        }
    }
}
</script>