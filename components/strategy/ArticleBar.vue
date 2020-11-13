<template>
  <el-col class="strategy__article-bar">
    <ArticleBarHeader :recommendCities="recommendCities" />
    <el-row class="article-list">
      <ArticleBarItem
        v-for="strategicalArticle in strategicalArticles"
        :key="strategicalArticle.id"
        :strategicalArticle="strategicalArticle"
      />
    </el-row>
    <el-row
      class="article-pagination"
      type="flex"
      justify="center"
      align="middle"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </el-row>
  </el-col>
</template>

<script>
export default {
  name: 'ArticleBar',
  data () {
    return {
      currentPage4: 4,
      // recommendCities: []
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  computed: {
    strategicalArticles () {
      return this.$store.state.strategy.strategicalArticles
    },
    recommendCities () {
      return this.$store.state.strategy.recommendCities
    }
  },
  async mounted () {
    // 如果路由有 city 参数则返回对应城市的文章
    const city = this.$route.query.city
    const [err, res] = await this.$api.getStrategicalArticles({
      city
    })

    if (err) {
      return this.$message.error('获取文章数据失败，发生错误')
    }

    this.$store.commit('strategy/setStrategicalArticles', res.data.data)
  }
}
</script>

<style lang="scss" scoped>
$linkColor: #ffa500;
.strategy__article-bar {
  width: 700px;
}
.article-pagination {
  margin-top: 10px;
}
</style>
