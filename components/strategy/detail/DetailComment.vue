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
          :action="uploadURL"
          :file-list="pics"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uploadPicSuccess"
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
    uploadPicSuccess (res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    postComment () {
      if (this.commentContent === '') {
        return this.$message.warning('评论信息不能为空')
      }
    }
  },
  computed: {
    uploadURL () {
      return this.$axios.defaults.baseURL + '/upload'
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
