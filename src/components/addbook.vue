<template>
    <div id="app" class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
              <div class="card">
                  <div class="card-header">新增書庫</div>
                  <div class="card-body">
                    <form @submit.prevent="addbook">
                      <div class="mb-3">
                        <label for="isbn" class="form-label">ISBN</label>
                        <input type="text" class="form-control" id="isbn" v-model="isbn" required>
                      </div>
                      <div class="mb-3">
                        <label for="name" class="form-label">書名</label>
                        <input type="text" class="form-control" id="name" v-model="name" required>
                      </div>
                      <div class="mb-3">
                        <label for="author" class="form-label">作者</label>
                        <input type="text" class="form-control" id="author" v-model="author" required>
                      </div>
                      <div class="mb-3">
                        <label for="imgurl" class="form-label">圖片連結</label>
                        <input type="text" class="form-control" id="imgurl" v-model="imgurl" required>
                      </div>
                      <div class="mb-3">
                        <label for="introduction" class="form-label">介紹</label>
                        <textarea type="text" class="form-control" id="introduction" v-model="introduction" required style="height: 200px;"></textarea>
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
      name: '',
      author: '',
      introduction: '',
      imgurl: ''
    }
  },
  methods: {
    addbook () {
      const bookData = {
        name: this.name,
        isbn: this.isbn,
        author: this.author,
        introduction: this.introduction,
        imgurl: this.imgurl
      }
      fetch('http://localhost:8080/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      })
        .then(response => {
          if (response.ok) {
            this.isbn = ''
            this.name = ''
            this.author = ''
            this.imgurl = ''
            this.introduction = ''
            alert('書籍增加成功')
            this.$router.push({ name: 'booklist' })
          } else {
            alert('書籍增加失敗')
          }
        })
        .catch(error => {
          console.error('Error adding Book:', error)
        })
    }
  }
}
</script>
