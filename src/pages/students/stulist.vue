<template>
  <page-layout title="学员管理">
    <div slot="action">
      <a-button type="primary" @click="exportData" icon="export">导出数据</a-button>
    </div>

    <div class="top">
      <div class="item">
        本月新增
        <br />
        <label class="nunber">32</label>人
      </div>
      <div class="item">
        在读人员
        <br />
        <label class="nunber">2120</label>人
      </div>
      <div class="item">
        累计学员
        <br />
        <label class="nunber">2340</label>人
      </div>
    </div>
    <a-card :body-style="{padding: '10px 10px'}" :bordered="true">
      <div slot="title">
        <a-radio-group @change="onSelectChange" v-model="currentSelect">
          <a-radio-button :value="1">全部</a-radio-button>
          <a-radio-button :value="2">学习中</a-radio-button>
          <a-radio-button :value="3">已学完</a-radio-button>
        </a-radio-group>
      </div>
      <div class="search" slot="extra">
        <a-form layout="inline" :form="form" style="float: right" @submit="submitClick">
          <a-form-item label="姓名">
            <a-input class="style_input" placeholder="请输入姓名" v-decorator="['name']" />
          </a-form-item>
          <a-form-item id="type" label="类型">
            <a-select
              class="style_input"
              placeholder="请选择"
              :allowClear="true"
              v-decorator="['type']"
            >
              <a-select-option :value="1">类型1</a-select-option>
              <a-select-option :value="2">类型2</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="时间">
            <a-range-picker
              v-decorator="['time']"
              class="style_input"
              format="YYYY-MM-DD"
              @change="onDateChange"
            />
          </a-form-item>
          <span style="float: right; margin-top: 3px;">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetClick">重置</a-button>
          </span>
        </a-form>
      </div>

      <a-list size="large" :pagination="listPagination" :dataSource="dataSource">
        <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
          <div slot="actions">
            <a @click="checkClick">查看</a>
            <a @click="edtClick">编辑</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="stopClick">停课</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="delClick">删除</a>
                </a-menu-item>
              </a-menu>
              <a>
                更多
                <a-icon type="down" />
              </a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-head">
              <div class="left">{{firstName(item.name)}}</div>
              <div class="name">
                {{item.name}}
                <div class="age">{{item.gender}} | {{age(item.birthday)}}岁</div>
              </div>
            </div>
            <div class="list-content-item">
              <span>家长电话</span>
              <p>{{ item.guardianPhone }}（{{item.guardianName}}）</p>
            </div>
            <div class="list-content-item">
              <span>居住地址</span>
              <p>{{item.address}}</p>
            </div>
            <div class="list-content-item">
              <span>开始时间</span>
              <p>2016-06-16 14:03</p>
            </div>
            <div class="list-content-item">
              <span>状态</span>
              <p class="status_stop">{{item.status}}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "../../layouts/PageLayout";
import Student from "@/services/student";
import comm from "../mix";

export default {
  name: "offline",
  mixins: [comm],
  components: { PageLayout },
  data() {
    return {
      page: {
        pageSize: 20,
        pageNum: 1
      },
      dataSource: [],
      form: this.$form.createForm(this),
      beginDate: "",
      endDate: "",

      listPagination: {
        pageSize: 20,
        total: 50,
        //         current: 1,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        showTotal(total) {
          return `共${total}项`;
        },
        onChange(current, count) {
          // 页码改变的回调，参数是改变后的页码及每页条数
          console.log("change", current + ":" + count);
        },
        onShowSizeChange(current, count) {
          // pageSize 变化的回调
          console.log("showSizeChange", current + ":" + count);
        }
      },

      currentSelect: 1, // 全部：1；学习中：2；已学完：3
      test: ""
    };
  },
  mounted() {
    const that = this;
    this.listPagination.onChange = (index, pageSize) => {
      // 页码改变的回调，参数是改变后的页码及每页条数
      that.page.pageNum = index;
      that.page.pageSize = pageSize;

      // console.log("change", current + ":" + count);
    };
    this.listPagination.onShowSizeChange = (index, pageSize) => {
      // pageSize 变化的回调
      that.page.pageNum = index;
      that.page.pageSize = pageSize;
      that.fetchData();
      // console.log("showSizeChange", current + ":" + count);
    };
    this.fetchData();
  },

  computed: {

  },

  methods: {
    // 点击全部学习中的已学完的
    onSelectChange(e) {
      const value = e.target.value;
    },
    firstName(name) {
      return name ? name.substr(0, 1) : '无';
    },
    age(birthday) {
      if (!birthday) {
        return 0;
      }
      let yearNow = new Date().getFullYear();
      let birthYear = parseInt(birthday.substr(0,4));
      return yearNow - birthYear;
    },
    // 请求列表数据
    async fetchData(params = {}) {
      this.showLoading();

      let res = await Student.list(params);
      console.log(res);
      this.hideLoading();
      if (res.errorNo != 200) {
        this.toast(res.errorDesc, true);
        return;
      }
      this.dataSource = res.result.content;
      this.listPagination.total = res.result.total;
      console.log("datasource:", this.dataSource);
    },
    // 点击查看
    checkClick() {},
    // 点击停课
    stopClick() {},
    // 点击编辑
    edtClick(data) {
      this.toast("点击编辑");
    },
    // 删除点击
    async delClick(id) {
      this.toast("删除点击");
      //       this.showLoading();
      //       let res = await delOffline({ id });
      //       console.log(res);
      //       this.hideLoading();
      //       if (res.errorNo != 200) {
      //         this.toast(res.errorDesc, true);
      //         return;
      //       }
      //       this.toast("删除成功了");
    },
    // 导出数据
    exportData() {},
    // 重置
    resetClick() {
      this.form.resetFields();
    },
    // 日期改变
    onDateChange(date, dateString) {
      if (dateString) {
        this.beginDate = dateString[0];
        this.endDate = dateString[1];
      }
    },
    // 点击提交按钮
    submitClick(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log("coming...", values);
        //         this.fetchData(values);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0;
  border: 1px solid #f8f8f8;
  margin: 20px 0 10px;
  background-color: white;
  border-radius: 5px;
  .item {
    text-align: center;
    width: 100%;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
    opacity: 1;
    .nunber {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 32px;
      color: rgba(0, 0, 0, 0.85);
      opacity: 1;
    }
  }
}
.search {
  .style_input {
    width: 210px;
  }
}
.list-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  .list-content-head {
    position: relative;
    display: inline-flex;
    width: 100%;
    margin-left: 20px;
    .left {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #597ef7;
      text-align: center;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 48px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
    .name {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 22px;
      color: rgba(0, 21, 41, 1);
      opacity: 1;
      margin-left: 10px;
      .age {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: rgba(0, 21, 41, 1);
        margin-top: 6px;
      }
    }
  }
  .list-content-item {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    width: 100%;
    margin-left: 20px;
    span {
      line-height: 20px;
      font-size: 14px;
      font-family: SFUIText-Regular;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      opacity: 1;
    }
    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 22px;
      color: rgba(0, 21, 41, 1);
      opacity: 1;
    }
    .status_ing {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 22px;
      color: rgba(82, 196, 26, 1);
    }
    .status_finish {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 22px;
      color: rgba(172, 172, 172, 1);
    }
    .status_stop {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 22px;
      color: rgba(255, 167, 0, 1);
    }
  }
}
</style>
