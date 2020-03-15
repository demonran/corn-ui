<template>
  <page-layout title="painting">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="false">
      <a-button class="btn" @click="addClick" type="primary">添加</a-button>

      <div class="search" slot="extra">
        <a-form layout="inline" :form="form" @submit="submitClick">
          <a-form-item label="名称">
            <a-input class="style_input" placeholder="请输入" v-decorator="['teachCategory']" />
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
        class="table"
        :columns="columns"
        rowKey="id"
        :dataSource="dataSource"
        :pagination="pagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="columnId" slot-scope="text,record,index">{{index+1}}</span>
        <span slot="createdAt" slot-scope="text,record">{{formateTime(record.createdAt)}}</span>
        <img style="width: 100px" slot="image" slot-scope="image" :src="image" />
        <span slot="recommend" slot-scope="text,record">{{record.recommend ? '是':'否'}}</span>
        <span slot="category" slot-scope="text,record">{{record.category?record.category.name:''}}</span>
        <template slot="action" slot-scope="text,record">
          <div class="action_class">
            <div class="build" @click="edt(record)">编辑</div>
            <!-- <div class="build" v-if="!record.recommend" @click="recommend(record)">推荐</div> -->
            <!-- <div class="build" v-else @click="recommend(record)">取消推荐</div> -->
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
import PaintRequest from "@/services/painting";
import comm from "../mix";

export default {
  name: "PageView",
  mixins: [comm],
  components: { PageLayout },
  data() {
    return {
      filterStatus: 1,
      filterKeyword: "",
      formateTime: this.fmtTime,
      form: this.$form.createForm(this),
      columns: [
        {
          title: "序号",
          scopedSlots: { customRender: "columnId" }
          // render: (text, record, index) => `${index + 1}`
        },
        {
          title: "作品名称",
          dataIndex: "name"
        },
        {
          title: "作者姓名",
          dataIndex: "author"
        },
        {
          title: "所属分类",
          dataIndex: "category",
          key: "category",
          scopedSlots: { customRender: "category" }
        },
        {
          title: "更新时间",
          dataIndex: "createdAt",
          scopedSlots: { customRender: "createdAt" }
        },
        {
          title: "作品图片",
          dataIndex: "image",
          scopedSlots: { customRender: "image" }
        },
        {
          title: "是否推荐到首页",
          dataIndex: "recommend",
          scopedSlots: { customRender: "recommend" }
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
        }
      },
      selectedRows: [],
      selectedRowKeys: [] // Check here to configure the default column
    };
  },
  computed: {},
  mounted() {
    const that = this;
    this.pagination.onChange = (index, pageSize) => {
      // 页码改变的回调，参数是改变后的页码及每页条数
      that.page.pageNum = index;
      that.page.pageSize = pageSize;
      that.list();
      // console.log("change", index + ":" + pageSize);
    };
    this.pagination.onShowSizeChange = (index, pageSize) => {
      // console.log("showSizeChange", index + ":" + pageSize);
      // pageSize 变化的回调
      that.page.pageNum = index;
      that.page.pageSize = pageSize;
      that.list();
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
      PaintRequest.list(
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
      this.$router.push("/painting/add");
    },
    edt(data) {
      this.$router.push({
        path: "/painting/edt",
        query: { id: data.id }
      });
    },
    // 设置推荐
    recommend(data) {
      var param = {
        id: data.id,
        recommend: !data.recommend
      };
      PaintRequest.changeRecommend(param)
        .then(res => {
          this.toast("操作成功");
          this.list();
        })
        .catch(e => {
          console.log("error:", e);
        });
    },
    deleteRow(id) {
      PaintRequest.del(id)
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
