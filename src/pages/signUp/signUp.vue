<template>
  <page-layout title="报名">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
      <a-button class="btn" @click="addClick" type="primary">新建</a-button>

      <div class="search" slot="extra">
        <a-form layout="inline" :form="form" @submit="submitClick">
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
              style="width:205px;"
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
        rowKey="registrationId"
        :pagination="offlinePagination"
        :columns="columns"
        :dataSource="dataSource"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="id" slot-scope="text,record,index">{{index+1}}</span>

        <template slot="info" slot-scope="text">
          <div class="info_name">
            {{text.guardianName}}
            {{text.guardianPhoneNumber}}
          </div>
        </template>
        <template slot="courseName" slot-scope="text,record">
          <div class="info_name">

            {{record.courseName}}
          </div>
        </template>
        <template slot="price" slot-scope="text">
          <div class="fee">{{text}}</div>
        </template>
        <!-- <template  slot="reportTime" slot-scope="text">
        <div class="colum_normal">{{text}}2019.09.11 12:22
        </div>
        </template >-->
        <template slot="action" slot-scope="text,record,index">
          <div class="action_class">
            <div class="build" @click="edtClick(record)">编辑</div>
            <div class="build">建档</div>
            <div class="delete" @click="delClick(record.registrationId)">删除</div>
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
      okText="提交"
      width="600px"
    >
      <a-form :form="diaForm" @submit="diaSubmit">
        <div class="title">报名信息</div>
        <a-form-item label="学生姓名" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-input
            placeholder="请输入学生姓名"
            v-decorator="['studentName', {rules: [{ required: true, message: '请输入学生姓名' }]}]"
            class="dia_item"
            maxlength="8"
          />
        </a-form-item>
        <a-form-item label="报名班级" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-select
            class="dia_item"
            placeholder="选择报名班级"
            :allowClear="true"
            v-decorator="['schoolClass', {rules: [{ required: true, message: '选择报名班级' }]}]"
          >
            <a-select-option :value="1">类型1</a-select-option>
            <a-select-option :value="2">类型2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="报名时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-date-picker
            placeholder="请选择报名时间"
            v-decorator="['registrationTime', {rules: [{ required: true, message: '请选择报名时间' }]}]"
            format="YYYY-MM-DD"
            class="dia_item"
            @change="onSignTimeChange"
          />
        </a-form-item>
        <a-form-item label="报名课程" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-select
            class="dia_item"
            placeholder="选择报名课程"
            :allowClear="true"
            v-decorator="['courseId', {rules: [{ required: true, message: '选择报名课程' }]}]"
          >
            <a-select-option :value="1">类型1</a-select-option>
            <a-select-option :value="2">类型2</a-select-option>
          </a-select>
          <label class="price">200元/课时</label>
        </a-form-item>
        <a-form-item label="报名课时" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-input
            placeholder="请输入报名课时"
            v-decorator="['registrationQuantity', {rules: [{ required: true, message: '请输入报名课时' }]}]"
            class="dia_item"
            maxlength="10"
          />
        </a-form-item>
        <a-form-item label="应交学费" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-input
            placeholder="请输入应交学费"
            v-decorator="['totalAmount', {rules: [{ required: true, message: '请输入应交学费' }]}]"
            class="dia_item"
            maxlength="10"
          />
        </a-form-item>
        <a-form-item label="支付方式" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-radio-group
            name="radioGroup"
            v-decorator="['payType', {rules: [{ required: true, message: '请选择支付方式' }]}]"
          >
            <a-radio :value="1">现金支付</a-radio>
            <a-radio :value="2">微信支付</a-radio>
            <a-radio :value="3">刷卡缴费</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-textarea
            :autosize="{ minRows: 4, maxRows: 4 }"
            v-decorator="['comment', {rules: [{ required: true, message: '请填写备注' }]}]"
            class="dia_item"
            maxlength="50"
          />
        </a-form-item>
        <div class="title">家长信息</div>
        <a-form-item label="家长姓名" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-input
            placeholder="请输入家长姓名"
            v-decorator="['guardianName', {rules: [{ required: true, message: '请输入家长姓名' }]}]"
            class="dia_item"
            maxlength="8"
          />
        </a-form-item>
        <a-form-item label="家长电话" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-input
            placeholder="请输入家长电话"
            v-decorator="['guardianPhoneNumber', {rules: [{ required: true, message: '请输入家长电话' }]}]"
            class="dia_item"
            maxlength="11"
          />
        </a-form-item>
        <a-form-item label="家庭住址" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
          <a-input
            placeholder="请输入家庭住址"
            v-decorator="['familyAddress', {rules: [{ required: true, message: '请输入家庭住址' }]}]"
            class="dia_item"
            maxlength="50"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </page-layout>
</template>

<script>
import PageLayout from "../../layouts/PageLayout";
import Signup from "@/services/signup";
import comm from "../mix";

const columns = [
  {
    title: "序号",
    dataIndex: "id",
    scopedSlots: { customRender: "id" },
    key: "id"
  },
  {
    title: "姓名",
    dataIndex: "studentName",
    key: "studentName"
  },
  {
    title: "家长信息",
    dataIndex: "info",
    scopedSlots: { customRender: "info" },
    key: "info"
  },
  {
    title: "课程名称",
    dataIndex: "courseName",
    scopedSlots: { customRender: "courseName" },
    key: "courseName"
  },
  {
    title: "课时",
    dataIndex: "lesson",
    key: "lesson"
  },
  {
    title: "学费",
    dataIndex: "price",
    scopedSlots: { customRender: "price" },
    key: "price"
  },
  {
    title: "支付方式",
    dataIndex: "payType",
    key: "payType"
  },
  {
    title: "推荐人",
    dataIndex: "payType",
    key: "payType"
  },
  {
    title: "报名时间",
    dataIndex: "beginDate",
    scopedSlots: { customRender: "beginDate" },
    key: "beginDate"
  },
  {
    title: "报名方式",
    dataIndex: "beginDate",
    scopedSlots: { customRender: "beginDate" },
    key: "beginDate"
  },
  {
    title: "备注",
    key: "remark",
    dataIndex: "remark"
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status"
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
    key: "action"
  }
];

