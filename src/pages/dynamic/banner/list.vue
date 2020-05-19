<template>
  <div>
    <edit></edit>
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
      <crud-operation></crud-operation>

      <a-table
        class="table"
        :columns="columns"
        rowKey="id"
        :loading="crud.loading"
        :dataSource="crud.data"
        :pagination=false
      >
        <span slot="columnId" slot-scope="text,record,index">{{index+1}}</span>
        <img style="width: 100px" slot="image" slot-scope="image" :src="image" alt="image"/>

        <template slot="action" slot-scope="text,record">
          <ud-operation :data="record"></ud-operation>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
  import crudBanners from "@/services/banner";
  import comm from "../../mix";
  import CRUD, {presenter} from "@/components/Crud/curd"
  import udOperation from "@/components/Crud/udOperation"
  import crudOperation from "@/components/Crud/crudOperation"
  import edit from './edit'

  export default {
    name: "PageView",
    cruds() {
      return CRUD({title: '幻灯片', crudMethod: {...crudBanners}})
    },
    mixins: [comm, presenter()],
    components: {udOperation, crudOperation, edit},
    data() {
      return {
        banners: [],
        filterStatus: 1,
        filterKeyword: "",
        columns: [
          {
            title: "序号",
            width: "10%",
            scopedSlots: {customRender: "columnId"},
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
            scopedSlots: {customRender: "image"}
          },

          {
            title: "链接",
            dataIndex: "link",
            key: "link"
          },
          {
            title: "操作",
            key: "action",
            scopedSlots: {customRender: "action"}
          }
        ]
      };
    },
    computed: {},
    methods: {
      // 点击搜索
      search() {
        this.page.pageNum = 1;
        this.list();
      },

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
