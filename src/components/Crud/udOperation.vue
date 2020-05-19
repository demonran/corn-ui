<template>
  <div>
    <a-button type="primary" icon="edit" @click="crud.toEdit(data)"/>
    <a-popconfirm title="是否要删除此行？" @confirm="crud.doDelete(data)">
      <a-button  type="danger" icon="delete"></a-button>
    </a-popconfirm>
  </div>

</template>

<script>
  import CRUD, {crud} from "@/components/Crud/curd";

  export default {
    mixins: [crud()],
    name: "udOperation",
    props: {
      data: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
