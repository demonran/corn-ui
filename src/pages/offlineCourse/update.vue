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
  <page-layout  title="添加课程">
      <Add type="update" />
  </page-layout>
</template>

<script>
import PageHeader from '../../components/page/PageHeader';
import PageLayout from '../../layouts/PageLayout';
import Add from './add/step-form';

export default {
  name: 'PageView',
  components: {PageLayout, PageHeader, Add},
  data () {
    return {
    };
  },
  computed: {
  },
  watch:{
      $route(){
          if( this.$route.fullPath != "/course/updateOffline" ) return;

          console.log( this.$route.params.courseId);
      }
  },
  mounted () {
    //   console.log(this.$route );
    
  },
  updated () {

  },
  methods: {
  }
};
</script>
