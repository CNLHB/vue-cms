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
          <Button type="primary" size="small" style="margin-right: 5px" @click="look(row.id)">查看</Button>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "list",
  data() {
    return {
      list: [
        {
          look: "查看",
          id: 1,
          IemNum: "11",
          name: "IT",
          parent_id: 0
        },
        {
          look: "查看",
          id: 11,
          IemNum: "12",
          name: "工具",
          parent_id: 0
        },
        {
          look: "查看",
          id: 10,
          IemNum: "5",
          name: "图书",
          parent_id: 0
        }
      ],
      page: null,
      columns: [
        {
          title: "ID",
          key: "id",
          width: 80,
          align: "center"
        },
        {
          title: "分类名称",
          key: "name",
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
    this._getCategoryList();
  },
  methods: {
    ...mapActions({
      getCategoryList: "category/getCategoryList",
      destroyCategory: "category/destroyCategory"
    }),
    // 获取分类
    async _getCategoryList() {
      const res = await this.getCategoryList();
      this.list = res.data.data;
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
    console.log(id)
    //   this.$router.push(`/goods/list/${id}`);
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
    }
  }
};
</script>

<style scoped>
.listMain {
  min-width: 1000px;
}
</style>
