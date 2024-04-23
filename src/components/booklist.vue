<template>
    <div id="app" class="container my-5">
      <h1>書庫清單</h1>
      <div class="row">
        <div v-for="(book, index) in books" :key="index" class="col-md-3 mb-4">
          <div class="card">
            <img :src="book.ImgUrl" class="card-img-top" alt="Book Image">
            <div class="card-body">
              <h5 class="card-title">{{ book.Name }}</h5>
              <p class="card-text">{{ book.Author }}</p>
              <button class="btn btn-primary" @click="editBook(book)">Edit</button>
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
      books: []
    }
  },
  created () {
    this.fetchBooks()
  },
  // 查詢書籍
  methods: {
    fetchBooks () {
      fetch('http://localhost:8080/book')
        .then(response => response.json())
        .then(data => {
          this.books = data
        })
        .catch(error => {
          console.error('Error fetching books:', error)
        })
    },
    editBook (book) {
      this.$router.push({ name: 'editbook', params: { book } })
    }
  }
}
</script>
<style>
</style>
