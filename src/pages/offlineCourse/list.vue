<style lang="less" scoped>
 .search-pannel{
     display: flex;
     align-items: center;
     .label{
         width: 30px;

         &.name {
             margin-left: 25px;
         }
     }
     .input{
         width: 150px;
     }
     .search-btn{
         margin-left: 14px;
         margin-right: 9px;
     }
 }
 .course-list{
     min-height: ~'calc(100vh - 320px)'
 }
</style>

<template>
  <page-layout  title="线下课程列表">
    <div slot="action">
      <a-button type="primary" @click="addCourse">新建</a-button>
    </div>

   <a-card class="course-list" :body-style="{padding: '10px 10px'}" :bordered="true">

       <div slot="title">
           <a-button type="primary" ghost>开启</a-button>
           <a-button type="primary" ghost>停招</a-button>
           <a-button type="primary" ghost>导出</a-button>
       </div>
       <div slot="extra" class="search-pannel">

            <a-radio-group v-model="filterStatus">
                <a-radio-button :value="1">在招</a-radio-button>
                <a-radio-button :value="0">停招</a-radio-button>
            </a-radio-group>

           <div class="label name">名称</div>
           <a-input placeholder="课程名称" class="input" v-model="filterKeyword"/>

           <a-button type="primary" class="search-btn" @click="search">查询</a-button>
           <a-button type="primary" ghost @click="resetList">重置</a-button>
       </div>

       <a-table :columns="columns" rowKey="courseId" :pagination="pagination" :dataSource="data" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
            <span slot="courseId" slot-scope="text,record,index">
             {{index+1}}
           </span>
           <span slot="status" slot-scope="text,record,index">
             {{text == 1?"在招":'停招'}}
           </span>
           <span slot="action" slot-scope="record">
            <a @click="updateRow(record)" >编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="deleteRow(record)" >删除</a>
            <!-- <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>推荐首页</a></a-menu-item>
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item  @click="deleteRow(record)" ><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown> -->
            </span>
       </a-table>
       <div class="footer">

       </div>
   </a-card>
  </page-layout>
</template>

<script>
import PageHeader from '../../components/page/PageHeader';
import PageLayout from '../../layouts/PageLayout';
import OfflineCurse from '@/services/offlineCurse';
import comm from '../mix';

export default {
  name: 'PageView',
  mixins: [comm],

  components: {PageLayout, PageHeader},
  data () {
    return {
      pagination: {
        pageSize: 10,
        total: 0,
        current: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal (total) { return `共${total}项`; }

      },

      filterStatus: 1,
      filterKeyword: '',

      columns: [
        {
          title: '序号',
          dataIndex: 'courseId',
          width: '60px',
          key: 'courseId',
          scopedSlots: { customRender: 'courseId' }
        },
        {
          title: '课程名称',
          dataIndex: 'courseName',
          key: 'courseName'
        },
        {
          title: '类型',
          width: '80px',
          dataIndex: 'courseCategory',
          key: 'courseCategory'
        },
        {
          title: '费用',
          width: '80px',
          dataIndex: 'price',
          key: 'price'
        },
        // {
        //     title: '起始时间',
        //     dataIndex: 'beginDate',
        //     key: 'beginDate',
        // },
        // {
        //     title: '上课时段',
        //     dataIndex: 'startClassTime',
        //     key: 'startClassTime',
        // },
        {
          title: '主讲老师',
          width: '100px',
          dataIndex: 'teacher',
          key: 'teacher'
        },
        {
          title: '招生人数',
          width: '90px',
          dataIndex: 'limitStudents',
          key: 'limitStudents'
        },
        {
          title: '总课时',
          width: '80px',
          dataIndex: 'lesson',
          key: 'lesson'
        },
        {
          title: '状态',
          width: '80px',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          key: 'action',
          width: '130px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      selectedRowKeys: [] // Check here to configure the default column
    };
  },
  computed: {
  },
  created () {
    this.pagination.onShowSizeChange = (index, pageSize) => {
      this.list({pageNum: index, pageSize});
    };
    this.pagination.onChange = (index, pageSize) => {
      this.list({pageNum: index, pageSize});
    };
  },
  mounted () {
    this.list();
  },
  updated () {

  },
  methods: {
    async list (query) {
      if (!query) query = {pageNum: this.pagination.current, pageSize: this.pagination.pageSize};
      if (!query.pageSize) query.pageSize = this.pagination.pageSize;

      query.status = this.filterStatus;
      if (this.filterKeyword) query.keywords = this.filterKeyword;

      this.showLoading();
      let res = await OfflineCurse.list(query);

      console.log(res);
      this.hideLoading();
      if (res.errorNo != 200) {
        this.toast(res.errorDesc, true);
        return;
      }
      this.pagination.total = res.result.total;
      this.data = res.result.content;
    },

    addCourse () {
      this.$router.push('/course/addOffline');
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    resetList () {
      this.filterKeyword = '';
      this.list({pageNum: 1});
    },
    search () {
      this.list({pageNum: 1});
    },
    async  deleteRow (row) {
      this.showLoading();

      let ret = await OfflineCurse.delete(row.courseId);

      this.hideLoading();

      console.log(ret);
    },
    async updateRow( row )
    {
        alert(1);
        this.$router.push({name:'编辑线下课程', params:{courseId:row.courseId}});
    }
  }
};
</script>
