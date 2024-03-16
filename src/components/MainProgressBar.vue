<template>
    <v-row v-if="mps" id="mainprogressid" dense class="w-100" :style="{ 'height': 10 + 'px', 'top': aph + 'px' }"
        color="darked">
        <v-progress-linear :model-value="mpv"></v-progress-linear>
    </v-row>
</template>
<script>
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {

        }
    },
    computed: {
        aph() {
            return useMainStore().aph
        },
        mpv() {
            return useMainStore().mpv;
        },
        mps() {
            return useMainStore().mps;
        }
    }
}
</script>
<style>
#mainprogressid {
    position: fixed;
    top: 130px;
    z-index: 100001;
}
</style>