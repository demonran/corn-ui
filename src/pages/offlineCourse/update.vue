<style lang="less" scoped>
.search-pannel {
  display: flex;
  align-items: center;
  .label {
    width: 30px;

    &.name {
      margin-left: 25px;
    }
  }
  .input {
    width: 150px;
  }
  .search-btn {
    margin-left: 14px;
    margin-right: 9px;
  }
}
.course-list {
  min-height: ~"calc(100vh - 320px)";
}
</style>

<template>
  <page-layout title="添加课程">
    <Add type="update" />
  </page-layout>
</template>

<script>
import PageHeader from "../../components/page/PageHeader";
import PageLayout from "../../layouts/PageLayout";
import Add from "./add/step-form";

export default {
  name: "PageView",
  components: { PageLayout, PageHeader, Add },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    let isUpdate = this.$route.params.isUpdate; //true为编辑进入，false或为空就是新增
    if (isUpdate == true) {
      let rowData = this.$route.params.data;
      // this.form.setFieldsValue(rowData);
      console.log("update+", rowData);
    }

    //this.categoryName = rowData.courseCategory.categoryName

    //this.isShareBrokerage = rowData.isShareBrokerage
    //this.values.isShareBrokerage = values.brokerage.isSet == 1;
    //this.values.shareBrokerageAmount = values.brokerage.money;
  },
  watch: {
    /*   $route () {
   let rowData = this.$route.params.data
           let isUpdate = this.$route.params.isUpdate;//true为编辑进入，false或为空就是新增
          this.form.setFieldsValue(rowData);

  console.log('rowData',rowData)


      } */
  },

  updated() {},
  methods: {}
};
</script>
