<template>
  <page-layout title="报名">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
      <a-row style="padding-top:10px;">
        <!-- <a-col :md="14" :sm="24">
          <a-button class="btn" @click="add" type="primary">新建</a-button>
        </a-col> -->
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
              :bordered="true"
              rowKey="registrationId"
              :pagination="pagination"
              :columns="columns"
              :dataSource="orders"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            >
              <span slot="id" slot-scope="text,record,index">{{index+1}}</span>

              <template slot="patriarchName" slot-scope="text">
                <div class="info_name">
                  {{text.patriarchName}}
                  {{text.tel}}
                </div>
              </template>

              <template slot="totalAmount" slot-scope="text">
                <div class="fee">{{text.totalAmount}}</div>
              </template>
              <!-- <template  slot="reportTime" slot-scope="text">
              <div class="colum_normal">{{text}}2019.09.11 12:22
              </div>
              </template >-->
              <template slot="action" slot-scope="text,record">
                <div class="action_class">
                  <!-- <div class="build" @click="edtClick(record)">编辑</div> -->
                  <!-- <div class="build">建档</div> -->
                  <!-- <div class="delete" @click="delClick(record.registrationId)">删除</div> -->
                </div>
              </template>
            </a-table>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import Signup from "@/services/signup";
import comm from "../mix";

export default {
  name: "PageView",
  mixins: [comm],
  components: { PageLayout },
  data() {
    return {
      orders: [],
      filterStatus: 1,
      filterKeyword: "",
      columns : [
        {
          title: "序号",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          key: "id"
        },
        {
          title: "序号",
          dataIndex: "userId",

          key: "userId"
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
          title: "课程名称",
          dataIndex: "courseName",
          key: "courseName"
        },

        {
          title: "学费",
          dataIndex: "totalAmount",
          scopedSlots: { customRender: "totalAmount" },
          key: "totalAmount"
        },
      /*  {
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
        }, */
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          key: "action"
        }
      ],
      dataSource: [],
      page: {
        pageSize: 20,
        pageNum: 1
      },
      pagination: {
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
          this.page.pageNum = index;
          this.page.pageSize = pageSize;
          this.list();
          // console.log("change", current + ":" + count);
        },
        onShowSizeChange(index, pageSize) {
          // pageSize 变化的回调
          this.page.pageNum = index;
          this.page.pageSize = pageSize;
          this.list();
          // console.log("showSizeChange", current + ":" + count);
        }
      },
      selectedRows: [],
      selectedRowKeys: [] // Check here to configure the default column
    };
  },
  computed: {},
  mounted() {
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
          this.orders =
            this.page.pageNum === 1
              ? res.result
              : this.orders.concat(res.result);
          this.pagination.total = res.result.total || 0;
          console.log(res.result)
        })
        .catch(e => {
          // this.toast(e.errorDesc, true);
          // this.pagination.total = 0;
          //console.log(e);
        });
    },

    add() {
      this.$router.push("/settings/addbanner");
    },
    edt(data) {
      this.$router.push({
        path: "/settings/edtbanner",
        query: { id: data.id }
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
