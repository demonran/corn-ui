
<style lang="less" scoped>
.keyword-input{
  width: 180px;
}
.row-deal-img {
    width: 60px;
    height: 60px;
    background-color: gray;
    object-fit: cover;
}
.original-price{
  text-decoration: line-through;
}
.extra-op{
  display: flex;
  .ant-btn{
      margin: 0 4px;
  }
}
.warning{
  color:red;
  text-decoration: line-through;
}

</style>

<template>
  <page-layout>

    <!-- <slot name="action"  slot="action">
        <a-button v-show="showAdd" size="small" type="primary"  icon="plus" @click="addRow">添加</a-button>
        <a-button v-show="showUpdate" size="small" type="primary"  icon="reload" @click="updateData">刷新</a-button>
    </slot> -->

    <a-card :bordered="true">
        <div slot="title">
           <TableActions :config="actions" @clickAction="onClickAction"/>
        </div>
        <div slot="extra" class="extra-op" v-if="search && search.length>0">
           <Search v-show="search.length > 0 " :config="search" @search="clickSearch" @reset="reset"/>
        </div>

        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="tableConfig.cols" v-if="table && table.length>0" :rowKey="db.id" :dataSource="dataPage?dataPage.list:[]" :pagination="pagination" @change="tableChange">
            <template :slot="item.name" slot-scope="text,record, index" v-for="item in tableConfig.slots" >
                <component :is="item.cell.name" v-if="item.name != '_actions'" :key="item.name" :config="{text:item.value?item.value(text,record,index):text, record, index, dbidField:db.id,dbname:db.name, cell:item.cell}" ></component>
            </template>

        </a-table>
        <slot></slot>
    </a-card>
  </page-layout>
</template>

<script>
import PageHeader from '../components/page/PageHeader';
import PageLayout from './PageLayout';
import HeadInfo from '../components/tool/HeadInfo';
import Radar from '../components/chart/Radar';
import { mapState, mapActions } from 'vuex';
import mix from '../pages/mix';
import Search from '../views/search';
import TableActions from '../views/actions';


export default {
  name: 'StoreList',
  mixins: [mix],
  components: {Radar, HeadInfo, PageLayout, PageHeader,Search,TableActions},
  props: {
    title: String,
    showAdd: Boolean,
    showUpdate: Boolean,
    search: Array,
    table: Array,
    services: Object,
    db: Object,
    route: Object,
    actions:Array,
  },

  data () {
    return {
      dataPage:null,

      pagination: {
        pageSize: 10,
        total: 50,
        current: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal (total) { return `总共 ${total} 条`; },
        onShowSizeChange (current, size) {
          console.log('onShowSizeChange', current, size);
        },
        change (page, pageSize) {
          console.log('change', page, pageSize);
        }
      },
      data: [],
      orderBy: '',
      selectedRowKeys:[]
    };
  },
  computed: {
    ...mapState('deal', ['dealPage']),
    tableConfig () {
      let tableC = this.table;
      if (!tableC || tableC.length < 1) return {cols: [], slots: []};
      let n = tableC.length;
      let cols = [];
      let slots = [];

      for (let i = 0; i < n; i++) {
        let item = tableC[i];
        let cfgCol = {
          title: item.title, dataIndex: item.dataIndex
        };
        if (item.width) {
          cfgCol.width = item.width;
        }

        let cell = item.cell;
        if (!cell) {
          cell = {
            name: 'textCell'
          };
        }
        let slotName = item.slot ? item.slot : item.dataIndex;
        cfgCol.scopedSlots = {
          customRender: slotName
        };
        slots.push({name: slotName, value: item.value, cell});

        cols.push(cfgCol);
      }
      if (this.actionDel || this.actionDetail) {
        cols.push({title: '操作', scopedSlots: {customRender: '_actions'}});
        slots.push({name: '_actions',
          actions: {
            del: this.actionDel, detail: this.actionDetail
          } });
      }

      return {cols, slots};
    },
    
  },
  mounted () {
    // await this.queryCategoryList();
    // console.log('mounted', this.db );
    this.updateData();
  },
  methods: {
    ...mapActions('table', ['queryTableList', 'getTablePage', 'postDeleteRow']),

    tableChange (pagination, filters, sorter) {
      console.log(pagination, sorter);

      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;

      let query = {pageNum: pagination.current, pageSize: pagination.pageSize};
      if (this.filterCategory !== '-1') query.categoryIds = this.filterCategory;
      if (this.filterKeyword !== '') query.keywords = this.filterKeyword;

      if (sorter.field) {
        let fields = {'memberPoints': 'member_points', 'addTime': 'add_time', 'lifeTimeCashBack': 'life_time_cash_back', 'pendingCashBack': 'pending_cash_back'};
        let sorts = {'descend': 'desc', 'ascend': 'asc'};

        query.orderBy = `${fields[sorter.field]} ${sorts[sorter.order]}`;
        this.orderBy = query.orderBy;
      } else {
        this.orderBy = null;
      }
      this.updateData(query);
    },
    handleSortChange (value) {
      this.sortBy = value;
      console.log(`selected ${value}`);
    },

    async updateData (query) {
      this.showLoading();
      let error = await this.queryTableList({name: this.db.name, query});
      this.hideLoading();

      if (error) {
        this.toast(error, true);
        return;
      }
      let page = await this.getTablePage(this.db.name);

       console.log( page );

      this.pagination.pageSize = page.pageSize;
      this.pagination.total = page.total;
      this.pagination.current = page.pageNum;

      this.dataPage = page;
    },

    clickSearch (vals) {

      let query = {pageNum: 1, ...vals};
      // if (this.orderBy) query.orderBy = this.orderBy;
      this.updateData(query);
    },
    
    reset () {
      let query = {pageNum: 1};
      this.updateData(query);
    },

    showUpdatePage (row) {
      if (row.password) row.password = '';
      this.$emit('pageChange', 'update', {row: row});
    },
    addRow () {
      this.$emit('pageChange', 'add');
    },

    async deleteRow (row) {
      this.showLoading();

      let id = row[this.db.id];
      let error = await this.postDeleteRow({name: this.db.name, id});

      this.hideLoading();

      if (error) {
        this.toast(error, true);
        return;
      }

      this.toast('删除成功!');
    },

     onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    onClickAction(item)
    {
       if( item.name == '添加')
       {
          this.addRow();
          return;
       }
       console.log(item);
    }
  }
};
</script>
