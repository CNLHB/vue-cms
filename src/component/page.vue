<template>
  <ul class="pager">
    <li class="prev">
      <button v-on:click="prev" v-bind:disabled="prev_disabled" :class="{disabled:currentPage===1}">
        <i class="fa fa-angle-left"></i>
      </button>
    </li>
    <li
      v-on:click="changPage"
      v-for="page in pagers_con"
      :key="page"
      :class="{active:page===currentPage}"
    >{{page}}</li>
    <li class="next">
      <button
        v-on:click="next"
        v-bind:disabled="next_disabled"
        :class="{disabled:currentPage===totalPage}"
      >
        <i class="fa fa-angle-right"></i>
      </button>
    </li>
  </ul>
</template>
<style scoped>
.pager {
  margin: 20px 0px;
  overflow: hidden;
  user-select: none;
}
.pager li {
  width: 30px;
  height: 28px;
  margin: 0 5px;
  background-color: #f4f4f5;
  float: left;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  color: #606266;
  font-size: 13px;
  font-weight: 700;
  border-radius: 4px;
}
.pager li:hover {
  color: #409eff;
}
.active {
  background-color: #409eff !important;
  color: #fff !important;
}
button {
  width: 30px;
  height: 28px;
  border: none;
  outline: none;
  cursor: pointer;
  background: #f4f4f5;
  float: left;
}
.disabled {
  cursor: not-allowed;
  color: #c0c4cc;
}
</style>
<script>
export default {
  name: "",
  data() {
    return {
      /** 当前码数 */
      currentPage: 1,
      pagers_con: [] /** 分页条数数组 */,
      totalPage: Math.ceil(this.total / this.display) /** 总页数 */,
      pagegroup: 6 /** 分页条数 */,
      prev_disabled: true,
      next_disabled: false
    };
  },
  props: {
    /** 总条目数 */
    total: {
      type: Number,
      default: 0
    },
    /** 一页显示多少数据 */
    display: {
      type: Number,
      default: 10
    }
    /**分页条数 */
    // pagegroup: {
    //   type: Number,
    //   default: 6
    // }
  },
  watch: {
    /** 监听total total数据变化重新渲染分页主组件 */
    total() {
      this.totalPage = Math.ceil(this.total / this.display);
      /** 注意：this.pagegroup + 1 是为了避免 1,2,3,4,5,6,...7 这种情况*/
      this.pagers_con = [];
      /** 当计算的分页数小于设定的分页条数则全部显示出来 */
      if (this.totalPage <= this.pagegroup + 1) {
        for (let i = 0; i < this.totalPage; i++) {
          this.pagers_con.push(i + 1);
        }
      }
      /** 当计算的分页数大于设定的分页数是*/
      if (this.totalPage > this.pagegroup + 1) {
        for (let i = 0; i < this.pagegroup; i++) {
          this.pagers_con.push(i + 1);
        }
        this.pagers_con.push("...");
        this.pagers_con.push(this.totalPage);
      }
    }
  },
  methods: {
    /** 上翻  */
    prev() {
      var page = this.currentPage - 1;
      page === 1 ? (this.prev_disabled = true) : (this.prev_disabled = false);
      page === this.totalPage
        ? (this.next_disabled = true)
        : (this.next_disabled = false);
        
      this.$emit("prev", page);
      /** 如果总页数小于等于指定的分页条数+1  */
      /** 注意：this.pagegroup + 1 是为了避免 1,2,3,4,5,6,...7 这种情况*/
      if (this.totalPage <= this.pagegroup + 1) {
        this.currentPage = this.currentPage - 1;
        return;
      } else {
        /** 点击上一页大于等于4都不折叠 */
        if (page === 4) {
          this.currentPage = this.currentPage - 1;
          this.pagers_con = [1, 2, 3, 4, 5, 6, "...", this.totalPage];
          return;
        }
        if (page <= 3) {
          this.currentPage = this.currentPage - 1;
          return;
        }
        if (page >= this.totalPage - 3) {
          this.currentPage = this.currentPage - 1;
          return;
        }
        this.currentPage = this.currentPage - 1;
        this.pagers_con = [
          1,
          "....",
          page - 2,
          page - 1,
          page,
          page + 1,
          page + 2,
          "...",
          this.totalPage
        ];
      }
    },
    next(event) {
      var page = this.currentPage + 1;
      page === 1 ? (this.prev_disabled = true) : (this.prev_disabled = false);
      page === this.totalPage
        ? (this.next_disabled = true)
        : (this.next_disabled = false);
        
      this.$emit("next", page);
      
      if (page <= 4) {
        this.currentPage = page;
        return;
      }
      if (page == this.totalPage - 3) {
        this.currentPage = page;
        this.pagers_con = [
          1,
          "....",
          page - 2,
          page - 1,
          page,
          page + 1,
          page + 2,
          this.totalPage
        ];
        return;
      }
      if (page >= this.totalPage - 3) {
        this.currentPage = page;
        return;
      }
      this.currentPage = page;
      this.pagers_con = [
        1,
        "....",
        page - 2,
        page - 1,
        page,
        page + 1,
        page + 2,
        "...",
        this.totalPage
      ];
    },
    changPage(event) {
      const target = event.target;
      let newPage = Number(target.textContent); // 点击后新的页数
      if (isNaN(newPage)) {
        return;
      }
      newPage === 1
        ? (this.prev_disabled = true)
        : (this.prev_disabled = false);
      newPage === this.totalPage
        ? (this.next_disabled = true)
        : (this.next_disabled = false);
      /** 点击后添加选中样式 */
      $(".active").removeClass("active");
      target.className = "active";
      this.currentPage = newPage;
      this.$emit("changePage", this.currentPage);
      var total = this.totalPage;
      /** 当总页数小于默认分页条数 直接返回出去 */
      if (total <= this.pagegroup + 1) {
        return;
      }
      /** 当点击的页数小于等于4时，保持不变 */
      if (newPage <= 4) {
        this.pagers_con = [1, 2, 3, 4, 5, 6, "...", total];
        return;
      }
      /** 当点击的页数大于等于5时，分页开始折叠 */
      if (newPage <= 5) {
        this.pagers_con = [1, "....", 3, 4, 5, 6, 7, "...", total];
        return;
      }
      /** 点击的页数大于等于总页数-3 说明已到设定的尽头 显示后面所有的页数 */
      if (newPage >= total - 3) {
        this.pagers_con = [
          1,
          "....",
          total - 5,
          total - 4,
          total - 3,
          total - 2,
          total - 1,
          total
        ];
        return;
      }
      /** 以上条件都不满足 */
      this.pagers_con = [
        1,
        "....",
        newPage - 2,
        newPage - 1,
        newPage,
        newPage + 1,
        newPage + 2,
        "...",
        total
      ];
    }
  },
  mounted() {
    /** 注意：this.pagegroup + 1 是为了避免 1,2,3,4,5,6,...7 这种情况*/
    /** 当计算的分页数小于设定的分页条数则全部显示出来 */
    if (this.totalPage <= this.pagegroup + 1) {
      for (let i = 0; i < this.totalPage; i++) {
        this.pagers_con.push(i + 1);
      }
    }
    /** 当计算的分页数大于设定的分页数是*/
    if (this.totalPage > this.pagegroup + 1) {
      for (let i = 0; i < this.pagegroup; i++) {
        this.pagers_con.push(i + 1);
      }
      this.pagers_con.push("...");
      this.pagers_con.push(this.totalPage);
    }
  }
};
</script>