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
                <a-radio-button value="1">在招</a-radio-button>
                <a-radio-button value="0">停招</a-radio-button>
            </a-radio-group>

           <div class="label name">名称</div>
           <a-input placeholder="课程名称" class="input"/>

           <a-button type="primary" class="search-btn">查询</a-button>
           <a-button type="primary" ghost @click="resetList">重置</a-button>
       </div>

       <a-table :columns="columns" :pagination="pagination" :dataSource="data" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
           <span slot="id" slot-scope="text,record,index">
               {{index+100}}
           </span>
           <span slot="action" slot-scope="record">
            <a href="javascript:;">详情</a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>推荐首页</a></a-menu-item>
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
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
export default {
  name: 'PageView',
  components: {PageLayout, PageHeader},
  data () {
    return {
      pagination: {
        pageSize: 10,
        total: 50,
        current: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal (total) { return `共${total}项`; },
        onShowSizeChange () {
          console.log('onShowSizeChange');
        }
      },

      filterStatus: '0',
      columns: [
        {
          title: '序号',
          key: 'id',
          width: '60px',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '课程名称',
          dataIndex: 'courseTitle',
          key: 'courseTitle'
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
          title: '已有学员',
          width: '90px',
          dataIndex: 'totalAmount',
          key: 'totalAmount'
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
          dataIndex: 'courseId',
          key: 'courseId'
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
  mounted () {
    this.list();
  },
  updated () {

  },
  methods: {
    list () {
      OfflineCurse.list().then(res => {
        this.data = res.result;
      });
    },
    addCourse () {
      this.$router.push('/course/addOffline');
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    resetList () {

    }
  }
};
</script>
