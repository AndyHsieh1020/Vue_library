<template>
    <div id="app" class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
              <div class="card">
                  <div class="card-header">編輯書籍</div>
                  <div class="card-body">
                    <form>
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
                      <button type="button" class="btn btn-primary" @click="editbook()">完成</button>
                      <button type="button" class="btn btn-danger" @click="deletebook()">刪除</button>
                      <button type="button" class="btn btn-primary" @click="goback()">返回</button>
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
      name: '',
      author: '',
      introduction: '',
      imgurl: ''
    }
  },
  mounted () {
    const { Name, Author, Introduction, ImgUrl } = this.$route.params.book
    this.name = Name
    this.author = Author
    this.introduction = Introduction
    this.imgurl = ImgUrl
  },
  methods: {
    editbook () {
      // 發送後端
      const bookData = {
        name: this.name,
        isbn: this.$route.params.book.ISBN,
        author: this.author,
        introduction: this.introduction,
        imgurl: this.imgurl
      }
      fetch('http://localhost:8080/editBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      })
        .then(response => {
          if (response.ok) {
            this.name = ''
            this.author = ''
            this.imgurl = ''
            this.introduction = ''
            alert('書籍編輯成功')
            this.$router.push({ name: 'booklist' })
          } else {
            alert('書籍編輯失敗')
          }
        })
        .catch(error => {
          console.error('Error adding Book:', error)
        })
    },
    deletebook () {
      const bookData = {
        isbn: this.$route.params.book.ISBN
      }
      fetch('http://localhost:8080/deleteBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      })
        .then(response => {
          if (response.ok) {
            alert('書籍刪除成功')
            this.$router.push({ name: 'booklist' })
          } else {
            alert('書籍刪除失敗')
          }
        })
        .catch(error => {
          console.error('Error adding Book:', error)
        })
    },
    goback () {
      this.$router.push({ name: 'booklist' })
    }
  }
}
</script>
