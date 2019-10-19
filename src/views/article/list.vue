<template>
  <section class="listMain">
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>
<!-- count: 32
current_page: 1
per_page: 10
total: 32
total_pages: 4 -->
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
      list: [
        {
          user: "liaoxx",
          model: "联想",
          price: 6999,
          category_detail: {
            id: 4
            // key: "前端、javascript",
            // name: "javascript",
            // parent_id: 0
          },
          category_id: "4",
          department: "实验室",
          created_at: "2019-10-15",
          id: 42,
          nickName: "笔记本电脑",
          num:3,
          status: '使用中'
        }
      ],
      page: {},
      currentPage: 1,
      columns: [
        {
          title: "编号",
          key: "id",
          width: 80,
          align: "center"
        },
        {
          title: "物品名称",
          key: "nickName"
        },
            {
              title: "分类ID",
              width: 100,
              align: "center",
              key: "category_id"
            },
        {
          title: "使用部门",
          align: "center",
          key: "department",
          width: 100
        },
        {
          title: "使用人",
          width: 100,
          align: "center",
          key: "user"
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
          key: "model"
        },
                {
          title: "数量",
          width: 100,
          align: "center",
          key: "num"
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
          key: "created_at",
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
  created() {
    this._getArticleList();
  },
  methods: {
    ...mapActions({
      getArticleList: "article/getArticleList",
      destroyArticle: "article/destroyArticle"
    }),
    // 获取文章
    async _getArticleList() {
      // let {page, desc, category_id, keyword} = this.$route.query;

      const res = await this.getArticleList({
        page: this.currentPage
      });

      this.list = res.data.data.data;
      this.page = res.data.data.meta;
    },
    // 切换分页
    handlePage(page) {
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
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除此文章吗？</p>",
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
