<template>
  <ul class="pagination">
    
    <li class="pagination-item">
      <button class="pag-btn" type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
        <span>Previous</span>
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <!-- <li class="pagination-item inline-block" v-for="page in pages" :key="page.name">
      <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled" :class="{ active: isPageActive(page.name) }">{{page.name}}</button>
    </li> -->

    <!-- Visible Buttons End -->

    <li class="pagination-item">
      <button class="pag-btn" type="button" @click="onClickNextPage" :disabled="isInLastPage">
        <span>Next</span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['pagechanged'],
  props: {
    maxVisibleButtons: { required: false, default: 3,},
    total: { required: true,},
    perPage: { required: true,},
    currentPage: { required: true,},
  },
  computed: {
    totalPages(){
      if(this.total < this.perPage){
        return 1;
      }else{
        return Math.ceil(this.total / this.perPage)
      }
    },
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return Math.abs(this.totalPages - this.maxVisibleButtons);
      }
      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i++) {
        range.push({ name: i, isDisabled: i === this.currentPage});
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
};
</script>

<style lang="scss" scoped>
ul.pagination{
  width: 100%;
  padding: 16px 0;
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  li.pagination-item{
    display: inline-block;
    &:first-child{
      margin-right: 20px;
    }

    button.pag-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid gray;
      background-color: white;
      border-radius: 6px;
      padding: 15px 30px;
      font-size: 18px;
      color: var(--vt-c-kiwi-green);
      cursor: pointer;

      &:disabled{
        background: gray;
        cursor: not-allowed;
      }
    }
  }
}
</style>
