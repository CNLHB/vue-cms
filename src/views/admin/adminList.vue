<template>
  <section class="listMain">
    <!-- admin.list -->
    <Table border :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
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
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import list from "../../api/admin";
import admin from "../../api/admin";
export default {
  components: {},

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
      columns: [
        {
          title: "ID",
          key: "id",
          width: 80,
          align: "center"
        },
        {
          title: "管理员昵称",
          key: "userName",
          align: "center"
        },
        {
          title: "管理员权限",
          key: "userPrivilege",
          align: "center"
        },
        // {
        //   title: "创建时间",
        //   key: "createTime",
        //    align: "center"
        // },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  },
  async created() {
    //获取管理员列表
    let {
      data: { data: list }
    } = await admin.list("root", 1, 10);

    console.log(list);
    //     count: 39,
    // current_page: 1,
    // per_page: 10,
    // total: 39,
    // // total_pages: 4
    this.page = {
      count: list.total,
      current_page: list.pageNum,
      total: list.total,
      per_page: 10
    };
    let adminList = list.list.map(item => {
      return {
        id: item.id,
        userName: item.userName,
        userPrivilege: item.userPrivilege == "暂无权限限制" ? 16 : 1
      };
    });
    this.list = adminList;
    // this.getList(adminList);
  },
  computed: {
    ...mapState(["admin"])
  },

  methods: {
    ...mapActions({
      getList: "admin/adminList",
      deleteAdmin: "admin/deleteAdmin"
    }),
    ...mapMutations({
      //   getList: "admin/SET_ADMIN_LIST"
    }),
    // 删除
    destroy(id) {
      var slef = this;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除此管理员吗？</p>",
        loading: true,
        onOk: async () => {
          try {
            await this.deleteAdmin(id);
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
    }, // 切换分页
    handlePage(page) {
      this.$router.replace({
        query: merge(this.$route.query, {
          page
        })
      });
      this.currentPage = page;
      this._getArticleList();
    }
  }
};
</script>

<style scoped>
.page {
  padding: 32px 0;
  text-align: center;
}
h1 {
  font-weight: normal;
}
.listMain {
  min-width: 700px;
}
</style>
