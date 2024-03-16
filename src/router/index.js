import MainPage from "@/components/MainPage.vue"
import adminLogin from "@/components/adminLogin.vue"
import FilterMembersModification from "@/components/FilterMembersModification.vue"
import CarouselImagesModification from "@/components/CarouselImagesModification.vue"
import Users from "@/components/users.vue"
import User from "@/components/userProfile.vue"
import Messages from "@/components/userMessages.vue"
import Requests from "@/components/userRequests.vue"
import UserUpdates from "@/components/UpdateUsers.vue"
import TransactionDetails from "@/components/TransactionDetails.vue"
import SendMessage from "@/components/sendMessage.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/login/admin$$!",
    component: adminLogin
  },
  {
    path: "/sendMessage/:id",
    component: SendMessage
  },
  {
    path: "/cim",
    component: CarouselImagesModification
  },
  {
    path: "/users",
    component: Users
  },
  {
    path: "/requests",
    component: Requests
  },
  {
    path: "/UserUpdates",
    component: UserUpdates
  },
  {
    path: "/transactionPage/:tId",
    component: TransactionDetails
  },
  {
    path: "/user/:id",
    component: User
  },
  {
    path: "/messages",
    component: Messages
  },
  {
    path: "/filtermembers/:fi",
    component: FilterMembersModification
  },
  {
    path: "/",
    name: "main",
    component: MainPage,
    beforeEnter: (to, from) => {
      // console.log(to);
      // console.log(from);
      return true
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
