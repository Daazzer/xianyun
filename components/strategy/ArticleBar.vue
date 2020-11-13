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
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      />
    </el-row>
  </el-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ArticleBar',
  methods: {
    async renderStrategicalArticles (currentPage, pageSize) {
      // 如果路由有 city 参数则返回对应城市的文章
      const city = this.$route.query.city
      const [err, res] = await this.$api.getStrategicalArticles({
        _start: currentPage,
        _limit: pageSize,
        city,
      })

      if (err) {
        return this.$message.error('获取文章数据失败，发生错误')
      }

      this.$store.commit('strategy/setTotalPage', res.data.total)

      this.$store.commit('strategy/setStrategicalArticles', res.data.data)
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.renderStrategicalArticles(this.currentPage, pageSize)
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.renderStrategicalArticles(currentPage, this.pageSize)
    }
  },
  computed: {
    ...mapState({
      strategicalArticles: state => state.strategy.strategicalArticles,
      recommendCities: state => state.strategy.recommendCities,
      currentPage: state => state.strategy.currentPage,
      pageSize: state => state.strategy.pageSize,
      totalPage: state => state.strategy.totalPage,
    })
  },
  async mounted () {
    this.renderStrategicalArticles(this.currentPage, this.pageSize)
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
