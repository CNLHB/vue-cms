<template>
  <section class="listMain">
    <Button
      type="primary"
      @click="toPathLink('/category/create')"
      icon="md-add"
      style="margin-bottom: 16px;"
    >新增分类</Button>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="look">
          <Button type="primary" size="small" style="margin-right: 5px" @click="look(row.cid)">查看</Button>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.cid)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.cid)">删除</Button>
        </template>
      </Table>
      <section class="page">
        <Page 
        :total="page.total" :page-size="page.per_page" :current="page.current_page" show-total
         on-change="changePage" />
      </section>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "list",
  data() {
    return {
      page: {
        count: 0,
        current_page: 1,
        per_page: 1,
        total: 0
        // total_pages: 4
      },
      currentPage:0,
      list: [
      ],
      columns: [
        {
          title: "ID",
          key: "cid",
          width: 80,
          align: "center"
        },
        {
          title: "分类名称",
          key: "cateName",
          align: "center"
        },
        {
          title: "分类下物品数量",
          key: "IemNum",
          align: "center"
        },
        {
          title: "查看分类下物品",
          slot: "look",
          width: 250,
          align: "center"
        },
        {
          title: "Action",
          slot: "action",
          width: 250,
          align: "center"
        }
      ]
    };
  },
  created() {
    this._getCategoryList({ pageNum: 1, pageSize: 10 });
  },
  methods: {
    ...mapActions({
      getCategoryList: "category/getCategoryList",
      destroyCategory: "category/destroyCategory"
    }),
    // 获取分类
    async _getCategoryList(params) {
      const { data } = await this.getCategoryList(params);
      this.page = {
        count: data.data.total,
        total: data.data.total,
        current_page: 1,
        per_page: 10
      };
      this.list = data.data.list.map(item => {
        return {
          cid: item.cid,
          IemNum: item.assets.length,
          cateName: item.cateName,
          parent_id: 0
        };
      });
    },
    // 路由跳转
    toPathLink(path) {
      this.$router.push(path);
    },
    // 更新
    update(id) {
      this.$router.push(`/category/update/${id}`);
    },
    look(id) {
        this.$router.push(`/goods/list/${id}`);
    },
    // 删除分类
    destroy(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除此分类吗？</p>",
        loading: true,
        onOk: async () => {
          try {
            await this.destroyCategory(id);
            this.$Message.success("删除成功");

            this._getCategoryList();
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
    },
    changePage(page) {
      console.log(page);
      this.$router.replace({
        query: merge(this.$route.query, {
          page
        })
      });
      this.currentPage = page;
    }
  }
  // 切换分页
};
</script>

<style scoped>
.listMain {
  min-width: 1000px;
}
.page {
  padding: 32px 0;
  text-align: center;
}
</style>
