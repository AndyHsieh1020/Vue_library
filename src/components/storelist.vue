<template>
    <div id="app" class="container my-5">
      <h1>藏書清單</h1>
      <div class="row">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">ISBN</th>
                <th scope="col">書名</th>
                <th scope="col">狀態</th>
                <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody v-for="(book, index) in books" :key="index">
                <tr>
                    <td>{{ book.ISBN }}</td>
                    <td>{{ book.Name }}</td>
                    <td>{{ book.Status }}</td>
                    <td><button class="btn btn-primary" @click="borrowBook(book)">Borrow</button>
              <button class="btn btn-primary" @click="editBook(book)">Edit</button></td>
                </tr>
            </tbody>
        </table>
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
  // 查詢館藏
  methods: {
    fetchBooks () {
      fetch('http://localhost:8080/inventory')
        .then(response => response.json())
        .then(data => {
          this.books = data
        })
        .catch(error => {
          console.error('Error fetching books:', error)
        })
    },
    borrowBook (book) {
    },
    editBook (book) {
      this.$router.push({ name: 'editstore', params: { book } })
    }
  }
}
</script>
<style>
</style>
