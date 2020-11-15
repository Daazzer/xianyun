<template>
  <el-row class="detail-comment">
    <h4>评论</h4>
    <el-tag
      class="reply-tag"
      type="info"
      closable
      v-show="replyUsername !== ''"
      @close="cancelReply"
    >
      回复 @{{ replyUsername }}
    </el-tag>
    <el-input
      class="detail-comment-input"
      type="textarea"
      :rows="2"
      resize="none"
      placeholder="说点什么吧..."
      v-model="comment.content"
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
        <el-button
          type="primary"
          size="small"
          @click="postComment"
          :loading="isPosting"
        >提交</el-button>
      </div>
    </el-row>
    <DetailCommentList
      :comments="comments"
      @pic-preview="handlePicPreview"
      @reply-comment="handleReplyComment"
    />
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
      comments: [],
      comment: {
        content: '',
        pics: [],
        follow: '',
        post: this.$route.query.id
      },
      replyUsername: '',
      dialogImageUrl: '',
      dialogVisible: false,
      isPosting: false,
      currentPage: 1,
    }
  },
  methods: {
    async renderCommentList () {
      const articleId = this.$route.query.id
      const [err, res] = await this.$api.getComments({
        post: articleId
      })

      if (err) {
        return this.$message.error('获取文章评论失败')
      }

      this.comments = res.data.data
    },
    uploadPicSuccess (resData) {
      const files = resData.map(v => {
        v.url = this.baseURL + v.url
        return v
      })
      // 上传成功后将响应文件对象存储下来
      this.comment.pics.push(...files)
    },
    uploadPicError () {
      this.$message.error('上传文件失败')
    },
    handlePicRemove (file) {
      const pics = this.comment.pics
      const delIndex = pics.findIndex(v =>
        v.id === file.response[0].id
      )
      pics.splice(delIndex, 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePicPreview (picUrl) {
      this.dialogImageUrl = picUrl
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    async postComment () {
      const comment = this.comment
      if (comment.content === '' && comment.pics.length === 0) {
        return this.$message.warning('评论信息不能为空')
      }

      this.isPosting = true

      const [err, res] = await this.$api.postComment(comment)

      if (err) {
        this.isPosting = false
        return this.$message.error('发表评论失败')
      }

      this.$message.success('发表评论成功')
      comment.content = ''
      comment.pics = []
      this.$refs.picUploader.clearFiles()
      this.isPosting = false
      // 发送完评论后重新渲染评论列表
      this.renderCommentList()
    },
    // 评论回复
    handleReplyComment (id, nickname) {
      console.log(id, nickname)
      this.comment.follow = id
      this.replyUsername = nickname
    },
    cancelReply () {
      this.comment.follow = ''
      this.replyUsername = ''
    }
  },
  computed: {
    baseURL() {
      return this.$axios.defaults.baseURL
    },
    uploadURL () {
      return this.baseURL + '/upload'
    }
  },
  mounted () {
    this.renderCommentList()
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
