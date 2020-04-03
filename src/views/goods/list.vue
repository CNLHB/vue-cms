
<template>
  <section class="listMain">
    <section>
      <Table border :columns="columns" :data="filterList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row}" slot="action1">
          <Button type="primary" size="small" @click="abink(row.aid)">查看</Button>
        </template>
        <template slot-scope="{ row}" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.aid)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.aid)">删除</Button>
        </template>
      </Table>
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
        count: 0,
        current_page: 1,
        per_page: 10,
        total: 0
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
        // {
        //   title: "状态",
        //   width: 100,
        //   align: "center",
        //   key: "status"
        // },
        {
          title: "创建时间",
          width: 150,
          key: "payTime",
          align: "center"
        },
                
        {
          title: "详情",
          slot: "action1",
          width: 150,
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
      if (this.$route.params.id) {
        return this.list.length > this.currentPage * 10
          ? this.list.slice((this.currentPage - 1) * 10, this.currentPage * 10)
          : this.list.slice((this.currentPage - 1) * 10);
      } else {
        return this.list;
      }
    }
  },
  async mounted() {
    if (this.$route.params.id) {
      this.getCateList();
      return;
    } else {
      this._getArticleList();
    }
  },
  methods: {
    ...mapActions({
      getArticleList: "article/getArticleList",
      destroyArticle: "article/destroyArticle",
      getCategoryArticle: "category/getCategoryArticle"
    }),

    // 获取物品
    async _getArticleList(size = 10) {
      const {
        data: { data }
      } = await this.getArticleList({
        pageNum: this.currentPage,
        pageSize: size
      });
      this.page = {
        count: data.total,
        current_page: data.pageNum,
        per_page: data.pageSize,
        total: data.total
      };
      this.list = data.list.map(item => {
        return {
          aid: item.aid,
          assetName: item.assetName,
          cateName: item.category.cateName,
          brand: item.brand,
          remark: item.remark,
          userId: item.userId,
          price: item.price,
          payTime: item.payTime,
          count: item.count,
          status: item.status == 1 ? "使用中" : "未使用",
          image: item.image,
          cateId: item.cateId
        };
      });
    },
    async getCateList() {
      if (this.$route.params.id) {
        let {
          data: { data: lists }
        } = await this.getCategoryArticle({ id: this.$route.params.id });
        if(!lists){
            return
        }
        this.page = {
          count: lists.total,
          current_page: lists.pageNum,
          per_page: 10,
          total: lists.total
        };
        this.list = lists.list[0].assets.map(item => {
          return {
            aid: item.aid,
            assetName: item.assetName,
            cateName: lists.list[0].cateName,
            brand: item.brand,
            remark: item.remark,
            userId: item.userId,
            price: item.price,
            payTime: item.payTime,
            count: item.count,
            status: item.status == 1 ? "使用中" : "未使用",
            image: item.image,
            cateId: item.cateId
          };
        });
        return;
      }
    },
    // 切换分页
    handlePage(page) {
      if (this.$route.params.id) {
        this.currentPage = page;
        return;
      }
      this.currentPage = page;
      this._getArticleList();
    },
    // 更新
    update(id) {
      this.$router.push(`/goods/update/${id}`);
    },
    abink(id){
        this.$router.push("/goods/detail/" + id)
    },
    // 删除分类
    destroy(id) {
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