export default {
  name: "offline",
  mixins: [comm],
  components: { PageLayout },
  data() {
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
      beginDate: "",
      endDate: "",

      offlinePagination: {
        pageSize: 20,
        total: 50,
        current: 1,
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
      dialogVisible: false,
      dialogTitle: "新增", // 编辑
      diaForm: this.$form.createForm(this),
      edtId: "",
      signDate: ""
    };
  },

  mounted() {
   this.fetchData();

  },
  methods: {
    // 请求列表数据
    fetchData(filter) {
      this.showLoading();

      var param = null;
      if (filter) {
        param = Object.assign(filter);
        delete param["time"];
        param.beginDate = this.beginDate;
        param.endDate = this.endDate;
      }
      Signup.list(Object.assign(this.page, filter ? param : {}))
        .then(res => {
          console.log(res);
          if (res.errorNo == 200) {
            this.dataSource =
              this.page.currentPage === 1
                ? res.result
                : this.dataSource.concat(res.result);
          } else {
            this.toast(res.errorDesc, true);
          }
        })
        .catch(e => {
          console.log(e);
        })
        .finally(e => {
          this.hideLoading();
        });


    },
    // 点击编辑
    edtClick(data) {
      this.edtId = data.id;
      this.getOfflineById(this.edtId);
      console.log(this.edtId)
    },
    // 获取一条信息内容
    async getOfflineById(id) {
      //this.showLoading();
      Signup.signupItem(id)
        .then(res => {})
        .catch(e => {
          console.log(e);
        });
        
      let res = await Signup.getOfflineItem(id);
      console.log(res);
      this.hideLoading();
      if (res.errorNo != 200) {
        this.toast(res.errorDesc, true);
        return;
      }
      this.toast("获取单条报名信息 成功了");
      const data = res.result;
      this.form.setFieldsValue({
        studentName: data.studentName,
        schoolClass: data.schoolClass,
        registrationTime: data.registrationTime,
        registrationCourse: data.registrationCourse,
        registrationQuantity: data.registrationQuantity,
        totalAmount: data.totalAmount,
        payType: data.payType,
        comment: data.comment,
        guardianName: data.guardianName,
        guardianPhoneNumber: data.guardianPhoneNumber,
        familyAddress: data.familyAddress
      });
      this.dialogVisible = true;
    },
    // 删除点击

    async delClick(id) {
      /* this.showLoading();
      console.log(id);
      let res = await delOffline({ id });
      console.log(res);
      this.hideLoading(); */
      Signup.delOffline(id).then(res => {
        console.log(res)
        if (res.errorNo != 200) {
               this.toast(res.errorDesc, true);
               return;
             }
        this.toast("删除成功了");
      })

    },
    // dialog 确认
    handleOk(e) {
      e.preventDefault();
      this.diaForm.validateFields((err, values) => {
        console.log("coming..handleOk.", values);
        console.log("haha:", err);
        if (!err) {
          if (this.edtId) {
            this.updateRequest(values);
          } else {
            this.addRequest(values);
          }
        }
      });
    },
    // 更新请求
 /*   async updateRequest(id,params) {
      console.log("begain update");
      //this.showLoading();
      let res = await updateOffline(this.edtId, Object.assign(params));
      console.log(res);
      this.hideLoading();
      if (res.errorNo != 200) {
        this.toast(res.errorDesc, true);
        return;
      }
      this.toast("更新成功了");





    }, */

    // 新增请求
    addRequest(params) {
      console.log("begain add");

      //this.showLoading();
      params.registrationTime = this.signDate;
      Signup.addOffline(Object.assign(params))
        .then(res => {
          console.log("add success:", res);
          this.handleCancel();
          this.fetchData();
        })
        .catch(e => {
          console.log("failed:", e);
          this.toast(res.errorDesc, true);
        })
        .finally(e => {
          console.log("zuihoule");
          this.hideLoading();
        });
      console.log("马上来");

      this.hideLoading();
      if (res.errorNo != 200) {
        this.toast(res.errorDesc, true);
        return;
      }
      this.toast("新增成功");
      this.handleCancel();
      this.fetchData();
    },
    // dialog 取消
    handleCancel() {
      this.dialogVisible = false;
    },
    // 导出数据
    exportData() {},
    // 重置
    resetClick() {
      this.form.resetFields();
    },
    // 报名时间选择
    onSignTimeChange(date, dateString) {
      if (dateString) {
        this.signDate = dateString[0];
      }
    },
    // 日期改变
    onDateChange(date, dateString) {
      if (dateString) {
        this.beginDate = dateString[0];
        this.endDate = dateString[1];
      }
    },
    // 点击添加

    addClick() {
      this.dialogVisible = true;
    },
    // 点击提交按钮
    submitClick(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log("coming...", values);
        this.fetchData(values);
      });
    },

    // 选中项改变
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },

    diaSubmit() {}
  }
};
</script>

<style lang="less" scoped>
.search {
  .style_input {
    width: 140px;
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
.title {
  font-size: 16px;
  font-family: "PingFang SC";
  font-weight: 600;
  line-height: 60px;
  color: rgba(20, 20, 20, 1);
  opacity: 1;
}
.dia_item {
  width: 450px;
}
.price {
  font-size: 12px;
  font-family: "PingFang SC";
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 147, 0, 0.85);
  opacity: 1;
}
</style>
