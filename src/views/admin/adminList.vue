<template>
  <section>
      <!-- admin.list -->
    <Table border :columns="columns" :data="list1">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
      </template>
    </Table>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import list from '../../api/admin'

export default {
  components: {},

  data() {
    return {
      page: null,
      list1:[
      {
        id: 1,
        nickName: "张三",
        keyLevel: 1,
        createTime: Date.now()
      }
    ],
      columns: [
        {
          title: "ID",
          key: "id",
          width: 80,
          align: "center"
        },
        {
          title: "管理员昵称",
          key: "nickName"
        },
        {
          title: "管理员权限",
          key: "keyLevel"
        },
        {
          title: "创建时间",
          key: "createTime"
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
    //获取管理员列表
    this.getList([
      {
        id: 1,
        nickName: "张三",
        keyLevel: 1,
        createTime: Date.now()
      }
    ]);
  },
  computed: {
    ...mapState(["admin"])
  },

  methods: {
    ...mapActions({
        getList:"admin/adminList",
        deleteAdmin: 'admin/deleteAdmin'
        }),
    ...mapMutations({
    //   getList: "admin/SET_ADMIN_LIST"
    }),
    // 删除分类
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
    }
  }
};
</script>

<style scoped>
h1 {
  font-weight: normal;
}
</style>
