<template>
  <el-row class="detail w" type="flex" justify="space-between">
    <el-col class="detail__main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/strategy">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h1>
      <el-row class="detail-info">
        <span>攻略：2019-05-22 10:57</span>
        <span>阅读：14597</span>
      </el-row>
      <el-row class="detail-content">大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</el-row>
      <el-row class="detail-ctrl" type="flex" justify="center" align="middle">
        <div class="detail-ctrl__item">
          <i class="iconfont icon-pinglun"></i>
          <p>评论(8)</p>
        </div>
        <div class="detail-ctrl__item">
          <i class="iconfont icon-iconfontzhizuobiaozhun20"></i>
          <p>分享</p>
        </div>
      </el-row>
      <DetailComment />
    </el-col>
    <el-col class="detail__aside">
      <h4>相关攻略</h4>
      <ul class="recommend-list">
        <li class="recommend-item">
          <a href="#">
            <el-image class="recommend-item__image" src="http://p1-q.mafengwo.net/s11/M00/B4/92/wKgBEFt6ZqaAJeK7AAbj58wpNlY06.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90" />
            <el-row class="recommend-item__content" type="flex" justify="space-between">
              <h5>小蛮腰广州塔，怎么玩才不遗憾？</h5>
              <p>2019-05-22 1:16 阅读 695</p>
            </el-row>
          </a>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'StrategyDetail'
}
</script>

<style lang="scss" scoped>
.detail {
  &__main {
    width: 700px;
  }

  &__aside {
    width: 280px;
  }

  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }

  &-info {
    padding: 20px;
    text-align: right;
    color: #999;
  }

  &-content {
    line-height: 1.5;
  }

  &-ctrl {
    padding: 50px 0 30px;

    &__item {
      margin: 0 20px;
      text-align: center;
      cursor: pointer;
      i {
        display: block;
        font-size: 40px;
        color: #ffa500;
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }

  &__aside {
    > h4 {
      padding-bottom: 10px;
      font-size: 18px;
      font-weight: 400;
      border-bottom: 1px solid #ddd;
    }

    .recommend-item {
      > a {
        display: flex;
        justify-content: space-between;
        height: 80px;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
      }
      &__image {
        flex-shrink: 0;
        width: 100px;
        height: 80px;
        margin-right: 10px;
      }
      &__content {
        flex: 1;
        flex-direction: column;
        h5 {
          height: 2.8em;
          line-height: 1.4em;
          font-size: 16px;
          font-weight: 400;
        }
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
