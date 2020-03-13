<template>
  <page-layout title="老师">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="false">
      <a-button class="btn" @click="addClick" type="primary">添加</a-button>

      <div class="search" slot="extra">
        <a-form layout="inline" :form="form" @submit="submitClick">
          <a-form-item label="课程">
            <a-input class="style_input" placeholder="请输入课程" v-decorator="['teachCategory']" />
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
          <a-form-item label="名称">
            <a-input class="style_input" placeholder="请输入名称" v-decorator="['name']" />
          </a-form-item>
          <span style="float: right; margin-top: 3px;">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetClick">重置</a-button>
          </span>
        </a-form>
      </div>
      <a-table
        class="table"
        :columns="columns"
        rowKey="id"
        :dataSource="dataSource"
        :pagination="pagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="columnId" slot-scope="text,record,index">{{index+1}}</span>
        <img style="width: 100px" slot="avatar" slot-scope="avatar" :src="avatar" />
        <span slot="category" slot-scope="text,record">{{record.category?record.category.categoryName:''}}</span>
        <span slot="status" slot-scope="text,record">{{record.status === 'ENABLED' ? '启用': '禁用'}}</span>

        <template slot="action" slot-scope="text,record">
          <div class="action_class">
            <div class="build" v-if="record.status === 'ENABLED'" @click="changeStatus(record)">停课</div>
            <div class="build" v-else @click="changeStatus(record)">启用</div>
            <div class="build" @click="edt(record)">编辑</div>
            <!-- <div class="build" @click="recommend(record)">推荐</div> -->
            <!-- <a-popconfirm title="是否要删除此行？" @confirm="deleteRow(record.id)">
              <div class="build">删除</div>
            </a-popconfirm> -->
          </div>
        </template>
      </a-table>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import TeacherRequest from "@/services/teacher";
import comm from "../../mix";

export default {
  name: "teacherlist",
  mixins: [comm],
  components: { PageLayout },
  data() {
    return {
      filterStatus: 1,
      filterKeyword: "",
      form: this.$form.createForm(this),
      columns: [
        {
          title: "序号",
          scopedSlots: { customRender: "columnId" }
          // render: (text, record, index) => `${index + 1}`
        },
        {
          title: "图片",
          dataIndex: "avatar",
          scopedSlots: { customRender: "avatar" }
        },
        {
          title: "名称",
          dataIndex: "name"
        },
        {
          title: "教学课程",
          dataIndex: "category",
          key: "category",
          scopedSlots: { customRender: "category" }
        },
        {
          title: "毕业学校",
          dataIndex: "school"
        },
        {
          title: "联系电话",
          dataIndex: "tel"
        },
        {
          title: "家庭住址",
          dataIndex: "address"
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
  activated() {
    this.list();
  },

  methods: {
    // 点击搜索
    search() {
      this.page.pageNum = 1;
      this.list();
    },
    submitClick(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log("coming...", values);
        // 参数先不管 直接搜索
        this.page.pageNum = 1;
        this.list();
      });
    },
    resetClick() {
      this.form.resetFields();
    },
    list() {
      // todo 参数需要修改
      TeacherRequest.list(
        Object.assign(this.page, { filterKeyword: this.filterKeyword })
      )
        .then(res => {
          console.log(res);
          this.dataSource =
            this.page.pageNum === 1
              ? res.result.content
              : this.dataSource.concat(res.result.content);
          this.pagination.total = res.result.total || 0;
        })
        .catch(e => {
          // this.toast(e.errorDesc, true);
          // this.pagination.total = 0;
          console.log(e);
        });
    },

    addClick() {
      // this.toast("不要点");
      this.$router.push("/settings/addTeacher");
    },
    edt(data) {
      this.$router.push({
        path: "/settings/edtTeacher",
        query: { id: data.id }
      });
    },
    // 修改状态
    changeStatus(data) {
      var param = {
        id: data.id,
        status: data.status === "ENABLED" ? "DISABLED" : "ENABLED"
      };
      TeacherRequest.patch(param)
        .then(res => {
          this.toast("切换状态成功");
          this.list();
        })
        .catch(e => {});
    },
    // 设置推荐
    recommend(data) {},
    deleteRow(id) {
      TeacherRequest.del(id)
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
  margin-bottom: 10px;
}
.search {
  .style_input {
    width: 150px;
  }
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
