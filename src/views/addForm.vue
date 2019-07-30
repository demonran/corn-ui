<template>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form">

      <a-form-item
        :label="item.label"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        v-for="(item,index) in config"
        :key="index"
      >
        <component :is="item.uiname" :config="item.uioption"
            v-decorator="[item.name,{rules: [{required:item.required, validator: checkColsItem }],initialValue:item.uioption.initVal}]"
         ></component>
      </a-form-item>

       <!-- <a-form-item
        label="Terms&Conditions"
        :required="true"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 13}"
      >
      <tinymce v-decorator="['content',{rules: [{ validator: checkImage }], initialValue:terms}]" />

      </a-form-item> -->

    <a-form-item :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="add">保存</a-button>
    </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import imgUpload from '@/components/uploadImg';
import {mapActions} from 'vuex';
import tinymce from '@/components/tinymce/tinymce';
import mix from '@/pages/mix';

export default {
  mixins: [mix],

  props: {
    data: Object,
    type: String,
    cols: Array,
    dbname: String,
    dbid: String
  },
  components: {imgUpload, tinymce},

  data () {
    return {
      form: this.$form.createForm(this)
    };
  },
  computed: {
    config () {
      let cols = this.cols;
      let n = cols.length;
      let ret = [];
      for (let i = 0; i < n; i++) {
        let col = cols[i];
        let cfg = { ...this.getObjVal(col.name, 'name', 'label'),
          ...this.getUIObj(col.ui, 'uiname', 'uioption')
        };
        if (!cfg.uioption) {
          cfg.uioption = {};
        }
        cfg.uioption.name = cfg.name;
        cfg.required = col.required;

        cfg.default = col.default;

        ret.push(cfg);
      }
      console.log(ret);
      return ret;
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.type === 'update') {
        let data = {...this.data};
        this.form.setFieldsValue(data);
      }
    });
  },
  watch: {
    data () {
      if (this.type === 'update') {
        let data = {...this.data};
        this.form.setFieldsValue(data);
      }
    }
  },
  created () {
    this.$on('onAdd', (e) => {
      e && e.preventDefault();
      this.showLoading();

      this.form.validateFields((err, values) => {
        if (err) {
          console.log(err);
          this.hideLoading();

          return;
        }

        if (this.type === 'add') {
          console.log(values);

          this.postAddRow({name: this.dbname, data: values}).then((error) => {
            this.hideLoading();

            if (!error) {
              this.toast("添加成功！");
              return;
            }
            this.toast(error, true);
          });
          return;
        }

        if (this.type === 'update') {
          let data = {
            ...values
          };
          data[this.dbid] = this.data[this.dbid];
          console.log(data);

          this.postUpdateRow({name: this.dbname, data}).then((error) => {
            this.hideLoading();

            if (!error) {
              this.toast("更新成功！");
              return;
            }
            this.toast(error, true);
          });
        }
      });
    });
  },

  methods: {
    ...mapActions('table', ['postAddRow', 'postUpdateRow']),

    getObjVal (obj, name1, name2) {
      let ret = {};
      if (typeof obj == 'string') {
        ret[name1] = obj;
        ret[name2] = obj;
        return ret;
      }
      let keys = Object.keys(obj);
      ret[name1] = keys[0];
      ret[name2] = obj[keys[0]];
      return ret;
    },
    getUIObj (obj, name, option) {
      let ret = {};
      if (typeof obj == 'string') {
        ret[name] = obj;
        ret[option] = null;
      } else {
        let keys = Object.keys(obj);
        ret[name] = keys[0];
        ret[option] = obj[keys[0]];
      }
      return ret;
    },

    checkColsItem (rule, value, callback) {
      console.log(rule);

      if (!rule.required || (value !== undefined && value !== null && value !== '')) {
        callback();
        return;
      }

      callback(`${rule.field} is required!`);
    },

    add (e) {
      this.$emit('onAdd');
    }
  }
};
</script>
