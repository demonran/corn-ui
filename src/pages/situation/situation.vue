<style lang="less" scoped>
.textCenter{
  text-align: center;
}
.line{
  border-top:1px solid #e8e8e8;
  margin:20px 0;
}
.btn{
  margin-top:10px;
}
.bbox{
  display: flex;
  flex-wrap:wrap;

  .gbtn{
    margin-bottom:20px;

flex-basis: 23%;
margin:1%;

  }
}

</style>

<template>
  <div>

    <div>
      <a-row style="margin: 0 -12px">
        <a-col style="padding: 0 12px" :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="project-list" :loading="loading" style="margin-bottom: 24px;" :bordered="false" :body-style="{padding: 0}">
            <a-card :bordered="false" class="textCenter">
              <a-row>
                <a-col :sm="8" :xs="18">
                  <head-info title="今日报名收入" content="¥3920" :bordered="true"/>
                  <a-button class="btn">查看</a-button>
                </a-col>
                <a-col :sm="8" :xs="18">
                  <head-info title="今日新增学生" content="323" :bordered="true"/>
                  <a-button class="btn">查看</a-button>
                </a-col>
                <a-col :sm="8" :xs="18">
                  <head-info title="今日到校学生" content="24"/>
                  <a-button class="btn" type="primary">考勤</a-button>
                </a-col>
              </a-row>
              <div class="line"></div>
              <a-row>
                <a-col :sm="8" :xs="18">
                  <head-info title="今日访客" content="¥20" :bordered="true"/>
                  <a-button class="btn">查看</a-button>
                </a-col>
                <a-col :sm="8" :xs="18">
                  <head-info title="提现申请" content="3" :bordered="true"/>
                  <a-button class="btn">查看</a-button>
                </a-col>
                <a-col :sm="8" :xs="18">
                  <head-info title="待结算佣金" content="¥24"/>
                  <a-button class="btn">查看</a-button>
                </a-col>
              </a-row>
            </a-card>
          </a-card>
          <a-card :loading="loading" title="常用功能" :bordered="false">
            <div class="bbox" >
            <a-button class="gbtn">发布课程</a-button>
            <a-button class="gbtn">添加公开课</a-button>
            <a-button class="gbtn">发布动态</a-button>
            <a-button class="gbtn">发布作品</a-button>

            <a-button class="gbtn">发布活动</a-button>
            <a-button class="gbtn">支付配置</a-button>
            <a-button class="gbtn">小程序发布</a-button>
            <a-button class="gbtn">客服设置</a-button>
            <a-button class="gbtn">角色设置</a-button>
            </div>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title="平台消息" style="margin-bottom: 24px" :bordered="false" >
            <tip-list :list="tips"/>
          </a-card>

          <a-card :loading="loading" title="帮助中心" :bordered="false">
            <tip-list :list="help"/>
          </a-card>
        </a-col>
      </a-row>
    </div>

  </div>
</template>

<script>

import ChartCard from '../../components/card/ChartCard';
import HeadInfo from '../../components/tool/HeadInfo';
import TipList from '../../components/tool/TipList';

const tips = [];
const help = [];
for (let i = 0; i < 8; i++) {
  tips.push({
    title: '桃源村号店'+ i,
    date: '06/09'
  });
}
for (let i = 0; i < 8; i++) {
  help.push({
    title: '帮助中心'+ i,
    date: '06/09'
  });
}
export default {
  name: '概况',


  components: {ChartCard,HeadInfo,TipList},
  data () {
    return {
      tips,
      help
    };
  },
  computed: {
  },
  created () {

  },
  mounted () {

  },
  updated () {

  },
  methods: {


  }
};
</script>
