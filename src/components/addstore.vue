<template>
    <div id="app" class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
              <div class="card">
                  <div class="card-header">新增藏書</div>
                  <div class="card-body">
                    <form @submit.prevent="addbook">
                      <div class="mb-3">
                        <label for="isbn" class="form-label">ISBN</label>
                        <input type="text" class="form-control" id="isbn" v-model="isbn" required>
                      </div>
                      <div class="mb-3">
                        <label for="author" class="form-label">入庫日期</label>
                        <input type="date" class="form-control" id="storeTime" v-model="storeTime" required>
                      </div>
                      <button type="submit" class="btn btn-primary">新增</button>
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
      isbn: '',
      storeTime: ''
    }
  },
  methods: {
    // 新增館藏
    addbook () {
      const bookData = {
        storeTime: new Date(this.storeTime),
        isbn: this.isbn
      }
      fetch('http://localhost:8080/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      })
        .then(response => {
          if (response.ok) {
            this.isbn = ''
            this.storeTime = ''
            alert('藏書增加成功')
            this.$router.push({ name: 'storelist' })
          } else {
            alert('藏書增加失敗')
          }
        })
        .catch(error => {
          console.error('Error adding Book:', error)
        })
    }
  }
}
</script>
