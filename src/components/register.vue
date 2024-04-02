<template>
  <div id="app" class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
            <div class="card">
                <div class="card-header">註冊</div>
                <div class="card-body">
                  <form @submit.prevent="register">
                    <div class="mb-3">
                      <label for="username" class="form-label">使用者名稱</label>
                      <input type="text" class="form-control" id="User_name" v-model="user_name" required>
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">密碼</label>
                      <input type="password" class="form-control" id="Password" v-model="password" required>
                    </div>
                    <div class="mb-3">
                      <label for="phone" class="form-label">電話</label>
                      <input type="tel" class="form-control" id="Phone_number" v-model="phone_number" required>
                    </div>
                    <button type="submit" class="btn btn-primary">註冊</button>
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
      password: '',
      phone_number: ''
    }
  },
  methods: {
    register () {
      // 發送後端
      const userData = {
        userName: this.user_name,
        passWord: this.password,
        phoneNumber: this.phone_number
      }
      fetch('http://localhost:8080/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (response.ok) {
            console.log('User added successfully')
            this.$router.push({ name: 'login' })
          } else {
            console.error('Failed to add user')
          }
        })
        .catch(error => {
          console.error('Error adding user:', error)
        })
    }
  }
}
</script>
