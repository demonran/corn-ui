<template>
  <div class="crud-ops">
    <span>
      <a-button
        icon="plus"
        @click="crud.toAdd()"
        type="primary">
        新建
      </a-button>
    </span>
    <a-button-group class="crud-ops-right">
      <a-button
        icon="sync"
        @click="crud.refresh()"
      />
    </a-button-group>

  </div>
</template>

<script>
  import CRUD, {crud} from "@/components/Crud/curd";

  export default {
    name: "CRUD.Operation",
    mixins: [crud()]
  }
</script>

<style lang="less" scoped>

  .crud-ops {
    margin-bottom: 10px;
  }

  .crud-ops-right {
    float: right;
  }

</style>
