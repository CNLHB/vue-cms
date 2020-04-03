<template>
  <section>
    <div style="background:#eee;padding: 20px">
      <Card :bordered="false" class=".ivu-card-bodymy">
        <p slot="title" class="assetName">{{ asset.assetName }}</p>
        <p style="padding-bottom: 10px">分类：{{ asset.category.cateName }}</p>
        <p style="padding-bottom: 10px">品牌: {{ asset.brand }}</p>
        <p style="padding-bottom: 10px">价格： {{ asset.price }}</p>
        <p style="padding-bottom: 10px">购买时间： {{ asset.payTime }}</p>

        <div style="text-align:left"  v-for="(item, index) in imageList" :key="index">
            <img :src=" currentImage + item" :alt="item">
        </div>
        <h3>描述： {{ asset.remark }}</h3>
      </Card>
    </div>
  </section>
</template>

<script>
import merge from "webpack-merge";
import { mapState, mapActions } from "vuex";
import config from "../../config/config"
export default {
  name: "detail",
  data() {
    return {
      asset: {
        aid: null,
        assetName: "",
        brand: "",
        cateId: null,
        category: { cid: "", cateName: "", num: null, assets: null },
        count: null,
        image: "",
        modifyTime: null,
        payTime: null,
        price: null,
        remark: "",
        status: null,
        userId: null
      },
      currentImage: config.URL + "/asset/download/1?url=",

    };
  },
  computed: {
      imageList(){
          return this.asset.image.split("&")
      }
  },
  async mounted() {
    let {
      data: { data }
    } = await this.getArticle({ id: this.$route.params.id });
    this.asset = { ...data };
  },
  methods: {
    ...mapActions({
      getArticle: "article/getArticle"
    })
  }
};
</script>

<style scoped>
.assetName {
  font-size: 18px;
}
.ivu-card-bodymy{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>
