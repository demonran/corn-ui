<template>
  <a-pagination class="pagination"
    :current="page.page"
    :total="page.total"
    show-size-changer
    :page-size-options="['5','10','20','50']"
    @show-size-change="crud.sizeChangeHandler"
    @change="crud.pageChangeHandler"
    :showTotal = "total => `共${total}项`"
  />
</template>

<script>
  import CRUD, {pagination} from "@/components/Crud/curd";

  export default {
    name: "Pagination",
    mixins: [pagination()]
  }
</script>

<style scoped>
    .pagination{
      margin-top: 8px;
      float: right;
    }
</style>
