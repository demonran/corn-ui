<template>
  <div>
    <edit></edit>
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="false">


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
      <crud-operation></crud-operation>
      <a-table
        class="table"
        :columns="columns"
        rowKey="id"
        :dataSource="crud.data"
        :pagination=false
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="columnId" slot-scope="text,record,index">{{index+1}}</span>
        <span slot="createdAt" slot-scope="text,record">{{record.createdAt}}</span>
        <img style="width: 100px" slot="image" slot-scope="image" :src="image" />
        <span slot="recommend" slot-scope="text,record">{{record.recommend ? '是':'否'}}</span>
        <span slot="category" slot-scope="text,record">{{record.category?record.category.name:''}}</span>
        <template slot="action" slot-scope="text,record">
          <ud-operation :data="record"></ud-operation>
        </template>
      </a-table>
      <!-- 分页组件-->
      <pagination/>
    </a-card>
  </div>
</template>

<script>
import PaintRequest from "@/services/painting";
import CRUD ,{presenter} from "@/components/Crud/curd";
import udOperation from "@/components/Crud/udOperation";
import crudOperation from "@/components/Crud/crudOperation";
import Pagination from  "@/components/Crud/Pagination"
import comm from "../mix";
import edit from './edit'

export default {
  mixins: [comm, presenter()],
  cruds() {
    return CRUD({crudMethod: {...PaintRequest}})
  },
  components: { edit,udOperation ,crudOperation, Pagination},
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
