<template>
    <MainCarousel :images="carouselImages" :defaultCarouselImages="defaultCarouselImages" :middleHint1="middleHint1"
        :middleHint2="middleHint2" :middleHint3="middleHint3" :middleHintImage="middleHintImage"
        :middleMainBox="middleMainBox" :blurAmount="blurAmount" style="margin-top:-4px !important; position: relative;">
    </MainCarousel>
    <MainMiddle />
    <MainFooter />
</template>
<script>
import MainCarousel from "@/components/MainCarousel.vue"
import MainMiddle from "@/components/MainMiddle.vue"
import { PostData_normal } from "@/services/remotedatamodify"
import { useMainStore } from "@/store/main"
import MainFooter from "@/components/siteFooter.vue"
import { defaultCarouselImages } from "../costumConfig"

export default {
    data() {
        return {
            carouselImages: [],
            isLoading: false,
            isDeleteLoading: false,
            blurAmount: [],
            middleMainBox: [],
            middleHint1: [],
            middleHint2: [],
            middleHint3: [],
            middleHintImage: [],
            defaultCarouselImages: defaultCarouselImages,
        }
    },
    components: {
        MainCarousel, MainMiddle, MainFooter
    },
    created() {
        this.getCarouselImages();
    },
    methods: {

        getCarouselImages() {
            PostData_normal("/@dm1n/gcim", {}, null, (err, res) => {
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
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بروز رسانی تصاویر اسلاید" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    if (res.data && res.data.res && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "سیستم شما را شاسایی نکرد دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            // useMainStore().sn.sn = false;
                            // this.$router.replace("/login/admin$$!")
                        }, 2000);
                    }
                    else if (res.data && res.data.res && res.data.res == "R1") {
                        this.carouselImages = res.data.images;
                        // eslint-disable-next-line no-unused-vars
                        this.middleHint1 = this.carouselImages.map((item, index) => {
                            try {
                                return JSON.parse(item.middleHint1)
                            }
                            catch (err) {
                                return { text: '', color: "#ffffffff", fontSize: 12, positionX: 0, positionY: 0, opacity: 1 }
                            }
                        })
                        // eslint-disable-next-line no-unused-vars
                        this.middleHint2 = this.carouselImages.map((item, index) => {
                            try {
                                return JSON.parse(item.middleHint2)
                            }
                            catch (err) {
                                return { text: '', color: "#ffffffff", fontSize: 12, positionX: 0, positionY: 0, opacity: 1 }
                            }
                        })
                        // eslint-disable-next-line no-unused-vars
                        this.middleHint3 = this.carouselImages.map((item, index) => {
                            try {
                                return JSON.parse(item.middleHint3)
                            }
                            catch (err) {
                                return { text: '', color: "#ffffffff", fontSize: 12, positionX: 0, positionY: 0, opacity: 1 }
                            }
                        })
                        // eslint-disable-next-line no-unused-vars
                        this.middleMainBox = this.carouselImages.map((item, index) => {
                            try {
                                return JSON.parse(item.middleMainBox)
                            }
                            catch (err) {
                                return {
                                    width: .7,
                                    height: .6,
                                    opacity: .5,
                                    positionX: .1,
                                    positionY: .1,
                                    borderRadius: 10
                                }
                            }
                        })
                        // console.log(this.middleMainBox)
                        this.middleHintImage = [];
                        // eslint-disable-next-line no-unused-vars
                        this.middleHintImage = this.carouselImages.map((item, index) => {
                            try {
                                return JSON.parse(item.middleMainImage)
                            }
                            catch (err) {
                                return {
                                    url: "",
                                    width: 10,
                                    height: 10,
                                    opacity: 1,
                                    positionX: 0,
                                    positionY: 0,
                                    borderRadius: 10
                                }
                            }
                        })
                        this.blurAmount = [];
                        for (let i = 0; i < this.carouselImages.length; i++) {
                            this.blurAmount.push(0);
                        }
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "تصاویر اسلاید به روزرسانی شدند" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بروز رسانی تصاویر اسلاید" }
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