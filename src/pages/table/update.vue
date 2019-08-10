<template>
     <page-layout :title="config.title">
        <addForm :cols="colsDef" type='update' :data="rowData" :dbname="dbname" :dbid="dbid" :key="'update' + dbname"></addForm>
    </page-layout>

</template>
<script>
import PageLayout from '../../layouts/PageLayout';
import addForm from '@/views/addForm';

export default {
  components: {addForm, PageLayout},
  props: ['config', 'path', 'dbname', 'dbid', 'cols'],

  data () {
    return {
      rowData: null
    };
  },
  computed: {
    colsDef () {
      let ret = [];
      let cols = this.cols;
      cols.forEach(item => {
        if (item.addable) {
          ret.push({...item, ...item.addable});
        }
      });


      return ret;
    }
  },
  mounted(){
    if( this.$route.params.row )
    {
       this.rowData = this.$route.params.row;
    }
  },
  watch: {
    $route () {
      console.log( this.path, this.$route.fullPath);

      if (this.$route.fullPath === this.path) {
        console.log('update update', this.$route.params);
        this.rowData = this.$route.params.row;
      }
    }
  }
};
</script>
