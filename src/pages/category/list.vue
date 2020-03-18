<template>
  <page-layout title="课程分类">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
      <a-row style="padding-top:10px;">
        <a-col :md="14" :sm="24">
          <a-button class="btn" @click="add" type="primary">新建</a-button>
        </a-col>
        <a-col :md="6" :sm="24">
          <a-form-item label="名称:" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}">
            <a-input placeholder="请输入" v-model="filterKeyword" />
          </a-form-item>
        </a-col>

        <a-col :md="4" :sm="24">
          <a-button type="primary" class="btn fr" @click="resetList">重置</a-button>
          <a-button type="primary" class="btn fr" @click="search">查询</a-button>
        </a-col>
      </a-row>

      <a-table
        class="table"
        :columns="columns"
        rowKey="categoryId"
        :pagination="pagination"
        :dataSource="categories"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="categoryId" slot-scope="text,record,index">{{index+1}}</span>

        <span slot="status" slot-scope="status">{{status == 'OPENED'?"上架中":'已下架'}}</span>
        <span slot="action" slot-scope="text,record">
          <div class="action_class">
            <div class="build" @click="update(record)">编辑</div>
            <a-popconfirm title="是否要删除此行？" @confirm="deleteRow(record.categoryId)">
              <div class="build">删除</div>
            </a-popconfirm>
          </div>
        </span>
      </a-table>
    </a-card>
  </page-layout>
</template>

<script>
import PageHeader from "../../components/page/PageHeader";
import PageLayout from "../../layouts/PageLayout";
import Category from "@/services/category";
import comm from "../mix";

export default {
  name: "PageView",
  mixins: [comm],

  components: { PageLayout, PageHeader },
  data() {
    return {
      categories: [],
      pagination: {
        pageSize: 10,
        total: 0,
        defaultCurrent: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal(total) {
          return `共${total}项`;
        }
      },
      filterStatus: 1,
      filterKeyword: "",
      columns: [
        {
          title: "序号",
          dataIndex: "categoryId",
          key: "categoryId",
          scopedSlots: { customRender: "categoryId" }
        },
        {
          title: "课程名称",
          dataIndex: "categoryName",
          key: "categoryName"
        },

        // {
        //   title: '状态',
        //   dataIndex: 'status',
        //   key: 'status',
        //   scopedSlots: {customRender: 'status'}
        // },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      dataSource: [],
      selectedRowKeys: [] // Check here to configure the default column
    };
  },
  computed: {},
  created() {
    this.pagination.onShowSizeChange = (index, pageSize) => {
      this.list({ pageNum: index, pageSize });
    };
    this.pagination.onChange = (index, pageSize) => {
      this.list({ pageNum: index, pageSize });
    };
  },
  activated() {
    this.list();
  },

  methods: {
    resetList(){
      //  this.form.resetFields();
    },
    search(){
      this.list()
    },
    list() {
      Category.list().then(res => {
        console.log(res);
        this.categories = res.result.content;
      });
    },

    add() {
      this.$router.push("/settings/category/add");
    },
    deleteRow(id) {
      Category.deleteCat(id).then(res => {
        console.log(res);
        this.list()
      });
    },
    update(data) {
       this.$router.push({
        path: "/settings/category/edt",
        query: { id: data.categoryId }
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
