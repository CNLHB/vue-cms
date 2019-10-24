<template>
  <section class="listMain">
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="filterList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.aid)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.aid)">删除</Button>
        </template>
      </Table>
      <!-- count: 32
current_page: 1
per_page: 10
total: 32
      total_pages: 4-->
      <section class="page">
        <Page
          :total="page.total"
          :page-size="page.per_page"
          :current="page.current_page"
          show-total
          @on-change="handlePage"
        ></Page>
      </section>
    </section>
  </section>
</template>

<script>
import merge from "webpack-merge";
import { mapState, mapActions } from "vuex";

export default {
  name: "list",
  data() {
    return {
      page: {
        count: 39,
        current_page: 1,
        per_page: 10,
        total: 39
        // total_pages: 4
      },
      list: [],
      page: {},
      currentPage: 1,
      columns: [
        {
          title: "编号",
          key: "aid",
          width: 80,
          align: "center"
        },
        {
          title: "物品名称",
          key: "assetName",
          align: "center"
        },
        {
          title: "分类ID",
          width: 100,
          align: "center",
          key: "cateId"
        },
        {
          title: "分类名称",
          align: "center",
          key: "cateName",
          width: 100
        },
        // {
        //   title: "使用人",
        //   width: 100,
        //   align: "center",
        //   key: "user"
        // },
        {
          title: "价格",
          width: 100,
          align: "center",
          key: "price"
        },
        {
          title: "规格型号",
          width: 100,
          align: "center",
          key: "brand"
        },
        {
          title: "数量",
          width: 100,
          align: "center",
          key: "count"
        },
        {
          title: "状态",
          width: 100,
          align: "center",
          key: "status"
        },
        {
          title: "创建时间",
          width: 150,
          key: "payTime",
          align: "center"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  },
  computed: {
    filterList() {
      return this.list.length > this.currentPage * 10
        ? this.list.slice((this.currentPage - 1) * 10, this.currentPage * 10)
        : this.list.slice((this.currentPage - 1) * 10);
    }
  },
  async mounted() {
    if (this.$route.params.id) {
      this.getCateList();
      return;
    }
    this._getArticleList();
  },
  methods: {
    ...mapActions({
      getArticleList: "article/getArticleList",
      destroyArticle: "article/destroyArticle",
      getCategoryArticle: "category/getCategoryArticle"
    }),

    // 获取文章
    async _getArticleList(size = 10) {
      // let {page, desc, category_id, keyword} = this.$route.query;
      const res = await this.getArticleList({
        pageNum: this.currentPage,
        pageSize: size
      });

      //   this.list = res.data.data.data;
      //   this.page = res.data.data.meta;
    },
    async getCateList() {
      if (this.$route.params.id) {
        let {
          data: { data: lists }
        } = await this.getCategoryArticle({ id: this.$route.params.id });
        let cateName = lists[0].cateName;
        this.page = {
          count: lists[0].assets.length,
          current_page: 1,
          per_page: 10,
          total: lists[0].assets.length
        };
        this.list = lists[0].assets.map(item => {
          return {
            aid: item.aid,
            assetName: item.assetName,
            cateName: cateName,
            brand: item.brand,
            remark: item.remark,
            userId: item.userId,
            price: item.price,
            payTime: item.payTime,
            count: item.count,
            status: item.status,
            image: item.image,
            cateId: item.cateId
          };
        });
        return;
      }
    },
    // 切换分页
    handlePage(page) {
      console.log(page);
      if (this.$route.params.id) {
        this.currentPage = page;
        return;
      }

      this.$router.replace({
        query: merge(this.$route.query, {
          page
        })
      });
      this.currentPage = page;
      this._getArticleList();
    },
    // 更新
    update(id) {
      this.$router.push(`/goods/update/${id}`);
    },
    // 删除分类
    destroy(id) {
      console.log(id);
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除此物品吗？</p>",
        loading: true,
        onOk: async () => {
          try {
            await this.destroyArticle(id);
            this.$Message.success("删除成功");
            this._getArticleList();
          } catch (e) {
            console.log(e);
            this.$Message.error(e);
          } finally {
            this.$Modal.remove();
          }
        },
        onCancel: () => {
          this.$Message.warning("取消！");
        }
      });
    }
  }
};
</script>

<style scoped>
.page {
  padding: 32px 0;
  text-align: center;
}
.listMain {
  min-width: 1200px;
}
</style>
