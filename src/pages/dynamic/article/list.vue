<template>
  <div>
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
	<crud-operation/>
	<a-modal
	  :title="crud.status.title"
	  :visible="crud.status.cu > 0"
	  :confirm-loading="crud.status.cu == 2"
	  @cancel="crud.cancelCU"
	  @ok="crud.submitCU"
	>
    <a-form-model ref="form" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:20}" :model="form">
      <a-form-model-item label="优惠券金额" prop="amount">
        <a-input prefix="¥" v-model="form.amount"/>
      </a-form-model-item>
    </a-form-model>
  </a-modal>

  <a-table :columns="columns"
           :pagination="false"
           rowKey="id"
           :data-source="crud.data">
    <span slot="columnId" slot-scope="text,record,index">{{index+1}}</span>
    <span slot="category" slot-scope="text,record">{{record.category?record.category.name:''}}</span>
    <img style="width: 100px" slot="cover" slot-scope="text,record" :src="record.cover" />
    <span slot="recommend" slot-scope="text,record">{{record.recommend ? '是':'否'}}</span>
    <span slot="action" slot-scope="text, record">
      <ud-operation :data="record"></ud-operation>
  </span>
  </a-table>
  <pagination></pagination>


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

  </div>
</template>

<script>

import ArticleRequest from "@/services/article";
import comm from "../../mix";


 const defaultForm = {}
  
  import CRUD, {presenter, form, crud} from '@/components/Crud/curd'
  import udOperation from "@/components/Crud/udOperation";
  import crudOperation from "@/components/Crud/crudOperation";
  import Pagination from "@/components/Crud/Pagination";
export default {
  name: "PageView",
  mixins: [comm, presenter()],
  cruds() {
    return CRUD({crudMethod: {...ArticleRequest}})
  },
  components: { udOperation ,crudOperation, Pagination},
  data() {
    return {
form: this.$form.createForm(this),
      columns: [
        {
          title: "序号",
          scopedSlots: { customRender: "columnId" }
          // render: (text, record, index) => `${index + 1}`
        },
        {
          title: "图片",
          dataIndex: "cover",
          scopedSlots: { customRender: "cover" }
        },
        {
          title: "名称",
          dataIndex: "title"
        },
        {
          title: "类型",
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
          title: "查看次数",
          dataIndex: "readCount"
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


rules: {
          amount: [
            {required: true, message: '请输入优惠券金额', trigger: 'change'},
          ],
          commission: [
            {required: true, message: '请输入反佣金额', trigger: 'change'},
          ],
        }
    };
  },
  computed: {},
  mounted() {
  },
  methods: {

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
