<template>
  <page-layout title="banner设置">
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
          <a-button type="primary" class="btn fr" @click="search">查询</a-button>
        </a-col>
      </a-row>

      <a-table
        class="table"
        :columns="columns"
        rowKey="id"
        :dataSource="banners"
        :pagination="pagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="columnId" slot-scope="text,record,index">{{index+1}}</span>
        <img style="width: 100px" slot="image" slot-scope="image" :src="image" />

        <template slot="action" slot-scope="text,record">
          <div class="action_class">
            <div class="build" @click="edt(record)">编辑</div>
            <a-popconfirm title="是否要删除此行？" @confirm="deleteRow(record.id)">
              <div class="build">删除</div>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import Banners from "@/services/banner";
import comm from "../../mix";

export default {
  name: "PageView",
  mixins: [comm],
  components: { PageLayout },
  data() {
    return {
      banners: [],
      filterStatus: 1,
      filterKeyword: "",
      columns: [
        {
          title: "序号",
          width: "10%",
          scopedSlots: { customRender: "columnId" },
          // render: (text, record, index) => `${index + 1}`
          key: "columnId"
        },
        {
          title: "标题",
          dataIndex: "title",
          key: "title"
        },
        {
          title: "图片",
          dataIndex: "image",
          key: "image",
          scopedSlots: { customRender: "image" }
        },

        {
          title: "链接",
          dataIndex: "link",
          key: "link"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      dataSource: [],
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
      // Banners.list().then(res => {
      //   console.log(res)
      //   this.banners = res.result;
      // })
      // todo 参数需要修改
      Banners.list(
        Object.assign(this.page, { filterKeyword: this.filterKeyword })
      )
        .then(res => {
          console.log(res);
          this.banners =
            this.page.pageNum === 1
              ? res.result
              : this.banners.concat(res.result);
          this.pagination.total = res.result.total || 0;
        })
        .catch(e => {
          // this.toast(e.errorDesc, true);
          // this.pagination.total = 0;
          console.log(e);
        });
    },

    add() {
      this.$router.push("/dynamic/addbanner");
    },
    edt(data) {
      this.$router.push({
        path: "/dynamic/edtbanner",
        query: { id: data.id }
      });
    },
    deleteRow(id) {
      Banners.del(id)
        .then(res => {
          this.toast("删除成功");
          this.list();
        })
        .catch(e => {
          console.log("error:", e);
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
