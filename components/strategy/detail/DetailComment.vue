<template>
  <el-row class="detail-comment">
    <h4>评论</h4>
    <el-tag class="reply-tag" closable type="info">
      回复 @谁
    </el-tag>
    <el-input
      class="detail-comment-input"
      type="textarea"
      :rows="2"
      resize="none"
      placeholder="说点什么吧..."
      v-model="commentContent"
    />
    <el-row class="detail-comment-ctrl" type="flex" justify="space-between">
      <div class="detail-comment-ctrl__pics">
        <el-upload
          list-type="picture-card"
          name="files"
          ref="picUploader"
          :action="uploadURL"
          :on-preview="handlePictureCardPreview"
          :on-remove="handlePicRemove"
          :on-success="uploadPicSuccess"
          :on-error="uploadPicError"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="image preview">
        </el-dialog>
      </div>
      <div>
        <el-button type="primary" size="small" @click="postComment">提交</el-button>
      </div>
    </el-row>
    <DetailCommentList />
    <el-row class="detail-comment-pagination" type="flex" justify="center" align="middle">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'DetailComment',
  data () {
    return {
      commentContent: '',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage: 1,
      pics: []
    }
  },
  methods: {
    uploadPicSuccess (resData) {
      const files = resData.map(v => {
        v.url = this.baseURL + v.url
        return v
      })
      // 上传成功后将响应文件对象存储下来
      this.pics.push(...resData)
    },
    uploadPicError () {
      this.$message.error('上传文件失败')
    },
    handlePicRemove (file) {
      const delIndex = this.pics.findIndex(v =>
        v.id === file.response[0].id
      )
      this.pics.splice(delIndex, 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    async postComment () {
      let content = this.commentContent
      let pics = this.pics
      if (content === '' && pics.length === 0) {
        return this.$message.warning('评论信息不能为空')
      }

      const [err, res] = await this.$api.postComment({
        content,
        pics,
        post: this.$route.query.id
      })

      if (err) {
        return this.$message.error('发表评论失败')
      }

      this.$message.success('发表评论成功')
      content = ''
      pics = []
      this.$refs.picUploader.clearFiles()
    }
  },
  computed: {
    baseURL() {
      return this.$axios.defaults.baseURL
    },
    uploadURL () {
      return this.baseURL + '/upload'
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-comment {
  h4 {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 400;
  }
  &-input {
    margin-bottom: 10px;
  }
  &-ctrl {
    margin-bottom: 30px;
    &__pics ::v-deep {
      .el-upload {
        $size: 100px;
        width: $size;
        height: $size;
        line-height: $size;

        &-list__item {
          width: $size;
          height: $size;
        }
      }
    }
  }
  &-pagination {
    margin-top: 10px;
  }
  .reply-tag {
    margin-bottom: 10px;
  }
}
</style>
