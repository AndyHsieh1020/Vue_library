<template>
    <div id="app" class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
              <div class="card">
                  <div class="card-header">編輯館藏</div>
                  <div class="card-body">
                    <form>
                      <div class="mb-3">
                        <label for="imgurl" class="form-label">ISBN</label>
                        <input type="text" class="form-control" id="ISBN" v-model="isbn" required>
                      </div>
                      <div class="mb-3">
                        <label for="author" class="form-label">入庫日期</label>
                        <input type="date" class="form-control" id="storeTime" v-model="storeTime" required>
                      </div>
                      <div class="mb-3">
                        <label for="introduction" class="form-label">狀態</label>
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ selectedOption }}
                            </button>
                            <!-- 下拉菜单内容 -->
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li v-for="(option, index) in options" :key="index">
                                <a class="dropdown-item" @click="selectOption(option)">{{ option }}</a>
                                </li>
                            </ul>
                        </div>
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
      isbn: '',
      storeTime: '',
      options: ['出借中', '在庫', '整理中', '遺失', '毀損', '廢棄'],
      selectedOption: ''
    }
  },
  mounted () {
    // eslint-disable-next-line camelcase
    const { ISBN, Store_time, Status } = this.$route.params.book
    this.isbn = ISBN
    const dateTime = new Date(Store_time)
    const year = dateTime.getFullYear()
    const month = String(dateTime.getMonth() + 1).padStart(2, '0')
    const day = String(dateTime.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    // eslint-disable-next-line camelcase
    this.storeTime = formattedDate
    this.selectedOption = Status
  },
  methods: {
    // 編輯館藏
    editbook () {
      // 發送後端
      const bookData = {
        isbn: this.isbn,
        storeTime: new Date(this.storeTime),
        status: this.selectedOption
      }
      fetch(`http://localhost:8080/inventory/${this.$route.params.book.Inventory_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      })
        .then(response => {
          if (response.ok) {
            this.storeTime = ''
            this.isbn = ''
            alert('館藏編輯成功')
            this.$router.push({ name: 'storelist' })
          } else {
            alert('館藏編輯失敗')
          }
        })
        .catch(error => {
          console.error('Error adding Book:', error)
        })
    },
    // 選擇下拉選單
    selectOption (option) {
      this.selectedOption = option
    }, // 刪除館藏
    deletebook () {
      fetch(`http://localhost:8080/inventory/${this.$route.params.book.Inventory_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            alert('館藏刪除成功')
            this.$router.push({ name: 'storelist' })
          } else {
            alert('館藏刪除失敗')
          }
        })
        .catch(error => {
          console.error('Error adding Book:', error)
        })
    },
    goback () {
      this.$router.push({ name: 'storelist' })
    }
  }
}
</script>
