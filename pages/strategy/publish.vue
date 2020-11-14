<template>
  <el-row class="publish w" type="flex" justify="space-between">
    <el-col class="publish-content">
      <h2>发表新攻略</h2>
      <p class="publish-content__tips">分享你的个人游记，让更多人看到哦！</p>
      <el-form>
        <el-form-item>
          <el-input v-model="title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item>
          <client-only>
            <VueEditor
              v-model="content"
              :editor-toolbar="customToolbar"
              useCustomImageHandler
              @image-added="addImage"
            />
          </client-only>
        </el-form-item>
        <el-form-item label="选择城市">
          <el-autocomplete
            class="city"
            placeholder="请搜索游玩城市"
            v-model="city"
            :fetch-suggestions="queryCity"
          />
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button size="small" type="primary" @click="publishArticle">发布</el-button>
          <span class="btn-group__side">
            或者
            <a class="save-btn" href="javascript:;" @click="saveAsDraft">保存到草稿</a>
          </span>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col class="publish-draft">
      <div class="draft-box">
        <h4>草稿箱（{{ strategicalArticleDrafts.length }}）</h4>
        <ul class="draft-box__draft-list">
          <li
            class="draft-item"
            v-for="(draft, index) in strategicalArticleDrafts"
            :key="index"
          >
            <h5 @click="editDraft(index)">{{ draft.title }}</h5>
            <el-row class="draft-item__main" type="flex" justify="space-between" align="middle">
              <p class="draft-item__date">{{ draft.date }}</p>
              <div class="draft-item__opt">
                <el-button type="text" icon="el-icon-edit" @click="editDraft(index)" />
                <el-button type="text" icon="el-icon-delete" @click="delDraft(index)" />
              </div>
            </el-row>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script>
let VueEditor
if (process.browser) {
  VueEditor = require('vue2-editor').VueEditor
}
export default {
  name: 'StrategyPublish',
  components: {
    VueEditor
  },
  data () {
    return {
      content: '',
      title: '',
      city: '',
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }],
        ['image']
      ]
    }
  },
  methods: {
    /**
     * 发送请求查询城市
     * @param {string} name 输入的查询字符串
     * @param {Function} cb 回调函数
     */
    async queryCity (name, cb) {
      if (name === '') {
        return cb([])
      }
      const [err, res] = await this.$api.getAirsCity({ name })

      if (err) {
        return cb([{ value: '数据查询失败' }])
      }

      const result = res.data.data.map(v => ({ value: v.name }))
      cb(result)
    },
    async addImage (file, Editor, cursorLocation, resetUploader) {
      const fd = new FormData()

      fd.append('files', file)

      const [err, res] = await this.$api.uploadFile(fd)

      if (err) {
        return this.$message.error('上传失败')
      }

      const imgSrc = this.$axios.defaults.baseURL + res.data[0].url
      Editor.insertEmbed(cursorLocation, 'image', imgSrc)
      resetUploader()
    },
    async publishArticle () {
      const publishItems = [
        {
          value: this.title,
          message: '标题不能为空'
        },
        {
          value: this.city,
          message: '请选择城市'
        },
        {
          value: this.content,
          message: '内容不能为空'
        }
      ]
      // 数据校验
      for (const item of publishItems) {
        if (item.value === '') {
          this.$alert(item.message, '提示', {
            type: 'warning'
          }).catch(err => err)
          return
        }
      }
      const [err, res] = await this.$api.publishStrategicalArticle({
        title: this.title,
        content: this.content,
        city: this.city
      })

      if (err) {
        return
      }

      this.$message.success('发布成功')
      this.title = ''
      this.content = ''
      this.city = ''
    },
    saveAsDraft () {
      const title = this.title

      if (title === '') {
        return this.$message.warning('标题不能为空')
      }

      // 添加日期
      const d = new Date()

      const date = [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      ].join('-')

      const draft = {
        title,
        content: this.content,
        city: this.city,
        date
      }

      this.$store.commit('strategy/addStrategicalArticleDraft', draft)
    },
    delDraft (index) {
      this.$confirm('真的要删除这个草稿吗', '警告', {
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.$store.commit('strategy/delStrategicalArticleDraft', index)
      }).catch(err => err)
    },
    editDraft (index) {
      const draft = this.strategicalArticleDrafts[index]
      this.title = draft.title
      this.content = draft.content
      this.city = draft.city
    }
  },
  computed: {
    strategicalArticleDrafts () {
      return this.$store.state.strategy.strategicalArticleDrafts
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-content {
  width: 750px;
  h2 {
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  &__tips {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .el-form {
    ::v-deep #quill-container {
      height: 400px;
    }
    .el-input {
      &.city {
        width: 200px;
      }
    }
    .btn-group {
      margin-bottom: 0;
      &__side {
        margin-left: 10px;
      }
      .save-btn {
        color: #ffa500;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
.publish-draft {
  width: 225px;
  .draft-box {
    padding: 10px;
    border: 1px solid #ddd;
    > h4 {
      margin-bottom: 10px;
      font-weight: normal;
      color: #666;
    }
    .draft-item {
      margin-bottom: 10px;
      > h5 {
        font-weight: 400;
        cursor: pointer;
        &:hover {
          color: #ffa500;
          text-decoration: underline;
        }
      }
      &__date, > h5 {
        font-size: 14px;
      }
      &__date {
        color: #999;
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
      }
      &__opt button {
        padding: 0;
        margin: 0;
        font-size: 16px;
        color: #000;
      }
    }
  }
}
</style>
