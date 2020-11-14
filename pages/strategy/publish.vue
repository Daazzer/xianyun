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
            <VueEditor :config="config" />
          </client-only>
        </el-form-item>
        <el-form-item label="选择城市">
          <el-input
            class="city"
            placeholder="请搜索游玩城市"
            v-model="city"
          />
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button size="small" type="primary">发布</el-button>
          <span class="btn-group__side">
            或者
            <a class="save-btn" href="javascript:;">保存到草稿</a>
          </span>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col class="publish-draft">
      <div class="draft-box">
        <h4>草稿箱（2）</h4>
        <ul class="draft-box__draft-list">
          <li class="draft-item">
            <h5>新标题</h5>
            <el-row class="draft-item__main" type="flex" justify="space-between" align="middle">
              <p class="draft-item__date">2020-11-13</p>
              <div class="draft-item__opt">
                <el-button type="text" icon="el-icon-edit" />
                <el-button type="text" icon="el-icon-delete" />
              </div>
            </el-row>
          </li>
          <li class="draft-item">
            <h5>新标题</h5>
            <el-row class="draft-item__main" type="flex" justify="space-between" align="middle">
              <p class="draft-item__date">2020-11-13</p>
              <div class="draft-item__opt">
                <el-button type="text" icon="el-icon-edit" />
                <el-button type="text" icon="el-icon-delete" />
              </div>
            </el-row>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import 'quill/dist/quill.snow.css'
let VueEditor
if (process.browser) {
  VueEditor = require('vue-word-editor').default
}

export default {
  name: 'StrategyPublish',
  components: {
    VueEditor
  },
  data () {
    return {
      title: '',
      city: '',
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert){
            insert("http://localhost:3000" + res.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert){
            insert("http://localhost:3000" + res.data.url)
          }
        },

        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': 1 }, { 'header': 2 }],
            ['image']
          ]
        }
      }
    }
  },
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
    ::v-deep #editor {
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
