<template>
  <page-layout title="线下课程列表">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
      <a-row style="padding-top:10px;">
        <a-col :md="14" :sm="24">
          <a-button class="btn" @click="addCourse" type="primary">新建</a-button>
          <!-- <a-button class="btn" type="primary" ghost>开启</a-button>
          <a-button class="btn" type="primary" ghost>停招</a-button>
          <a-button class="btn" type="primary" ghost>导出</a-button>-->
        </a-col>
        <a-col :md="6" :sm="24">
          <a-form-item label="名称:" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}">
            <a-input placeholder="请输入" v-model="filterKeyword" />
          </a-form-item>
        </a-col>
        <!--         <a-col :md="6" :sm="24" >
                   <a-form-item
                     label="状态:"
                     :labelCol="{span: 5}"
                     :wrapperCol="{span: 16, offset: 1}"
                   >
                     <a-select v-model="filterStatus" placeholder="请选择" style="width:100%">
                       <a-select-option :value="1">招生中</a-select-option>
                       <a-select-option :value="0">已停招</a-select-option>
                     </a-select>

                   </a-form-item>
        </a-col>-->
        <a-col :md="4" :sm="24">
          <a-button type="primary" class="btn fr" @click="resetList">重置</a-button>
          <a-button type="primary" class="btn fr" @click="search">查询</a-button>
        </a-col>
      </a-row>

      <!-- :scroll="{ x: '100%', y: 600 }" -->
      <a-table
        class="table"
        :columns="columns"
        rowKey="courseId"
        :pagination="pagination"
        :dataSource="dataSource"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="courseId" slot-scope="text,record,index">{{index+1}}</span>
        <template slot="imageUrl" slot-scope="imageUrl">
          <img style="width: 100px" :src="imageUrl" />
        </template>
        <span
          slot="category"
          slot-scope="text,record"
        >{{record.category?record.category.categoryName:''}}</span>
        <span slot="beginDate" slot-scope="text,record">{{record.beginDate}} ~ {{record.endDate}}</span>
        <span
          slot="startClassTime"
          slot-scope="text,record"
        >{{record.startClassTime}}-{{record.endClassTime}}</span>
        <span slot="teacher" slot-scope="text,record">{{record.teacher?record.teacher.name:''}}</span>
        <span slot="status" slot-scope="status">{{status === 'OPENED'?"在招":'停招'}}</span>
        <span slot="action" slot-scope="text,record">
          <div class="action_class">
            <div
              class="build"
              @click="recommendRow(text,!text.recommend)"
            >{{text.recommend?'取消推荐':'推荐首页'}}</div>
            <div class="build" @click="update(record)">编辑</div>
            <div
              class="build"
              @click="changeStatus (text,!text.status)"
            >{{text.status=='CLOSED'?'重启':'停招'}}</div>
            <a-popconfirm title="是否要删除此行？" @confirm="deleteRow(record)">
              <div class="build">删除</div>
            </a-popconfirm>
          </div>
          <!-- <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item><a>推荐首页</a></a-menu-item>
               <a-menu-item><a>编辑</a></a-menu-item>
              <a-menu-item  @click="deleteRow(record)" ><a>删除</a></a-menu-item>
            </a-menu>
            <a>更多<a-icon type="down"/></a>
          </a-dropdown>-->
        </span>
      </a-table>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "../../layouts/PageLayout";
import OfflineCurse from "@/services/offlineCurse";
import comm from "../mix";

export default {
  name: "PageView",
  mixins: [comm],
  components: { PageLayout },
  data() {
    return {
      categoryName: "",
      pagination: {
        pageSize: 5,
        total: 0,
        defaultCurrent: 1,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        showTotal(total) {
          return `共${total}项`;
        }
      },
      filterStatus: 1,
      filterKeyword: "",
      columns: [
        {
          title: "序号",
          dataIndex: "courseId",
          key: "courseId",
          scopedSlots: { customRender: "courseId" }
        },
        {
          title: "课程名称",
          dataIndex: "courseName",
          key: "courseName"
        },
        // {
        //   title: "封面",
        //   dataIndex: "imageUrl",
        //   key: "imageUrl",
        //   scopedSlots: { customRender: "imageUrl" }
        // },
        {
          title: "课程分类",
          dataIndex: "category",
          key: "category",
          scopedSlots: { customRender: "category" }
        },
        {
          title: "费用",
          dataIndex: "totalAmount",
          key: "totalAmount"
        },
        {
          title: "起始时间",
          dataIndex: "beginDate",
          key: "beginDate",
          scopedSlots: { customRender: "beginDate" }
        },
        {
          title: "上课时段",
          dataIndex: "startClassTime",
          key: "startClassTime",
          scopedSlots: { customRender: "startClassTime" }
        },
        {
          title: "主讲老师",
          dataIndex: "teacher",
          key: "teacher",
          scopedSlots: { customRender: "teacher" }
        },
        {
          title: "招生人数",
          dataIndex: "limitStudents",
          key: "limitStudents"
        },
        {
          title: "总课时",
          dataIndex: "lesson",
          key: "lesson"
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [] // Check here to configure the default column
    };
  },
  computed: {},
  activated() {
    this.list();
  },
  methods: {
    // 选中项改变
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
    },
    async list(query) {
      //query.status = this.filterStatus;
      if (this.filterKeyword) query.name = this.filterKeyword;

      this.showLoading();
      let res = await OfflineCurse.list(query);

      console.log(res);
      this.hideLoading();
      if (res.errorNo != 200) {
        this.toast(res.errorDesc, true);
        return;
      }

      this.dataSource = res.result.content;
    },

    addCourse() {
      this.$router.push("/course/addOffline");
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    resetList() {
      this.filterKeyword = "";
      this.list({ pageNum: 1 });
    },
    search() {
      this.list({ pageNum: 1 });
    },
    async deleteRow(row) {
      this.showLoading();
      let ret = await OfflineCurse.delete(row.courseId);
      console.log(ret);
      this.list();
    },
    async recommendRow(text, rec) {
      //this.showLoading();
      let res = await OfflineCurse.recommend(text, rec);
      this.list();
    },
    async changeStatus(text, status) {
      let res = await OfflineCurse.change(text.courseId, text.status);
      this.list();
    },
    async update(row) {
      this.$emit("finish");
      //this.$router.push({name:'编辑线下课程', params:{data:row}});
      this.$router.push({
        name: "编辑线下课程",
        params: { courseId: row.courseId, data: row, isUpdate: true }
      });
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
