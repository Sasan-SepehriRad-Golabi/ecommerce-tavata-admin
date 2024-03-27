<template>
    <v-row :style="{ 'margin-top': aph + 'px' }" class="justify-space-between mx-2">
        <v-col v-for="(image, index) in carouselImages" :key="index" cols="12" sm="6" lg="4"
            style="min-width:300px;max-width:400px;">
            <v-locale-provider rtl>
                <v-card class="w-100 elevation-2 my-2 m-sm-0" style="position: relative;" ondrop="onDrop"
                    ondragover="onDragOver">
                    <v-col cols="12" style="position:relative;">
                        <v-img :src="`${baseUrl}${image.imageUrl}`" cover :style="{
                            'height': '200px', 'width': '100%', 'position': 'relative', 'top': '0', 'left': '0',
                            'filter': `blur(${blurAmount[index]}px)`
                        }">
                        </v-img>
                        <div :style="{
                            'position': 'absolute', 'top': 100 * middleMainBox[index].positionY + '%', 'left': 100 * middleMainBox[index].positionX + '%',
                            'width': 100 * middleMainBox[index].width + '%', 'height': 100 * middleMainBox[index].height + '%',
                            'background-color': `rgba(0,0,0,${middleMainBox[index].opacity})`, 'border-radius': `${middleMainBox[index].borderRadius}px`
                        }">
                            <v-row class="w-100 h-100" style="margin: 0;">
                                <v-col cols="8">
                                    <v-card-subtitle draggable="true" class="text-justify" :style="{
                                        'line-height': 'unset', 'width': '100%',
                                        'position': 'absolute',
                                        'color': middleHint1[index].color, 'opacity': 'unset',
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
                                </v-col>
                                <v-col cols="4" class="pa-0">
                                    <v-img cover :style="{
                                        'position': 'absolute', 'top': 100 * middleHintImage[index].positionY + '%', 'opacity': middleHintImage[index].opacity,
                                        'left': 100 * middleHintImage[index].positionX + '%', 'border-radius': middleHintImage[index].borderRadius + 'px',
                                        'width': middleHintImage[index].width + '%', 'height': middleHintImage[index].height + '%',
                                    }" draggable="true" ondragstart="dragStart"
                                        :src="`${middleHintImageFile[index] && createSource(middleHintImageFile[index], index).trim().length > 0 ? createSource(middleHintImageFile[index], index) : middleHintImage[index] && middleHintImage[index].url ? baseUrl + middleHintImage[index].url : ''}`"></v-img>
                                </v-col>
                            </v-row>
                        </div>
                        <v-row>
                            <v-col>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" style="height:300px;overflow:auto;background-color:rgba(0,0,0,.7);font-size:15px"
                        class="rounded-lg text-white font-weight-bold">
                        <v-card-text>
                            <div class="d-flx flex-column">
                                <div><v-card-subtitle>میزان وضوح تصویر اصلی</v-card-subtitle></div>
                                <v-slider color="white" :min="0" thumb-label="always" :max="10" :step="1"
                                    v-model="blurAmount[index]"></v-slider>
                            </div>
                            <div class="d-flx flex-column">
                                <div><v-card-subtitle>وضوح</v-card-subtitle></div>
                                <v-slider color="white" :min="0" :max="1" :step=".1" thumb-label="always"
                                    v-model="middleMainBox[index].opacity"></v-slider>
                            </div>
                            <div class="d-flx flex-column">
                                <div><v-card-subtitle>مکان عمودی</v-card-subtitle></div>
                                <v-slider color="white" :min="-1" :max="1" :step=".02" thumb-label="always"
                                    v-model="middleMainBox[index].positionY"></v-slider>
                            </div>
                            <div class="d-flx flex-column">
                                <div><v-card-subtitle>مکان افقی</v-card-subtitle></div>
                                <v-slider color="white" :min="-1" :max="1" :step=".02" thumb-label="always"
                                    v-model="middleMainBox[index].positionX"></v-slider>
                            </div>
                            <div class="d-flx flex-column">
                                <div><v-card-subtitle>طول</v-card-subtitle></div>
                                <v-slider color="white" :min="0" :max="1" :step=".01" thumb-label="always"
                                    v-model="middleMainBox[index].width"></v-slider>
                            </div>
                            <div class="d-flx flex-column">
                                <div><v-card-subtitle>عرض</v-card-subtitle></div>
                                <v-slider color="white" :min="0" :max="1" :step=".01" thumb-label="always"
                                    v-model="middleMainBox[index].height"></v-slider>
                            </div>
                            <div class="d-flx flex-column">
                                <div><v-card-subtitle>میزان قوس لبه ها</v-card-subtitle></div>
                                <v-slider color="white" :min="0" :max="30" :step="5" thumb-label="always"
                                    v-model="middleMainBox[index].borderRadius"></v-slider>
                            </div>
                            <v-text-field density v-model="middleHint1[index].text"
                                placeholder="متن اول را وارد کنید"></v-text-field>
                            <v-row>
                                <v-col cols="6">
                                    <div class="d-block d-sm-none">
                                        <v-col cols="12">
                                            <v-card-subtitle style="white-space:normal;">افقی</v-card-subtitle>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-slider color="white" :min="-2" :max="2" :step=".01" thumb-label="always"
                                                v-model="middleHint1[index].positionX"></v-slider>
                                        </v-col>
                                    </div>
                                    <div class="d-none d-sm-block">
                                        <v-slider color="white" :min="-2" :max="2" :step=".01" thumb-label="always"
                                            label="افقی" v-model="middleHint1[index].positionX"></v-slider>
                                    </div>
                                </v-col>
                                <v-col cols="6">
                                    <div class="d-block d-sm-none">
                                        <v-col cols="12">
                                            <v-card-subtitle style="white-space:normal;">عمودی</v-card-subtitle>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-slider color="white" :min="0" :max="1" :step=".02" thumb-label="always"
                                                v-model="middleHint1[index].positionY"></v-slider>
                                        </v-col>
                                    </div>
                                    <div class="d-none d-sm-block">
                                        <v-slider color="white" :min="0" :max="1" :step=".02" thumb-label="always"
                                            label="عمودی" v-model="middleHint1[index].positionY"></v-slider>
                                    </div>
                                </v-col>
                                <v-col cols="6" class="mt-n5">
                                    <v-color-picker style="width:100% !important"
                                        v-model="middleHint1[index].color"></v-color-picker>
                                </v-col>
                                <v-col cols="6" class="mt-n5">
                                    <v-col cols="12">
                                        <v-subtitle>اندازه فونت</v-subtitle>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-slider color="white" :min="10" :max="35" :step="2" thumb-label="always"
                                            label="سایز" v-model="middleHint1[index].fontSize"></v-slider>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <v-text-field v-model="middleHint2[index].text"
                                placeholder="متن دوم را وارد کنید "></v-text-field>
                            <v-row>
                                <v-col cols="6">
                                    <div class="d-block d-sm-none">
                                        <v-col cols="12">
                                            <v-card-subtitle style="white-space:normal;">افقی</v-card-subtitle>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-slider color="white" :min="-2" :max="2" :step=".01" thumb-label="always"
                                                v-model="middleHint2[index].positionX"></v-slider>
                                        </v-col>
                                    </div>
                                    <div class="d-none d-sm-block">
                                        <v-slider color="white" :min="-2" :max="2" :step=".01" thumb-label="always"
                                            label="افقی" v-model="middleHint2[index].positionX"></v-slider>
                                    </div>
                                </v-col>
                                <v-col cols="6">
                                    <div class="d-block d-sm-none">
                                        <v-col cols="12">
                                            <v-card-subtitle style="white-space:normal;">عمودی</v-card-subtitle>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-slider color="white" :min="0" :max="1" :step=".02" thumb-label="always"
                                                v-model="middleHint2[index].positionY"></v-slider>
                                        </v-col>
                                    </div>
                                    <div class="d-none d-sm-block">
                                        <v-slider color="white" :min="0" :max="1" :step=".02" thumb-label="always"
                                            label="عمودی" v-model="middleHint2[index].positionY"></v-slider>
                                    </div>
                                </v-col>
                                <v-col cols="6" class="mt-n5">
                                    <v-color-picker style="width:100% !important"
                                        v-model="middleHint2[index].color"></v-color-picker>
                                </v-col>
                                <v-col cols="6" class="mt-n5">
                                    <v-col cols="12">
                                        <v-subtitle>اندازه فونت</v-subtitle>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-slider color="white" :min="10" :max="35" :step="2" thumb-label="always"
                                            label="سایز" v-model="middleHint2[index].fontSize"></v-slider>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <v-text-field v-model="middleHint3[index].text"
                                placeholder="متن سوم را وارد نمایید"></v-text-field>
                            <v-row>
                                <v-col cols="6">
                                    <div class="d-block d-sm-none">
                                        <v-col cols="12">
                                            <v-card-subtitle style="white-space:normal;">افقی</v-card-subtitle>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-slider color="white" :min="-2" :max="2" :step=".01" thumb-label="always"
                                                v-model="middleHint3[index].positionX"></v-slider>
                                        </v-col>
                                    </div>
                                    <div class="d-none d-sm-block">
                                        <v-slider color="white" :min="-2" :max="2" :step=".01" thumb-label="always"
                                            label="افقی" v-model="middleHint3[index].positionX"></v-slider>
                                    </div>
                                </v-col>
                                <v-col cols="6">
                                    <div class="d-block d-sm-none">
                                        <v-col cols="12">
                                            <v-card-subtitle style="white-space:normal;">عمودی</v-card-subtitle>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-slider color="white" :min="0" :max="1" :step=".02" thumb-label="always"
                                                v-model="middleHint3[index].positionY"></v-slider>
                                        </v-col>
                                    </div>
                                    <div class="d-none d-sm-block">
                                        <v-slider color="white" :min="0" :max="1" :step=".02" thumb-label="always"
                                            label="عمودی" v-model="middleHint3[index].positionY"></v-slider>
                                    </div>
                                </v-col>
                                <v-col cols="6" class="mt-n5">
                                    <v-color-picker style="width:100% !important"
                                        v-model="middleHint3[index].color"></v-color-picker>
                                </v-col>
                                <v-col cols="6" class="mt-n5">
                                    <v-col cols="12">
                                        <v-subtitle>اندازه فونت</v-subtitle>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-slider color="white" :min="10" :max="35" :step="2" thumb-label="always"
                                            label="سایز" v-model="middleHint3[index].fontSize"></v-slider>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <v-file-input prepend-icon="" v-model="middleHintImageFile[index]"
                                hint="یک تصویر برای توضیحات انتخاب نمایید" persistent-hint chips clearable></v-file-input>
                            <v-col cols="12">
                                <v-subtitle>طول</v-subtitle>
                            </v-col>
                            <v-col cols="12">
                                <v-slider color="white" :min="0" :max="100" :step="5" thumb-label="always"
                                    v-model="middleHintImage[index].width"></v-slider>
                            </v-col>
                            <v-col cols="12">
                                <v-subtitle>عرض</v-subtitle>
                            </v-col>
                            <v-col cols="12">
                                <v-slider color="white" :min="0" :max="100" :step="5" thumb-label="always"
                                    v-model="middleHintImage[index].height"></v-slider>
                            </v-col>
                            <v-col cols="12">
                                <v-subtitle>وضوح</v-subtitle>
                            </v-col>
                            <v-col cols="12">
                                <v-slider color="white" :min="-1" :max="1" :step="0.02" thumb-label="always"
                                    v-model="middleHintImage[index].opacity"></v-slider>
                            </v-col>
                            <v-col cols="12">
                                <v-subtitle>افقی</v-subtitle>
                            </v-col>
                            <v-col cols="12">
                                <v-slider color="white" :min="-1" :max="1" :step="0.02" thumb-label="always"
                                    v-model="middleHintImage[index].positionX"></v-slider>
                            </v-col>
                            <v-col cols="12">
                                <v-subtitle>عمودی</v-subtitle>
                            </v-col>
                            <v-col cols="12">
                                <v-slider color="white" :min="-1" :max="1" :step="0.02" thumb-label="always"
                                    v-model="middleHintImage[index].positionY"></v-slider>
                            </v-col>
                            <v-col cols="12">
                                <v-subtitle>قوس لبه ها</v-subtitle>
                            </v-col>
                            <v-col cols="12">
                                <v-slider color="white" :min="0" :max="35" :step="5" thumb-label="always"
                                    v-model="middleHintImage[index].borderRadius"></v-slider>
                            </v-col>
                        </v-card-text>
                    </v-col>
                    <v-card-actions class="justify-space-between">
                        <v-btn class="bg-red" @click="removeImage(image.id)">حذف این تصویر</v-btn>
                        <v-btn class="bg-red" @click="acceptImage(image.id, index)"
                            :style="{ 'font-size': this.$vuetify.display.name == 'xs' ? 'smaller' : 'x-small' }">تایید
                            و اضافه کردن به اسلاید ها</v-btn>
                    </v-card-actions>
                </v-card>
            </v-locale-provider>
        </v-col>
    </v-row>
