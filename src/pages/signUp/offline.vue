<template>
  <page-layout title="线下报名">
    <div slot="action">
      <a-button type="primary" @click="exportData" icon="export">导出数据</a-button>
    </div>

    <a-card :body-style="{padding: '10px 10px'}" :bordered="true">
      <div slot="title">
        <a-button type="primary" icon="plus" @click="addClick">添加</a-button>
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
          <a-form-item label="状态">
            <a-select
              class="style_input"
              placeholder="请选择"
              :allowClear="true"
              v-decorator="['status']"
            >
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
        rowKey="id"
        :pagination="offlinePagination"
        :columns="columns"
        :dataSource="dataSource"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="id" slot-scope="text,record,index">{{index+1}}</span>
        <template slot="studentName" slot-scope="text">
          <div class="name_des">{{text}}</div>
        </template>
        <template slot="info" slot-scope="text">
          <div class="info_name">
            {{text}}
            <div>123243</div>
          </div>
        </template>
        <template slot="courseName" slot-scope="text,record">
          <div class="info_name">
            {{record.courseSubTitle}}
            <div>{{record.courseTitle}}</div>
          </div>
        </template>
        <template slot="price" slot-scope="text">
          <div class="fee">{{text}}</div>
        </template>
        <!-- <template  slot="reportTime" slot-scope="text">
        <div class="colum_normal">{{text}}2019.09.11 12:22
        </div>
        </template >-->
        <template slot="action" slot-scope="text">
          <div class="action_class">
            <div class="build">编辑</div>
            <div class="build">建档</div>
            <div class="delete">删除</div>
          </div>
        </template>
      </a-table>
    </a-card>
    <a-modal
      :title="dialogTitle"
      v-model="dialogVisible"
      centered
      @ok="handleOk"
      @cancel="handleCancel"
      width="600px"
    >
      <a-form :form="diaForm" @submit="diaSubmit">
        <a-form-item label="学生姓名" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-input placeholder="请输入学生姓名" v-decorator="['name']" class="dia_item" />
        </a-form-item>
        <a-form-item label="时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-date-picker v-decorator="['date']" format="YYYY-MM-DD" class="dia_item" />
        </a-form-item>
      </a-form>
    </a-modal>
  </page-layout>
</template>

<script>
import PageLayout from '../../layouts/PageLayout';
import { offlineList } from '@/services/signup';
import comm from '../mix';

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' },
    key: 'id',
    width: 70
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
    scopedSlots: { customRender: 'studentName' },
    key: 'studentName',
    width: 120
  },
  {
    title: '家长信息',
    dataIndex: 'info',
    scopedSlots: { customRender: 'info' },
    key: 'info',
    width: 120
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    scopedSlots: { customRender: 'courseName' },
    key: 'courseName',
    width: 250
  },
  {
    title: '课时',
    dataIndex: 'lesson',
    key: 'lesson',
    width: 100
  },
  {
    title: '学费',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' },
    key: 'price',
    width: 120
  },
  {
    title: '支付方式',
    dataIndex: 'payType',
    key: 'payType',
    width: 120
  },
  {
    title: '报名时间',
    dataIndex: 'beginDate',
    scopedSlots: { customRender: 'beginDate' },
    key: 'beginDate',
    width: 220
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    key: 'action',
    width: 200
  }
];

export default {
  name: 'offline',
  mixins: [comm],
  components: { PageLayout },
  data () {
    return {
      columns: columns,
      page: {
        pageSize: 20,
        currentPage: 1
      },
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],
      form: this.$form.createForm(this),
      beginDate: '',
      endDate: '',

      offlinePagination: {
        pageSize: 20,
        total: 50,
        current: 1,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40'],
        showTotal (total) {
          return `共${total}项`;
        },
        onChange (current, count) {
          // 页码改变的回调，参数是改变后的页码及每页条数
          console.log('change', current + ':' + count);
        },
        onShowSizeChange (current, count) {
          // pageSize 变化的回调
          console.log('showSizeChange', current + ':' + count);
        }
      },
      dialogVisible: false,
      dialogTitle: '新增', // 编辑
      diaForm: this.$form.createForm(this)
    };
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    // 请求列表数据
    async fetchData (filter) {
      this.showLoading();
      var param = null;
      if (filter) {
        param = Object.assign(filter);
        delete param['time'];
        param.beginDate = this.beginDate;
        param.endDate = this.endDate;
      }
      let res = await offlineList(
        Object.assign(this.page, filter ? param : {})
      );
      console.log(res);
      this.hideLoading();
      if (res.errorNo != 200) {
        this.toast(res.errorDesc, true);
        return;
      }
      this.dataSource =
        this.page.currentPage === 1
          ? res.result.list
          : this.dataSource.concat(res.result.list);
    },
    // dialog 确认
    handleOk (e) {
      e.preventDefault();
      this.diaForm.validateFields((err, values) => {
        console.log('coming..handleOk.', values);
      });
    },
    // dialog 取消
    handleCancel () {
      this.dialogVisible = false;
    },
    // 导出数据
    exportData () {},
    // 重置
    resetClick () {
      this.form.resetFields();
    },
    // 日期改变
    onDateChange (date, dateString) {
      if (dateString) {
        this.beginDate = dateString[0];
        this.endDate = dateString[1];
      }
    },
    // 点击添加
    addClick () {
      this.dialogVisible = true;
    },
    // 点击提交按钮
    submitClick (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log('coming...', values);
        this.fetchData(values);
      });
    },
    // 选中项改变
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },

    diaSubmit () {}
  }
};
</script>

<style lang="less" scoped>
.search {
  .style_input {
    width: 210px;
  }
}
.name_des {
  font-size: 16px;
  font-family: "PingFang SC";
  font-weight: 500;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
  opacity: 1;
}
.info_name {
  font-size: 14px;
  font-family: "PingFang SC";
  font-weight: 400;
  line-height: 22px;
  color: rgba(0, 21, 41, 1);
  opacity: 1;
  div {
    font-size: 12px;
    font-family: "PingFang SC";
    font-weight: 400;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.65);
    opacity: 1;
  }
}
.colum_normal {
  font-size: 14px;
  font-family: "PingFang SC";
  font-weight: 400;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.65);
  opacity: 1;
}
.fee {
  font-size: 16px;
  font-family: "PingFang SC";
  font-weight: 600;
  line-height: 22px;
  color: rgba(255, 127, 0, 0.65);
  opacity: 1;
  div {
    font-size: 12px;
    font-family: "PingFang SC";
    font-weight: 400;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.65);
    opacity: 1;
  }
}
.status_pay {
  font-size: 14px;
  font-family: "PingFang SC";
  font-weight: 400;
  line-height: 22px;
  color: rgba(32, 198, 89, 1);
  opacity: 1;
}
.status_pay_ready {
  font-size: 14px;
  font-family: "PingFang SC";
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 183, 111, 1);
  opacity: 1;
}
.status_pay_cancel {
  font-size: 14px;
  font-family: "PingFang SC";
  font-weight: 400;
  line-height: 22px;
  color: rgba(142, 142, 142, 1);
  opacity: 1;
}
.action_class {
  display: flex;
  flex-direction: row;
  .build {
    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: 400;
    line-height: 22px;
    color: rgba(24, 144, 255, 1);
    opacity: 1;
    padding: 5px;
    margin-left: 10px;
  }
  .delete {
    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: 400;
    line-height: 22px;
    color: rgba(234, 39, 39, 1);
    opacity: 1;
    padding: 5px;
    margin-left: 10px;
  }
}
.dia_item {
  width: 450px;
}
</style>
