<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Your Logo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="isLoggedin">
            <router-link to="/addbook" class="nav-link">新增書庫</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedin">
            <router-link to="/booklist" class="nav-link">書庫清單</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedin">
            <router-link to="/addstore" class="nav-link">新增館藏</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedin">
            <router-link to="/storelist" class="nav-link">館藏清單</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedin">
            <router-link to="/register" class="nav-link">註冊會員</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedin">
            <router-link to="/login" class="nav-link">登入會員</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedin">
            <router-link to="/logout" class="nav-link">登出會員</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { EventBus } from '@/store/eventbus.js'
export default {
  data () {
    return {
      isLoggedin: false
    }
  },
  created () {
    // 監聽是否登入
    EventBus.$on('login', (isLoggedin) => {
      this.isLoggedin = isLoggedin
      // console.log(isLoggedin)
    })
  }
}
</script>
