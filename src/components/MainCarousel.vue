<template>
    <v-locale-provider rtl>
        <v-dialog v-model="carouselImagesDialog">
            <v-row>
                <v-col cols="12" sm="7" lg="5">
                    <v-card class="ma-2 elevation-2" hover
                        :style="{ 'height': pageHeight < 450 ? '320px' : '', 'overflow': pageHeight > 450 ? 'hidden' : 'auto' }">
                        <v-card-item>
                            <v-col cols="12" :style="{ 'position': 'relative', 'height': '300px' }" class="w-100"
                                id="carouselImageSelection">
                                <v-carousel v-if="selectedCarsouselImageUrls.length > 0" style="height: 200px;">
                                    <v-carousel-item v-for="(  carouselImageUrl, index  ) in   selectedCarsouselImageUrls  "
                                        :key="index">
                                        <v-img :src="carouselImageUrl"></v-img>
                                    </v-carousel-item>
                                </v-carousel>
                                <v-skeleton-loader v-else type="image" class="w-100"
                                    style="height:200px"></v-skeleton-loader>
                                <div style="background-color:red;border-radius:10px;
                                position:absolute;z-index:12000;top:10px;right:10px;width: 120px;height:60px">
                                    <v-card-subtitle style="position:absolute;z-index:8;top:20px;right:15px">انتخاب
                                        تصاویر</v-card-subtitle>
                                    <v-file-input prepend-icon="" multiple accept=".jpg,.jpeg,.png"
                                        v-model="selectedcarouselImages"
                                        style="opacity:0;position: absolute;top: 0;right: 0;width: 120px;height: 60px !important;display:inline-block;z-index: 10;"
                                        class="w-100 h-100"></v-file-input>
                                </div>
                            </v-col>
                        </v-card-item>
                        <v-card-item style="margin-top:-80px;">
                            <v-card-text>پس از انتخاب تصاویر آنها در باکس بالا نشان داده می شوند. برای اعمال تغییرات
                                بیشتر
                                بر روی تصاویر آپلود شده دکمه زیر را بزنید</v-card-text>

                        </v-card-item>
                        <v-card-item>
                            <v-col cols="12">
                                <v-card-actions>
                                    <v-btn class="bg-red" :loading="regcil" block @click="registerCarouselImages"
                                        variant="outlined">ثبت
                                        تصاویر و تغییرات
                                        بر
                                        روی
                                        تصاویر</v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </v-locale-provider>
    <v-row dense style="flex: none !important;position: relative;" class="align-center justify-center">
        <v-col cols="12">
            <v-locale-provider rtl>
                <v-col cols="6" sm="4"
                    :style="{ 'position': 'absolute', 'top': (aph - 5) + 'px', 'z-index': 10, 'right': 0 }">
                    <v-btn @click="carouselImagesDialog = true" class="bg-red w-100"
                        :style="{ 'min-height': this.$vuetify.display.name == 'xs' ? '0px' : '60px' }">
                        <span>تغییر تصاویر</span>
                    </v-btn>
                </v-col>
                <v-carousel id="mainCarousel" cycle :style="{ 'margin-top': aph + 'px', 'height': imageHeight + 'px' }">
                    <div v-if="images && images.length > 0">
                        <v-carousel-item v-for="(  image, index  ) in   images  " :key="index" class="mainCarouselItem">
                            <v-img gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                :style="{ 'height': imageHeight + 'px', 'filter': `blur(${blurAmount[index]}px)`, 'object-fit': 'cover' }"
                                :src="`${baseUrl}${image.imageUrl}`">
                            </v-img>
                            <v-row class="ma-0 justify-center align-center w-100 h-100 carsoule-image-card">
                                <v-col cols="8" md="5">
                                    <v-card :style="{
                                        'position': 'absolute', 'top': 100 * middleMainBox[index].positionY + '%', 'left': 100 * middleMainBox[index].positionX + '%',
                                        'width': 100 * middleMainBox[index].width + '%', 'height': 100 * middleMainBox[index].height + '%',
                                        'background-color': `rgba(0,0,0,${middleMainBox[index].opacity})`, 'border-radius': `${middleMainBox[index].borderRadius}px`
                                    }">
                                        <v-card-subtitle draggable="true" class="text-justify" :style="{
                                            'line-height': 'unset', 'width': '100%',
                                            'position': 'absolute',
                                            'white-space': 'normal', color: middleHint1[index].color, 'opacity': 'unset',
                                            'font-size': middleHint1[index].fontSize + 'px',
                                            'top': 100 * middleHint1[index].positionY + '%',
                                            'left': -100 * middleHint1[index].positionX + '%', 'padding': '0px'
                                        }">
                                            {{ middleHint1[index] && middleHint1[index].text &&
                                                middleHint1[index].text.trim().length > 0 ? middleHint1[index].text :
                                                '' }}
                                        </v-card-subtitle>
                                        <v-card-subtitle draggable="true" class="text-justify" :style="{
                                            'position': 'absolute', 'width': '100%',
                                            'white-space': 'normal', color: middleHint2[index].color, 'opacity': 'unset',
                                            'font-size': middleHint2[index].fontSize + 'px',
                                            'top': 100 * middleHint2[index].positionY + '%',
                                            'left': -100 * middleHint2[index].positionX + '%', 'padding': '0px'
                                        }">{{
    middleHint2[index] &&
    middleHint2[index].text && middleHint2[index].text.trim().length > 0 ?
    middleHint2[index].text :
    '' }}</v-card-subtitle>
                                        <v-card-subtitle draggable="true" class="text-justify" :style="{
                                            'position': 'absolute', 'width': '100%',
                                            'white-space': 'normal', color: middleHint3[index].color, 'opacity': 'unset',
                                            'font-size': middleHint3[index].fontSize + 'px',
                                            'top': 100 * middleHint3[index].positionY + '%',
                                            'left': -100 * middleHint3[index].positionX + '%', 'padding': '0px'
                                        }">{{
    middleHint3[index] && middleHint3[index].text &&
    middleHint3[index].text.trim().length > 0 ? middleHint3[index].text :
    '' }}</v-card-subtitle>
                                        <v-img cover :style="{
                                            'position': 'absolute', 'top': 100 * middleHintImage[index].positionY + '%', 'opacity': middleHintImage[index].opacity,
                                            'left': 100 * middleHintImage[index].positionX + '%', 'border-radius': middleHintImage[index].borderRadius + 'px',
                                            'width': middleHintImage[index].width + '%', 'height': middleHintImage[index].height + '%',
                                        }" draggable="true" ondragstart="dragStart"
                                            :src="`${middleHintImage[index] &&
                                                middleHintImage[index].url ? baseUrl + middleHintImage[index].url : ''}`"></v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-carousel-item>
                    </div>
                    <div v-else>
                        <v-carousel-item v-for="(  image, index  ) in defaultCarouselImages" :key="index"
                            class="mainCarouselItem">
                            <v-img gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                :style="{ 'height': imageHeight + 'px', 'filter': `blur(${image.blureAmount}px)`, 'object-fit': 'cover' }"
                                :src="image.imageUrl">
                            </v-img>
                            <v-row class="ma-0 justify-center align-center w-100 h-100 carsoule-image-card">
                                <v-col cols="8" md="5">
                                    <v-card style="
                                        background-color: rgba(250, 250, 250,.5);
                                        letter-spacing: 5px"
                                        class=" w-100 h-100 rounded-lg text-black-darken-3 font-weight-bold">
                                        <v-card-title>{{ image.middleHint1 }}</v-card-title>
                                        <v-card-subtitle>{{ image.middleHint2 }}</v-card-subtitle>
                                        <v-card-text>{{ image.middleHint3 }}</v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-carousel-item>
                    </div>
                </v-carousel>
            </v-locale-provider>
        </v-col>
    </v-row>
</template>
<script>
import { PostData_formData, baseURL } from "@/services/remotedatamodify.js"
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            baseUrl: baseURL,
            lgAndUp: false,
            smAndUp: false,
            xsAndUp: false,
            imageHeight: 0,
            carouselImagesDialog: false,
            selectedCarsouselImageUrls: [],
            selectedcarouselImages: [],
            regcil: false
        }
    },
    props: {
        images: [],
        defaultCarouselImages: [],
        blurAmount: [],
        middleHint1: [],
        middleHint2: [],
        middleHint3: [],
        middleHintImage: [],
        middleMainBox: []
    },
    computed: {
        aph() {
            return useMainStore().aph
        },
        displayName1() {
            return this.$vuetify.display.name
        },
        pageHeight() {
            // console.log(this.$vuetify.display.height)
            return this.$vuetify.display.height;
        },
        imageHeight() {
            let x = this.$vuetify.display.name;
            switch (x) {
                case 'xl':
                case 'xxl':
                case "lg":
                case "md":
                    return 400;
                    break;
                case 'sm':
                    return 300;
                    break;
                case "xs":
                    return 200;
                    break;
                default:
                    return 300;
                    break;
            }
        }
    },
    created() {
        // console.log("kkkkkkkkk")
        // console.log(this.defaultCarouselImages)
        let x = this.$vuetify.display.name;
        // console.log(this.$vuetify.display)
        switch (x) {
            case 'xl':
            case 'xxl':
            case "lg":
            case "md":
                this.lgAndUp = true;
                this.imageHeight = 450;
                this.smAndUp = false;
                this.xsAndUp = false;
                break;
            case 'sm':
                this.lgAndUp = false;
                this.smAndUp = true;
                this.imageHeight = 300;
                this.xsAndUp = false;
                break;
            case "xs":
                this.lgAndUp = false;
                this.smAndUp = false;
                this.xsAndUp = true;
                this.imageHeight = 150;
                break;
            default:
                this.lgAndUp = true;
                this.smAndUp = false;
                this.xsAndUp = false;
        }
    },
    watch: {
        selectedcarouselImages(newVal) {
            // console.log(newVal)
            // eslint-disable-next-line no-unused-vars
            this.selectedCarsouselImageUrls = this.selectedcarouselImages.map((image, index) => {
                return URL.createObjectURL(image);
            })
        },
        displayName1(newval) {
            // console.log(newval)
            switch (newval) {
                case 'xl':
                case 'xxl':
                case "lg":
                case "md":
                    this.lgAndUp = true;
                    this.imageHeight = 450;
                    this.smAndUp = false;
                    this.xsAndUp = false;
                    break;
                case 'sm':
                    this.lgAndUp = false;
                    this.smAndUp = true;
                    this.imageHeight = 300;
                    this.xsAndUp = false;
                    break;
                case "xs":
                    this.lgAndUp = false;
                    this.smAndUp = false;
                    this.xsAndUp = true;
                    this.imageHeight = 150;
                    break;
                default:
                    this.lgAndUp = true;
                    this.smAndUp = false;
                    this.xsAndUp = false;


            }
        }
    },
    methods: {
        registerCarouselImages() {
            this.regcil = true;
            let fmData = new FormData();
            for (let i = 0; i < this.selectedcarouselImages.length; i++) {
                fmData.append("scis", this.selectedcarouselImages[i]);
            }
            useMainStore().mps = true;
            useMainStore().mpv = 0;
            PostData_formData("/@dm1n/rgscis", fmData, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            }, (err, res) => {
                if (err) {
                    this.regcil = false;
                    useMainStore().mps = false;
                    useMainStore().mpv = 0;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    this.regcil = false;
                    if (res.data && res.data.res && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "تصاویر با موفقیت آپلود شدند" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                            this.$router.replace("/cim")
                        }, 2000);
                    }
                    else if (res.data && res.data.res && res.data.res == "R6") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "تصویر جدیدی آپلود نشد و تصاویر قبلی نشان داده می شود" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                            this.$router.replace("/cim")
                        }, 2000);
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
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
<style>
#carouselImageSelection .v-btn.v-btn--elevated.v-btn--icon.v-theme--light.v-btn--density-default.v-btn--size-default.v-btn--variant-elevated.v-window__right {
    position: relative;
    z-index: 200000;
}

.v-application__wrap {
    overflow: hidden;
}

.carsoule-image-card {
    position: absolute;
    top: 0;
}


#mainCarousel .v-img__img.v-img__img--contain {
    object-fit: cover;
}

@media screen and (max-width:600px) {
    #mainCarousel>.v-window__container>.v-window__controls>.v-btn {
        width: 25px !important;
        height: 25px !important;
    }

    #mainCarousel>.v-carousel__controls {
        height: 15px !important;
    }
}
</style>

