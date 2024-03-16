<template>
  <v-locale-provider rtl>
    <v-dialog v-model="wd" transition="dialog-top-transition" width="500">
      <div v-if="this.$store.state.uln == 'blocked'">
        <v-card elevation="2" rounded>
          <v-img src="@/d@assets/images/security-blocked-welcom-banner-slide.png" class="mx-auto" contain
            style="width:150px;height:150px">
          </v-img>
          <v-card-text class="text-center text-wrap text-red font-weight-bold">
            پروفایل شما به دلایل امنیتی بلاک شده است. لطفا با ادمین تماس بگیرید.
          </v-card-text>
        </v-card>
      </div>
      <div v-else>
        <v-card v-if="welcomeInfoPage == 1" title="خوش آمدید" style="overflow:hidden;">
          <v-card-text>
            <span class="mx-1">
              کاربر
            </span>
            <div v-if="(userName && userName.length > 0) || (userLastName && userLastName.length > 0)">
              <span v-if="(userName && userName.length > 0) ? true : false" class="mx-1 text-green font-weight-bold">
                {{ userName }}
              </span>
              <span v-if="(userLastName && userLastName.length > 0) ? true : false"
                class="mx-1 text-green font-weight-bold">
                {{ userLastName }}
              </span>
            </div>
            <div v-else>
              <span v-if="(userLastName && userLastName.length > 0) ? true : false"
                class="mx-1 text-red font-weight-bold">
                ناشناس
              </span>
            </div>
            <span class="mx-1">
              خوش آمدید
            </span>
          </v-card-text>
          <v-card-text class="w-100">
            <v-row style="height:200px">
              <v-col cols="12" class="d-none d-sm-flex">
                <v-col cols="12" sm="6">
                  <v-card-title :style="{ 'height': '200px', 'font-size': screenWidth }"
                    class="text-subtitle-2 text-sm-h5 font-weight-bold text-wrap text-purple text-center">
                    می خوای بدونی ما چجوری کمکت می کنیم تا به شغل و درآمد عالی برسی؟؟؟
                  </v-card-title>
                </v-col>
                <v-col cols="12" sm="6" align-self="start" class="h-100">
                  <v-img src="@/d@assets/images/welcome-banner-slide0.png" contain class="w-100 h-100">
                  </v-img>
                </v-col>
              </v-col>
              <v-col cols="12" class="d-block d-sm-none">
                <v-row class="d-block">
                  <v-card-title :style="{ 'font-size': screenWidth }"
                    class="text-subtitle-2 text-sm-h5 font-weight-bold text-wrap text-purple text-center">
                    می خوای بدونی ما چجوری کمکت می کنیم تا به شغل و درآمد عالی برسی؟؟؟
                  </v-card-title>
                </v-row>
                <v-row calss="d-block">
                  <v-locale-provider ltr>
                    <v-col cols=4>
                      <v-img src="@/d@assets/images/welcome-banner-slide0.png" contain class="justify-end align-center ">

                      </v-img>
                    </v-col>
                  </v-locale-provider>
                </v-row>

              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions style="display:block !important">
            <div>
              <v-locale-provider ltr>
                <div class="text-center">
                  <v-pagination v-model="welcomeInfoPage" :length="4" rounded="circle"></v-pagination>
                </div>
              </v-locale-provider>
            </div>
            <div>
              <v-btn block variant="outlined" class="bg-red" text="بستن" @click="useMainStore().wd = false"></v-btn>
            </div>
          </v-card-actions>
        </v-card>
        <v-card v-if="welcomeInfoPage == 2" title="خوش آمدید" style="overflow:hidden;">
          <v-card-text>
            <span class="mx-1">
              کاربر
            </span>
            <div v-if="(userName && userName.length > 0) || (userLastName && userLastName.length > 0)">
              <span v-if="(userName && userName.length > 0) ? true : false" class="mx-1 text-green font-weight-bold">
                {{ userName }}
              </span>
              <span v-if="(userLastName && userLastName.length > 0) ? true : false"
                class="mx-1 text-green font-weight-bold">
                {{ userLastName }}
              </span>
            </div>
            <div v-else>
              <span v-if="(userLastName && userLastName.length > 0) ? true : false"
                class="mx-1 text-red font-weight-bold">
                ناشناس
              </span>
            </div>
            <span class="mx-1">
              خوش آمدید
            </span>

          </v-card-text>
          <v-card-text class="text-red mt-3 mr-3">
            برای استفاده کامل از امکانات سایت ثبت نام خود را کامل نمایید
          </v-card-text>
          <v-card-actions style="display:block !important">
            <v-locale-provider ltr>
              <div class="text-center">
                <v-pagination v-model="welcomeInfoPage" :length="4" rounded="circle"></v-pagination>
              </div>
            </v-locale-provider>
            <v-btn block variant="outlined" class="bg-red" text="بستن" @click="useMainStore().wd = false"></v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="welcomeInfoPage == 3" title="خوش آمدید" style="overflow:hidden;">
          <v-card-text>
            <span class="mx-1">
              کاربر
            </span>
            <div v-if="(userName && userName.length > 0) || (userLastName && userLastName.length > 0)">
              <span v-if="(userName && userName.length > 0) ? true : false" class="mx-1 text-green font-weight-bold">
                {{ userName }}
              </span>
              <span v-if="(userLastName && userLastName.length > 0) ? true : false"
                class="mx-1 text-green font-weight-bold">
                {{ userLastName }}
              </span>
            </div>
            <div v-else>
              <span v-if="(userLastName && userLastName.length > 0) ? true : false"
                class="mx-1 text-red font-weight-bold">
                ناشناس
              </span>
            </div>
            <span class="mx-1">
              خوش آمدید
            </span>

          </v-card-text>
          <v-card-text class="text-red mt-3 mr-3">
            برای استفاده کامل از امکانات سایت ثبت نام خود را کامل نمایید
          </v-card-text>
          <v-card-actions style="display:block !important">
            <v-locale-provider ltr>
              <div class="text-center">
                <v-pagination v-model="welcomeInfoPage" :length="4" rounded="circle"></v-pagination>
              </div>
            </v-locale-provider>
            <v-btn block variant="outlined" class="bg-red" text="بستن" @click="useMainStore().wd = false"></v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="welcomeInfoPage == 4" title="خوش آمدید" style="overflow:hidden;">
          <v-card-text>
            <span class="mx-1">
              کاربر
            </span>
            <div v-if="(userName && userName.length > 0) || (userLastName && userLastName.length > 0)">
              <span v-if="(userName && userName.length > 0) ? true : false" class="mx-1 text-green font-weight-bold">
                {{ userName }}
              </span>
              <span v-if="(userLastName && userLastName.length > 0) ? true : false"
                class="mx-1 text-green font-weight-bold">
                {{ userLastName }}
              </span>
            </div>
            <div v-else>
              <span v-if="(userLastName && userLastName.length > 0) ? true : false"
                class="mx-1 text-red font-weight-bold">
                ناشناس
              </span>
            </div>
            <span class="mx-1">
              خوش آمدید
            </span>
          </v-card-text>
          <v-card-text class="text-red mt-3 mr-3">
            برای استفاده کامل از امکانات سایت ثبت نام خود را کامل نمایید
          </v-card-text>
          <v-card-actions style="display:block !important">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-locale-provider ltr>
              <div class="text-center">
                <v-pagination v-model="welcomeInfoPage" :length="4" rounded="circle"></v-pagination>
              </div>
            </v-locale-provider>
            <v-btn block variant="outlined" class="bg-red" text="بستن" @click="useMainStore().wd = false"></v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </v-locale-provider>
</template>
<script>
import useMainStore from "@/store/main"
export default {
  data() {
    return {
      welcomeInfoPage: 1,
    }
  },
  computed: {
    wd() {
      return useMainStore().wd
    },
    userName() {
      return useMainStore().u.upn;
    },
    userLastName() {
      return useMainStore().u.upln
    },
    screenWidth() {
      var name = this.$vuetify.display.name;
      if (name == 'sm') {
        return '20px !important'
      }
      else if (name == 'xs') {
        return '13px !important'
      }
      else {
        return '1.5rem !important'
      }
    }
  }
}
</script>
<style scoped>
.wlcomedialog1text {}
</style>