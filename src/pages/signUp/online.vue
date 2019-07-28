<template>
  <page-layout  title="线上报名">
    <div slot="action">
      <a-button type="primary" @click="exportData" icon="export">导出数据</a-button>
    </div>

    <a-card :body-style="{padding: '10px 10px'}" :bordered="true">
    <div class="search">
      <a-form layout="inline" :form="form" style="float: right" @submit="submitClick">
        <a-form-item
          label="姓名">
          <a-input class="style_input" placeholder="请输入姓名" v-decorator="['name']"/>
        </a-form-item>
        <a-form-item
          id="type"
          label="类型">
          <a-select class="style_input" placeholder="请选择" :allowClear="true" v-decorator="['type']">
            <a-select-option :value="1">类型1</a-select-option>
            <a-select-option :value="2">类型2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="时间">
          <a-range-picker
            v-decorator="['time']"
            class="style_input"
            format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item
          label="状态">
          <a-select class="style_input" placeholder="请选择" :allowClear="true" v-decorator="['status']">
            <a-select-option :value="1">状态1</a-select-option>
            <a-select-option :value="2">状态2</a-select-option>
          </a-select>
        </a-form-item>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button style="margin-left: 8px" @click="resetClick">重置</a-button>
        </span>
      </a-form>
    </div>

    <a-table
      :bordered="true"
      rowKey="no"
      :pagination="onlinePagination"
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <template  slot="name" slot-scope="text">
        <div class="name_des">{{text}}</div>
      </template >
      <template  slot="info" slot-scope="text">
        <div class="info_name">{{text}}
          <div>123243</div>
        </div>
      </template >
      <template  slot="courseName" slot-scope="text">
        <div class="info_name">{{text}}
          <div>2009dsfd</div>
        </div>
      </template >
      <template  slot="courseFee" slot-scope="text">
        <div class="fee">{{text}}
          <div>已优惠：200元</div>
        </div>
      </template >
      <template  slot="reportTime" slot-scope="text">
        <div class="colum_normal">{{text}}2019.09.11 12:22
        </div>
      </template >
      <template  slot="status" slot-scope="text">
        <div class="status_pay">{{text}}
        </div>
      </template >
      <template  slot="action" slot-scope="text">
        <div class="action_class">
          <div class="build">建档</div>
          <div class="delete">删除</div>
        </div>
      </template >
    </a-table>
    </a-card>
  </page-layout >
</template>

<script>

import PageLayout from '../../layouts/PageLayout';

const columns = [
  {
    title: '序号',
    dataIndex: 'no',
    key: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    key: 'name'
  },
  {
    title: '家长信息',
    dataIndex: 'info',
    scopedSlots: {customRender: 'info'},
    key: 'info'
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    scopedSlots: {customRender: 'courseName'},
    key: 'courseName'
  },
  {
    title: '课时',
    dataIndex: 'courseTime'
  },
  {
    title: '学费',
    dataIndex: 'courseFee',
    scopedSlots: {customRender: 'courseFee'},
    key: 'courseFee'
  },
  {
    title: '支付方式',
    dataIndex: 'payType'
  },
  {
    title: '推荐人（微信号）',
    dataIndex: 'wechat'
  },
  {
    title: '报名时间',
    dataIndex: 'reportTime',
    scopedSlots: {customRender: 'reportTime'},
    key: 'reportTime'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: {customRender: 'status'},
    key: 'status'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: {customRender: 'action'},
    key: 'action'
  }
];

const dataSource = [];

for (let i = 0; i < 25; i++) {
  dataSource.push({
    key: i,
    no: i + 1,
    name: 'name:' + i,
    info: 'info:' + i,
    courseName: 'courseName:' + i,
    courseTime: 'courseTime:' + i,
    courseFee: 'courseFee:' + i,
    payType: 'payType:' + i,
    wechat: 'wechat:' + i,
    reportTime: 'reportTime:' + i,
    remark: 'remark:' + i,
    status: 'status:' + i
  });
}

export default {
  name: 'online',
  components: {PageLayout},
  data () {
    return {
      onlinePagination: {
        pageSize: 20,
        total: 50,
        current: 1,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40'],
        showTotal (total) { return `共${total}项`; },
        onShowSizeChange () {
          console.log('showSizeChange');
        }
      },
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRowKeys: [],
      selectedRows: [],
      form: this.$form.createForm(this)
    };
  },
  methods: {
    // 导出数据
    exportData () {},
    resetClick () {
      this.form.resetFields();
    },
    // 点击提交按钮
    submitClick (e) {
      // e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log('coming...', err);
        console.log('coming...', values);
        // request
      });
    },
    validateForm () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (err) {
            resolve();
            return;
          }
          resolve(values);
        });
      });
    },
    // 选中项改变
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    }
  }
};
</script>

<style lang="less" scoped>
.search{
  margin-bottom: 54px;
  .style_input{
    width: 210px;
  }
}
.name_des{
  font-size:16px;
  font-family:'PingFang SC';
  font-weight:500;
  line-height:22px;
  color:rgba(0,0,0,0.85);
  opacity:1;
}
.info_name{
  font-size:14px;
  font-family:'PingFang SC';
  font-weight:400;
  line-height:22px;
  color:rgba(0,21,41,1);
  opacity:1;
  div{
    font-size:12px;
    font-family:'PingFang SC';
    font-weight:400;
    line-height:22px;
    color:rgba(0,0,0,0.65);
    opacity:1;
  }
}
.colum_normal{
  font-size:14px;
  font-family:'PingFang SC';
  font-weight:400;
  line-height:22px;
  color:rgba(0,0,0,0.65);
  opacity:1;
}
.fee{
  font-size:16px;
  font-family:'PingFang SC';
  font-weight:600;
  line-height:22px;
  color:rgba(255,127,0,0.65);
  opacity:1;
  div{
    font-size:12px;
    font-family:'PingFang SC';
    font-weight:400;
    line-height:22px;
    color:rgba(0,0,0,0.65);
    opacity:1;
  }
}
.status_pay{
  font-size:14px;
  font-family:'PingFang SC';
  font-weight:400;
  line-height:22px;
  color:rgba(32,198,89,1);
  opacity:1;
}
.status_pay_ready{
  font-size:14px;
  font-family:'PingFang SC';
  font-weight:400;
  line-height:22px;
  color:rgba(255,183,111,1);
  opacity:1;
}.status_pay_cancel{
  font-size:14px;
  font-family:'PingFang SC';
  font-weight:400;
  line-height:22px;
  color:rgba(142,142,142,1);
  opacity:1;
}
.action_class{
  display: flex;
  flex-direction: row;
  .build{
    font-size:14px;
    font-family:'PingFang SC';
    font-weight:400;
    line-height:22px;
    color:rgba(24,144,255,1);
    opacity:1;
    padding: 5px;
    margin-left: 10px;
  }
  .delete{
    font-size:14px;
    font-family:'PingFang SC';
    font-weight:400;
    line-height:22px;
    color:rgba(234,39,39,1);
    opacity:1;
    padding: 5px;
    margin-left: 10px;
  }
}
</style>
