<template>
  <page-layout title="banner设置">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
      <a-row style="padding-top:10px;">
        <a-col :md="14" :sm="24">
          <a-button class="btn" @click="add" type="primary">新建</a-button>

        </a-col>
        <a-col :md="6" :sm="24">
          <a-form-item
            label="名称:"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 16, offset: 1}"
          >
            <a-input placeholder="请输入" v-model="filterKeyword"/>
          </a-form-item>
        </a-col>

        <a-col :md="4" :sm="24">
          <a-button type="primary" class="btn fr" @click="search">查询</a-button>

        </a-col>
      </a-row>

      <a-table class="table"
               :columns="columns"
               rowKey="id"
               :dataSource="banners"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">

        <img style="width: 100px" slot="image" slot-scope="image" :src="image"/>

        <span slot="action" slot-scope="text,record">
            <a-menu-item @click="update(record)"><a>编辑</a></a-menu-item>
          <a-popconfirm title="是否要删除此行？" @confirm="deleteRow(text.categoryId)">
            <a>删除</a>
          </a-popconfirm>

            </span>
      </a-table>

    </a-card>
  </page-layout>
</template>

<script>

  import PageLayout from '@/layouts/PageLayout';
  import Banners from '@/services/banner';


  export default {
    name: 'PageView',

    components: {PageLayout},
    data() {
      return {
        banners: [],
        filterStatus: 1,
        filterKeyword: '',
        columns: [
          {
            title: '序号',
            width: '10%',
            render: (text, record, index) => `${index + 1}`
          },
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
          },
          {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            scopedSlots: {customRender: 'image'}
          },

          {
            title: '链接',
            dataIndex: 'link',
            key: 'link'
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'}

          },


        ],
        dataSource: [],
        selectedRowKeys: [] // Check here to configure the default column
      };
    },
    computed: {},
    created() {
      this.pagination.onShowSizeChange = (index, pageSize) => {
        this.list({pageNum: index, pageSize});
      };
      this.pagination.onChange = (index, pageSize) => {
        this.list({pageNum: index, pageSize});
      };
    },
    mounted() {
      this.list();

    },

    methods: {
      list() {
        Banners.list().then(res => {
          console.log(res)
          this.banners = res.result;
        })
      },

      add() {
        this.$router.push('/settings/category/add');
      },
      deleteRow(id) {
        Category.deleteCat(id).then(res => {
          console.log(res)
        })
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
    min-height: ~'calc(100vh - 320px)'
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

</style>
