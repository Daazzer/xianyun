<template>
  <el-row class="detail-comment">
    <h4>评论</h4>
    <el-input
      class="detail-comment-input"
      type="textarea"
      :rows="2"
      resize="none"
      placeholder="请输入内容"
      v-model="commentVal"
    />
    <el-row class="detail-comment-ctrl" type="flex" justify="space-between">
      <div class="detail-comment-ctrl__pics">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="image preview">
        </el-dialog>
      </div>
      <div>
        <el-button type="primary" size="small">提交</el-button>
      </div>
    </el-row>
    <DetailCommentList />
  </el-row>
</template>

<script>
export default {
  name: 'DetailComment',
  data () {
    return {
      commentVal: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
    &__pics ::v-deep .el-upload {
      $size: 100px;
      width: $size;
      height: $size;
      line-height: $size;
    }
  }
}
</style>
