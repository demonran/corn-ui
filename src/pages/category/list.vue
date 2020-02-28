<template>
  <div>
    <div class="operator">
      <a-button @click="addNew" type="primary">新建</a-button>
    </div>
    <standard-table
      :columns="columns"
      :dataSource="categories"
      :selectedRows="selectedRows"
      rowKey="categoryId"
      @change="onchange"
    />
  </div>
</template>

<script>
import StandardTable from '@/components/table/StandardTable';
import Category from '@/services/category';

export default {
  name: 'WorkPlace',
  components: {StandardTable},
  data () {
    return {
      loading: true,
      categories: [],
      selectedRows: [],
      columns:[
        {
          title: '序号',
          dataIndex: 'categoryId',
        },
        {
          title: '分类名称',
          dataIndex: 'categoryName',
        },
      ]
    };
  },

  mounted () {
    this.list();
  },
  methods: {
    list () {
      Category.list().then(res => {
        console.log(res)
        this.categories = res.result.content;
      })
    },
    addNew() {
      this.$router.push('/settings/category/add');
    }
  },
};
</script>

<style lang="less">
  .project-list {
    .card-title {
      font-size: 0;
      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
        &:hover {
          color: #1890ff;
        }
      }
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;
        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
      .ant-card-meta-description {
        color: rgba(0, 0, 0, 0.45);
        height: 44px;
        line-height: 22px;
        overflow: hidden;
      }
  }
  .item-group{
    padding: 20px 0 8px 24px;
    font-size: 0;
    a{
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }
  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0,0,0,.65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }
</style>
