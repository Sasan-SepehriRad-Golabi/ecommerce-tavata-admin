import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    dwr: false,
    wd: false,
    mol: false,
    mpv: 30,
    mps: false,
    aph: 112,
    gtlis: false,
    sn: {
      sn: true,
      isLogin: false
    },
    al: {
      alC: "",
      alT: "",
      alt: ""
    },
    u: {
      uln: false,
      gc: "",
      upn: "",
      upln: "",
      upi: "",
      uc: false,
      mr: 0,
      mu: 0,
      rep: [],
      bup: []
    }
  }),
  getters: {
    getDrawer() {
      return this.dwr;
    }
  },
  actions: {
    changeDrawer() {
      this.dwr = !this.dwr;
    }
  }
})