</template>
<script>
import { PostData_normal, baseURL, PostData_formData } from '@/services/remotedatamodify';
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            baseUrl: baseURL,
            carouselImages: [],
            middleHint1: [],
            middleHint2: [],
            middleHint3: [],
            middleHintImage: [],
            middleHintImageFile: [],
            middleHintImageUrl: [],
            middleMainBox: [],
            blurAmount: []
        }
    },
    computed: {
        aph() { return useMainStore().aph }
    },
    created() {
        this.getCarouselImages();
    },
    watch: {
        blurAmount(newVal) {
            // console.log(newVal)
            // console.log(newVal[0])
        }
    },
    methods: {
        onDragOver(event) {
            event.preventDefault();
        },
        dragStart(event) {
            // console.log(event.target.id)
            event.dataTransfer.setData("text", event.target.id);
        },
        createSource(img, index) {
            if (img && img.length > 0) {
                let image = img[0];
                // console.log(index);
                // console.log(this.middleHintImage)
                // console.log(URL.createObjectURL(image))
                // this.middleHintImage[index].url=URL.createObjectURL(image);
                return URL.createObjectURL(image)
            }
            else {
                return ""
            }
        },
        removeImage(imageId) {
            useMainStore().mps = false;
            useMainStore().mpv = 0;
            PostData_normal("/@dm1n/remci", { id: imageId }, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.round((progressEvent.loaded * 100) / progressEvent.total);
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
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در حذف تصویر" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    if (res.data && res.data.res && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "تصویر مورد نظر با موفقیت حذف شد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                        this.getCarouselImages();
                    }
                    else if (res.data && res.data.res && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "سیستم شما را شاسایی نکرد دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                            this.$router.replace("/login/admin$$!")
                        }, 2000);
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در حذف تصویر" }
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
        acceptImage(imageID, index) {
            // console.log(this.middleHint1[index]);
            let fmData = new FormData();
            fmData.append("id", imageID);
            fmData.append("mdh1", JSON.stringify(this.middleHint1[index]))
            fmData.append("mdh2", JSON.stringify(this.middleHint2[index]))
            fmData.append("mdh3", JSON.stringify(this.middleHint3[index]))
            fmData.append("mdmb", JSON.stringify(this.middleMainBox[index]))
            for (let i = 0; i < this.middleHintImageFile[index].length; i++) {
                fmData.append("miImage", (this.middleHintImageFile[index])[i])
            }
            fmData.append("mi", JSON.stringify(this.middleHintImage[index]))
            fmData.append("bla", this.blurAmount[index])
            PostData_formData("/@dm1n/mci", fmData, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.floor(progressEvent.loaded * 100 / progressEvent.total)
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
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ثبت تصویر" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        useMainStore().sn.sn = false;
                    }, 2000);
                }
                else {
                    if (res.data && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                            this.$router.replace("/login/admin$$!")
                        }, 2000);
                    }
                    else if (res.data && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "تصویر با موفقیت ویرایش شد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            useMainStore().sn.sn = false;
                        }, 2000);
                        this.getCarouselImages();
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ثبت تصویر" }
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
        getCarouselImages() {
            PostData_normal("/@dm1n/gcim", {}, null, (err, res) => {
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
                            useMainStore().sn.sn = false;
                            this.$router.replace("/login/admin$$!")
                        }, 2000);
                    }
                    else if (res.data && res.data.res && res.data.res == "R1") {
                        this.carouselImages = res.data.images;
                        // console.log("****************")
                        // console.log(this.carouselImages)
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
                        // console.log(this.middleHintImage)
                        this.blurAmount = [];
                        this.blurAmount = this.carouselImages.map((item, index) => {
                            return item.mainBlurAmount ? item.mainBlurAmount : 0;
                        })
                        // this.blurAmount = [];
                        // for (let i = 0; i < this.carouselImages.length; i++) {
                        //     this.blurAmount.push(0);
                        // }
                        this.middleHintImageFile = [];
                        for (let i = 0; i < this.carouselImages.length; i++) {
                            this.middleHintImageFile.push(0);
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