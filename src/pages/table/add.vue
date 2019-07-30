<template>
     <page-layout :title="config.title">
        <addForm :cols="colsDef" type='add' :dbname="dbname" :dbid="dbid"></addForm>
    </page-layout>

</template>
<script>
import PageLayout from '../../layouts/PageLayout';
import addForm from '@/views/addForm';

export default {
  components: {addForm, PageLayout},
  props: ['config', 'dbname', 'dbid', 'cols'],
  data () {
    return {
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
  mounted () {
    console.log(this.config, this.dbname);
  }
};
</script>
