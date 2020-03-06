<template>
  <page-layout title="线下课程列表">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
      <a-row style="padding-top:10px;">
        <a-col :md="14" :sm="24">
          <a-button class="btn" @click="addCourse" type="primary">新建</a-button>
          <!-- <a-button class="btn" type="primary" ghost>开启</a-button>
          <a-button class="btn" type="primary" ghost>停招</a-button>
          <a-button class="btn" type="primary" ghost>导出</a-button> -->
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
        <!--         <a-col :md="6" :sm="24" >
                   <a-form-item
                     label="状态:"
                     :labelCol="{span: 5}"
                     :wrapperCol="{span: 16, offset: 1}"
                   >
                     <a-select v-model="filterStatus" placeholder="请选择" style="width:100%">
                       <a-select-option :value="1">招生中</a-select-option>
                       <a-select-option :value="0">已停招</a-select-option>
                     </a-select>

                   </a-form-item>
                 </a-col> -->
        <a-col :md="4" :sm="24">
          <a-button type="primary" class="btn fr" @click="resetList">重置</a-button>
          <a-button type="primary" class="btn fr" @click="search">查询</a-button>

        </a-col>
      </a-row>

      <a-table class="table"
        :columns="columns"
        :scroll="{ x: '100%', y: 600 }"
        rowKey="id"
        :pagination="pagination" :dataSource="dataSource"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
          <span slot="courseId" slot-scope="text,record,index">
             {{index+1}}
          </span>
        <template slot="imageUrl" slot-scope="imageUrl">
          <img :src="imageUrl"/>
        </template>
        <span slot="courseCategory"  slot-scope="text,record,index">
          {{text.courseCategory.categoryName}}
        </span>
        <span slot="beginDate" slot-scope="text,record">
             {{record.beginDate}} ~ {{record.endDate}}
          </span>
        <span slot="startClassTime" slot-scope="text,record">
             {{record.startClassTime}}-{{record.endClassTime}}
          </span>
        <span slot="status" slot-scope="status">
             {{status == 'OPENED'?"在招":'停招'}}
          </span>
        <span slot="action" slot-scope="text,record">
            <a-menu-item @click="recommendRow(text,!text.recommend)">
              <a>
                {{text.recommend==true?'取消推荐':'推荐首页'}}
              </a>
             </a-menu-item>
            <a-menu-item @click="update(record)"><a>编辑</a></a-menu-item>
            <a-menu-item @click="changeStatus (text,!text.status)">
              <a>
                {{text.status=='closed'?'重启':'停招'}}
              </a>
              </a-menu-item>

          <a-popconfirm title="是否要删除此行？" @confirm="deleteRow(record)">
            <a>删除</a>
          </a-popconfirm>
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

    </a-card>
  </page-layout>
</template>

<script>

  import PageLayout from '../../layouts/PageLayout';
  import OfflineCurse from '@/services/offlineCurse';
  import comm from '../mix';


  export default {
    name: 'PageView',
    mixins: [comm],
    components: {PageLayout},
    data() {
      return {
        pagination: {
                pageSize: 5,
                total: 0,
                defaultCurrent: 1,
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30", "40"],
                showTotal(total) {
                  return `共${total}项`;
                }

              },
        filterStatus: 1,
        filterKeyword: '',
        columns: [
          {
            title: '序号',
            dataIndex: 'courseId',
            key: 'courseId',
            scopedSlots: {customRender: 'courseId'},
            width: 30

          },
          {
            title: '课程名称',
            dataIndex: 'courseName',
            key: 'courseName',
            width: 100
          },
          {
            title: '封面',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            scopedSlots: {customRender: 'imageUrl'},
            width: 100
          },
          {
            title: '课程分类',
            dataIndex: 'courseCategory',
            key: 'courseCategory',
            scopedSlots: {customRender: 'courseCategory'},
            width: 100
          },
          {
            title: '费用',
            dataIndex: 'price',
            key: 'price',
            width: 100
          },
          {
            title: '起始时间',
            dataIndex: 'beginDate',
            key: 'beginDate',
            scopedSlots: {customRender: 'beginDate'},
            width: 100
          },
          {
            title: '上课时段',
            dataIndex: 'startClassTime',
            key: 'startClassTime',
            scopedSlots: {customRender: 'startClassTime'},
            width: 100
          },
          {
            title: '主讲老师',
            dataIndex: 'teacher',
            key: 'teacherName',
            width: 100
          },
          {
            title: '招生人数',
            dataIndex: 'limitStudents',
            key: 'limitStudents',
            width: 100
          },
          {
            title: '总课时',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 100
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: {customRender: 'status'},
            width: 100
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            scopedSlots: {customRender: 'action'}
          },
        ],
        dataSource: [],
        selectedRows: [],
        selectedRowKeys: [] // Check here to configure the default column
      };
    },
    computed: {},
    activated(){
      this.list();
    },
    methods: {
      // 选中项改变
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
        },
        list() {
          // todo 参数需要修改
          OfflineCurse.list(
            //Object.assign(this.page, { filterKeyword: this.filterKeyword })
          )
            .then(res => {
              console.log(res);
              this.dataSource = res.result.content
              /* this.dataSource =
                this.page.pageNum === 1
                  ? res.result.content
                  : this.dataSource.concat(res.result.content);
              this.pagination.total = res.result.total || 0; */
            })
            .catch(e => {
              // this.toast(e.errorDesc, true);
              // this.pagination.total = 0;
              console.log(e);
            });
        },
      addCourse() {
        this.$router.push('/course/addOffline');
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
      resetList() {
        this.filterKeyword = '';
        this.list({pageNum: 1});
      },
      search() {
        this.list({pageNum: 1});
      },
      async deleteRow(row) {
        this.showLoading();
        let ret = await OfflineCurse.delete(row.courseId);
        console.log(ret)
        this.list()
      },
      async recommendRow(text, rec) {
        //this.showLoading();
        let res = await OfflineCurse.recommend(text, rec);
        this.list();

      },
      async changeStatus(text, status) {

        let res = await OfflineCurse.change(text.courseId, text.status);
        this.list();
      },
      async update(row) {
        this.$emit('finish');
        //this.$router.push({name:'编辑线下课程', params:{data:row}});
        this.$router.push({name: '编辑线下课程', params: {courseId: row.courseId, data: row, isUpdate: true}});
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
