function fmtt (ival) {
  let d = new Date(ival * 1000);
  let m = d.getMonth() + 1;
  let dt = d.getDate();
  // let h = d.getHours()
  // let mi = d.getMinutes(), s = d.getSeconds()
  function f (v) { return v < 10 ? '0' + v : v; };
  return `${f(m)}/${f(dt)}/${d.getFullYear()}`;
}

export default {
  filters: {
    Time (ival) {
      return fmtt(ival);
    },
    userStatus (v) {
      if (v == '0') return 'normal';
      else if (v == '1') return 'freezed';
      return 'unkown';
    }
  },
  methods: {
    fmtRowTime (name) {
      return function (row) {
        return fmtt(row[name]);
      };
    },
    fmtTime (ival) {
      return fmtt(ival);
    },

    toast (text, error) {
      if (error) {
        this.$message.error(text);
        return;
      }
      this.$message.success(text);
    },

    showLoading () {
      window.Bus.$emit('showLoading');
    },
    hideLoading () {
      window.Bus.$emit('hideLoading');
    },

    formCheckImage (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback('image is required!');
    },
    formCheckPass (rule, value, callback) {
      callback();
    }
  }
};
