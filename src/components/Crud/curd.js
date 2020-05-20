import newerCoupon from "@/services/newer-coupon";
import Vue from 'vue'

function CRUD(options = {}) {
  const defaultOptions = {
    // 表格数据
    data: [],
    //标题
    title: '',
    // 待查询的对象
    query: {},
    // Form 表单
    form: {},
    // table加载loading
    loading: false,
    // 重置表单
    defaultForm: () => {
    },
    page: {
      // 页码
      page: 0,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0
    },
    isAdd: true,
    visible: false,
    crudMethod: {
      edit: (form) => {
      },
      add: (form) => {
      },
      del: (id) => {
      },
      list: (params) => {
      }
    }
  }
  options = Object.assign(defaultOptions, options)
  const data = {
    ...options,
    status: {
      add: CRUD.STATUS.NORMAL,
      edit: CRUD.STATUS.NORMAL,
      // 添加或编辑状态
      get cu() {
        if (this.add === CRUD.STATUS.NORMAL && this.edit === CRUD.STATUS.NORMAL) {
          return CRUD.STATUS.NORMAL
        } else if (this.add === CRUD.STATUS.PREPARED || this.edit === CRUD.STATUS.PREPARED) {
          return CRUD.STATUS.PREPARED
        } else if (this.add === CRUD.STATUS.PROCESSING || this.edit === CRUD.STATUS.PROCESSING) {
          return CRUD.STATUS.PROCESSING
        }
        throw new Error('wrong crud\'s cu status')
      },
      // 标题
      get title() {
        return this.add > CRUD.STATUS.NORMAL ? `新增${crud.title}` : this.edit > CRUD.STATUS.NORMAL ? `编辑${crud.title}` : crud.title
      },
    }
  }


  const methods = {
    // 搜索
    toQuery() {
      crud.page.page = 1
      crud.refresh()
    },
    // 刷新
    refresh() {
      crud.crudMethod.list(crud.getQueryParams()).then(res => {
        if (res.result.content) {
          crud.data = res.result.content
          crud.page.page = res.result.current
          crud.page.size = res.result.pageSize
          crud.page.total = res.result.total
        } else {
          crud.data = res.result
        }

      })
    },
    /**
     * 启动添加
     */
    toAdd() {
      crud.resetForm()
      if (!(callVmHook(crud, CRUD.HOOK.beforeToAdd, crud.form) && callVmHook(crud, CRUD.HOOK.beforeToCU, crud.form))) {
        return
      }
      crud.status.add = CRUD.STATUS.PREPARED
    },
    toEdit(data) {
      crud.resetForm(data)
      if (!(callVmHook(crud, CRUD.HOOK.beforeToEdit, crud.form) && callVmHook(crud, CRUD.HOOK.beforeToCU, crud.form))) {
        return
      }
      crud.status.edit = CRUD.STATUS.PREPARED
      crud.resetForm(data)

    },

    doEdit() {
      if (!callVmHook(crud, CRUD.HOOK.beforeSubmit)) {
        return
      }
      crud.status.edit = CRUD.STATUS.PROCESSING
      crud.crudMethod.edit(crud.form).then((res) => {
        crud.status.edit = CRUD.STATUS.NORMAL
        crud.refresh()
      }).catch(() => {
        crud.status.edit = CRUD.STATUS.PREPARED
        callVmHook(crud, CRUD.HOOK.afterEditError)
      });
    },

    doAdd() {
      if (!callVmHook(crud, CRUD.HOOK.beforeSubmit)) {
        return
      }
      crud.status.add = CRUD.STATUS.PROCESSING
      crud.crudMethod.add(crud.form).then((res) => {
        crud.status.add = CRUD.STATUS.NORMAL
        crud.refresh()
      }).catch(() => {
        crud.status.add = CRUD.STATUS.PREPARED
        callVmHook(crud, CRUD.HOOK.afterEditError)
      })
    },
    doDelete(data) {
      crud.crudMethod.del({id:data.id}).then(res => {
        crud.refresh()
      })
    },

    submitCU() {
      crud.findVM('form').$refs.form.validate(valid => {
        console.log(valid)
        if (valid) {
          if (crud.status.add === CRUD.STATUS.PREPARED) {
            crud.doAdd()
          } else if (crud.status.edit === CRUD.STATUS.PREPARED) {
            crud.doEdit()
          }
        }
      })
    },
    /**
     * 取消新增/编辑
     */
    cancelCU() {
      const addStatus = crud.status.add
      const editStatus = crud.status.edit
      if (addStatus === CRUD.STATUS.PREPARED) {
        crud.status.add = CRUD.STATUS.NORMAL
      }
      if (editStatus === CRUD.STATUS.PREPARED) {
        crud.status.edit = CRUD.STATUS.NORMAL
      }
      crud.resetForm()

    },

    getQueryParams() {
      // 清除参数无值的情况
      Object.keys(crud.query).length !== 0 && Object.keys(crud.query).forEach(item => {
        if (crud.query[item] === null || crud.query[item] === '') crud.query[item] = undefined
      })
      return {
        pageNum: crud.page.page,
        pageSize: crud.page.size,
        sort: crud.sort,
        ...crud.query,
      }
    },
    // 当前页改变
    pageChangeHandler(page, size) {
      console.log(page)
      crud.page.page = page
      crud.page.size = size
      crud.refresh()
    },
    // 每页条数改变
    sizeChangeHandler(current, size) {
      crud.page.size = size
      crud.page.page = 1
      crud.refresh()
    },
    /**
     * 重置表单
     * @param {Array} data 数据
     */
    resetForm(data) {
      const form = data || (typeof crud.defaultForm === 'object' ? JSON.parse(JSON.stringify(crud.defaultForm)) : crud.defaultForm.apply(crud.findVM('form')))
      const crudForm = crud.form

      if (Object.keys(form).length === 0) {
        for (const key in crudForm) {
          crudForm[key] = undefined
        }
        return
      }
      for (const key in form) {
        if (crudForm.hasOwnProperty(key)) {
          crudForm[key] = form[key]
        } else {
          Vue.set(crudForm, key, form[key])
        }
      }
    },
  }

  const crud = Object.assign({}, data);
  Vue.observable(crud);
// 附加方法
  Object.assign(crud, methods)

  Object.assign(crud, {
    vms: [],
    /**
     * 注册组件实例
     * @param {String} type 类型
     * @param {*} vm 组件实例
     */
    registerVM(type, vm) {
      const vmObj = {
        type,
        vm: vm
      }
      this.vms.push(vmObj)

    },

    findVM(type) {
      return this.vms.find(vm => vm && vm.type === type).vm
    },

    unregisterVM(type, vm) {
      for (let i = this.vms.length - 1; i >= 0; i--) {
        if (this.vms[i] === undefined) {
          continue
        }
        if (this.vms[i].type === type && this.vms[i].vm === vm) {
          this.vms.splice(i, 1)
          break
        }
      }

    },
  })

  Object.freeze(crud)
  return crud
}


