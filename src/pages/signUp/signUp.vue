<template>
  <!--  <page-layout title=""> -->
  <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="false">
    <a-row>
      <!-- <a-col :md="14" :sm="24">
          <a-button class="btn" @click="add" type="primary">新建</a-button>
      </a-col>-->
      <a-col :md="6" :sm="24">
        <a-form-item label="名称:" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}">
          <a-input placeholder="请输入" v-model="filterKeyword" />
        </a-form-item>
      </a-col>

      <a-col :md="4" :sm="24">
        <a-button type="primary" class="btn fr" @click="search">查询</a-button>
      </a-col>
    </a-row>

    <a-table
      rowKey="id"
      :pagination="pagination"
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    >
      <span slot="id" slot-scope="text,record,index">{{index+1}}</span>
      <template slot="patriarchName" slot-scope="text,record">
        <div class="info_name">
          {{record.patriarchName}}
          <div class="tel">{{record.tel}}</div>
        </div>
      </template>
      <template slot="totalAmount" slot-scope="text,record">
        <div class="fee">{{record.courseInfo?record.courseInfo.totalAmount:'-'}}</div>
      </template>
      <template slot="courseName" slot-scope="text,record">
        <div class="fee">{{record.courseInfo?record.courseInfo.courseName:'-'}}</div>
      </template>
      <span
        slot="lesson"
        slot-scope="text,record"
      >{{record.courseInfo?record.courseInfo.lesson+'节':'-'}}</span>
      <template slot="beginDate" slot-scope="text,record">
        <div class="fee">{{record.courseInfo?record.courseInfo.beginDate:'-'}}</div>
      </template>
      <span slot="remark" slot-scope="text,record">{{record.remark?record.remark:'-'}}</span>
      <span slot="type" slot-scope="text,record">{{record.type?record.type:'-'}}</span>
      <span slot="status" slot-scope="text,record">{{record.status?record.status:'-'}}</span>
      <!--        <template slot="action" slot-scope="text,record">status
          <div class="action_class">
            <div class="build" @click="edtClick(record)">编辑</div>
            <div class="build">建档</div>
            <div class="delete" @click="delClick(record.registrationId)">删除</div>
          </div>
      </template>-->
    </a-table>
  </a-card>
  <!--  </page-layout> -->
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
    dataIndex: "patriarchName",
    scopedSlots: { customRender: "patriarchName" },
    key: "patriarchName"
  },
  {
    title: "报名课程",
    dataIndex: "courseName",
    key: "courseName",
    scopedSlots: { customRender: "courseName" }
  },
  {
    title: "课时",
    dataIndex: "lesson",
    key: "lesson",
    scopedSlots: { customRender: "lesson" }
  },
  {
    title: "学费",
    dataIndex: "totalAmount",
    scopedSlots: { customRender: "totalAmount" },
    key: "totalAmount"
  },
  {
    title: "支付方式",
    dataIndex: "payType",
    key: "payType"
  },
  {
    title: "推荐人（微信号）",
    dataIndex: "recommend",
    key: "recommend"
  },
  {
    title: "报名时间",
    dataIndex: "beginDate",
    scopedSlots: { customRender: "beginDate" },
    key: "beginDate"
  },
  {
    title: "报名方式",
    dataIndex: "type",
    scopedSlots: { customRender: "type" },
    key: "type"
  },
  {
    title: "备注",
    key: "remark",
    scopedSlots: { customRender: "remark" },
    dataIndex: "remark"
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  }
  /*     {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          key: "action"
        } */
];
export default {
  name: "PageView",
  mixins: [comm],
  components: { PageLayout },
  data() {
    return {
      columns,
      dataSource: [],
      filterStatus: 1,
      filterKeyword: "",

      page: {
        pageSize: 20,
        pageNum: 1
      },
      pagination: null,
      selectedRows: [],
      selectedRowKeys: [] // Check here to configure the default column
    };
  },
  computed: {},
  mounted() {
    const that = this;
    this.pagination = {
      pageSize: 20,
      total: 0,
      defaultCurrent: 1,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "30", "40"],
      showTotal(total) {
        return `共${total}项`;
      },
      onChange(index, pageSize) {
        // 页码改变的回调，参数是改变后的页码及每页条数
        that.page.pageNum = index;
        that.page.pageSize = pageSize;
        that.list();
        // console.log("change", current + ":" + count);
      },
      onShowSizeChange(index, pageSize) {
        // pageSize 变化的回调
        that.page.pageNum = index;
        that.page.pageSize = pageSize;
        that.list();
        // console.log("showSizeChange", current + ":" + count);
      }
    };
  },
  activated() {
    this.list();
  },

  methods: {
    // 点击搜索
    search() {
      this.page.pageNum = 1;
      this.list();
    },
    list() {
      // Signup.list().then(res => {
      //   console.log(res)
      //   this.orders = res.result;
      // })
      // todo 参数需要修改
      Signup.list(
        Object.assign(this.page, { filterKeyword: this.filterKeyword })
      )
        .then(res => {
          console.log(res);
          // this.dataSource = res.result.content;
          this.dataSource =
            this.page.pageNum === 1
              ? res.result.content
              : this.dataSource.concat(res.result.content);
          console.log(res.result.content);
        })
        .catch(e => {
          // this.toast(e.errorDesc, true);
          // this.pagination.total = 0;
          //console.log(e);
        });
    },

    // 选中项改变
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    }
  }
};
</script>


<style lang="less" scoped>
.btn {
  margin-top: 3px;
}
.search {
  .style_input {
    width: 140px;
    margin-bottom: 10px;
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

.search-btn {
  margin-left: 14px;
  margin-right: 9px;
}

.course-list {
  min-height: ~"calc(100vh - 320px)";
}

.table {
  border: 1px solid #e8e8e8;

  td {
    padding: 0 !important;
  }
  .tel {
    color: #e8e8e8;
  }
}

.btn.fr {
  float: right;
  margin-left: 5px;
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
    cursor: pointer;
  }
}
</style>
