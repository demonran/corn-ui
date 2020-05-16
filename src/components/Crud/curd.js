import newerCoupon from "@/services/newer-coupon";

function CRUD() {

}

function crud(options = {}) {
  let data = {
    datasource: [],
    isAdd: true,
    visible: false,
    crudMethod: {
      edit: (form) => {
      },
      add: (form) => {
      },
      del: (id) => {
      },
      list: (params) => {}
    }
  }
  data = Object.assign(data, options);
  console.log(data)
  return {
    data() {
      return data
    },
    mounted() {
      this.refresh();
    },
    methods: {
      refresh() {
        this.crudMethod.list().then(res => {
          this.datasource = res.result.content
        })
      },
      toEdit(data) {
        this.isAdd = false
        this.visible = true
        this.form = data;

      },
      doEdit(data) {
        if (this.beforeToEdit) {
          this.beforeToEdit(data);
        }
        this.crudMethod.edit(data).then(res => {
          console.log(res)
          this.confirmLoading = false
          this.visible = false
          this.refresh()
        });
      },
      doAdd(data) {
        if (this.beforeToAdd) {
          this.beforeToAdd(data);
        }
        this.crudMethod.add(data).then(res => {
          this.confirmLoading = false
          this.visible = false
          this.refresh()
        })
      },
      doDelete(data) {
        this.crudMethod.del(data.id).then(res => {
          this.refresh()
        })
      },
      submitCU() {
        this.$refs.form.validate(valid => {
          console.log(valid)
          if (valid) {
            this.confirmLoading = true
            if (this.isAdd) {
              this.doAdd(this.form);
            } else {
              this.doEdit(this.form);
            }
          }
        })
      },
    }
  }
}

// hook VM
function callVmHook(crud, hook) {
  if (crud.debug) {
    console.log('callVmHook: ' + hook)
  }
  const tagHook = crud.tag ? hook + '$' + crud.tag : null
  let ret = true
  const nargs = [crud]
  for (let i = 2; i < arguments.length; ++i) {
    nargs.push(arguments[i])
  }
  // 有些组件扮演了多个角色，调用钩子时，需要去重
  const vmSet = new Set()
  crud.vms.forEach(vm => vm && vmSet.add(vm.vm))
  vmSet.forEach(vm => {
    if (vm[hook]) {
      ret = vm[hook].apply(vm, nargs) !== false && ret
    }
    if (tagHook && vm[tagHook]) {
      ret = vm[tagHook].apply(vm, nargs) !== false && ret
    }
  })
  let vm = this;
  vm[hook].apply(vm, nargs)
  return ret
}

/**
 * CRUD钩子
 */
CRUD.HOOK = {
  /** 刷新 - 之前 */
  beforeRefresh: 'beforeCrudRefresh',
  /** 刷新 - 之后 */
  afterRefresh: 'afterCrudRefresh',
  /** 删除 - 之前 */
  beforeDelete: 'beforeCrudDelete',
  /** 删除 - 之后 */
  afterDelete: 'afterCrudDelete',
  /** 删除取消 - 之前 */
  beforeDeleteCancel: 'beforeCrudDeleteCancel',
  /** 删除取消 - 之后 */
  afterDeleteCancel: 'afterCrudDeleteCancel',
  /** 新建 - 之前 */
  beforeToAdd: 'beforeCrudToAdd',
  /** 新建 - 之后 */
  afterToAdd: 'afterCrudToAdd',
  /** 编辑 - 之前 */
  beforeToEdit: 'beforeCrudToEdit',
  /** 编辑 - 之后 */
  afterToEdit: 'afterCrudToEdit',
  /** 开始 "新建/编辑" - 之前 */
  beforeToCU: 'beforeCrudToCU',
  /** 开始 "新建/编辑" - 之后 */
  afterToCU: 'afterCrudToCU',
  /** "新建/编辑" 验证 - 之前 */
  beforeValidateCU: 'beforeCrudValidateCU',
  /** "新建/编辑" 验证 - 之后 */
  afterValidateCU: 'afterCrudValidateCU',
  /** 添加取消 - 之前 */
  beforeAddCancel: 'beforeCrudAddCancel',
  /** 添加取消 - 之后 */
  afterAddCancel: 'afterCrudAddCancel',
  /** 编辑取消 - 之前 */
  beforeEditCancel: 'beforeCrudEditCancel',
  /** 编辑取消 - 之后 */
  afterEditCancel: 'afterCrudEditCancel',
  /** 提交 - 之前 */
  beforeSubmit: 'beforeCrudSubmitCU',
  /** 提交 - 之后 */
  afterSubmit: 'afterCrudSubmitCU',
  afterAddError: 'afterCrudAddError',
  afterEditError: 'afterCrudEditError'
}

export default CRUD

export {
  crud
}
