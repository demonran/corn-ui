<template>
  <div>
    <edit></edit>
    <crud-operation/>
    <a-table :columns="columns"
             :pagination="false"
             rowKey="id"
             :data-source="crud.data">
      <span slot="columnId" slot-scope="text,record,index">{{index+1}}</span>
      <span slot="category" slot-scope="text,record">{{record.category?record.category.name:''}}</span>
      <img style="width: 100px" slot="cover" slot-scope="text,record" :src="record.cover"/>
      <span slot="recommend" slot-scope="text,record">{{record.recommend ? '是':'否'}}</span>
      <span slot="action" slot-scope="text, record">
      <ud-operation :data="record"></ud-operation>
  </span>
    </a-table>
    <pagination></pagination>

  </div>
</template>

<script>

  import ArticleRequest from "@/services/article";
  import comm from "../../mix";
  import edit from './edit';


  const defaultForm = {}

  import CRUD, {presenter, crud} from '@/components/Crud/curd'
  import udOperation from "@/components/Crud/udOperation";
  import crudOperation from "@/components/Crud/crudOperation";
  import Pagination from "@/components/Crud/Pagination";

  export default {
    name: "PageView",
    mixins: [comm, presenter()],
    cruds() {
      return CRUD({crudMethod: {...ArticleRequest}})
    },
    components: {edit, udOperation, crudOperation, Pagination},
    data() {
      return {
        columns: [
          {
            title: "序号",
            scopedSlots: {customRender: "columnId"}
            // render: (text, record, index) => `${index + 1}`
          },
          {
            title: "图片",
            dataIndex: "cover",
            scopedSlots: {customRender: "cover"}
          },
          {
            title: "名称",
            dataIndex: "title"
          },
          {
            title: "类型",
            dataIndex: "category",
            key: "category",
            scopedSlots: {customRender: "category"}
          },
          {
            title: "更新时间",
            dataIndex: "createdAt",
            scopedSlots: {customRender: "createdAt"}
          },
          {
            title: "查看次数",
            dataIndex: "readCount"
          },
          {
            title: "是否推荐到首页",
            dataIndex: "recommend",
            scopedSlots: {customRender: "recommend"}
          },
          {
            title: "操作",
            key: "action",
            scopedSlots: {customRender: "action"}
          }
        ],

      };
    },
    computed: {},
    mounted() {
    },
    methods: {}
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
