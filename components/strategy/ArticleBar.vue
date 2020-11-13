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
      strategicalArticles: [],
      recommendCities: []
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
  async mounted () {
    const [err, res] = await this.$api.getStrategicalArticles()

    if (err) {
      return this.$message.error('获取文章数据失败，发生错误')
    }

    this.strategicalArticles = res.data.data

    // 在文章头部搜索栏显示前三个城市
    for (let i = 0; i < 3; i++) {
      this.recommendCities.push(this.strategicalArticles[i].cityName.replace('市', ''))
    }
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
