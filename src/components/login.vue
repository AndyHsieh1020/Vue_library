<template>
<div id="app" class="container my-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">登入</div>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label for="username" class="form-label">使用者名稱</label>
                            <input type="text" class="form-control" id="User_name" v-model="user_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">密碼</label>
                            <input type="password" class="form-control" id="Password" v-model="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">登入</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>

export default {
  data () {
    return {
      user_name: '',
      password: ''
    }
  },
  methods: {
    login () {
      // 發送後端
      const userData = {
        userName: this.user_name,
        passWord: this.password
      }
      fetch('http://localhost:8080/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (response.ok) {
            return response.json()
            // 将 Cookie 保存到 localStorage
            // localStorage.setItem('sessionId', sessionId)
            // this.$router.push({ name: 'booklist' })
          } else {
            alert('Failed to login user')
          }
        })
        .then(data => {
        // 在這裡處理解析後的 JSON 數據
          const sessionId = data.sessionId
          localStorage.setItem('sessionId', sessionId)
          this.$router.push({ name: 'booklist' })
          alert('User login successfully')
        })
        .catch(error => {
          alert('Error login user:', error)
        })
    }
  }
}

</script>