function presenter(crud) {
  return {
    data() {
      // 在data中返回crud，是为了将crud与当前实例关联，组件观测crud相关属性变化
      return {
        crud: this.crud
      }
    },
    beforeCreate() {
      let cruds = this.$options.cruds instanceof Function ? this.$options.cruds() : crud
      this.crud = cruds;
      this.crud.registerVM('presenter', this)
    },
    created() {
      this.crud.toQuery()
    },
    destroyed() {
      this.crud.unregisterVM('presenter', this)
    }
  }
}

/**
 * 分页
 */
function pagination() {
  return {
    data() {
      return {
        crud: this.crud,
        page: this.crud.page
      }
    },
    beforeCreate() {
      this.crud = lookupCrud(this)
      this.crud.registerVM('pagination', this)
    },
    destroyed() {
      this.crud.unregisterVM('pagination', this)
    }
  }
}

/**
 * 表单
 */
function form(defaultForm) {
  return {
    data() {
      return {
        crud: this.crud,
        form: this.crud.form
      }
    },
    beforeCreate() {
      this.crud = lookupCrud(this)
      this.crud.registerVM('form', this)
    },
    created() {
      if (defaultForm) {
        this.crud.defaultForm = defaultForm;
      }
      this.crud.resetForm()
    },
    destroyed() {
      this.crud.unregisterVM('form', this)
    }
  }
}

function crud() {
  return {
    data() {
      return {
        crud: this.crud
      }
    },
    beforeCreate() {
      this.crud = lookupCrud(this)
    }
  }
}

/**
 * 查找crud
 * @param {*} vm
 */
function lookupCrud(vm) {
  // function lookupCrud(vm, tag) {
  if (vm.crud) {
    return vm.crud
  }
  return vm.$parent ? lookupCrud(vm.$parent) : undefined
}

// hook VM
function callVmHook(crud, hook) {
  if (crud.debug) {
    console.log('callVmHook: ' + hook)
  }
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
  })
  return ret
}

/**
 * CRUD状态
 */
CRUD.STATUS = {
  NORMAL: 0,
  PREPARED: 1,
  PROCESSING: 2
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
  presenter,
  pagination,
  form,
  crud
}
