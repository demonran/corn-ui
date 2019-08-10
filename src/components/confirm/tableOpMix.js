import { mapActions } from 'vuex';
import http from '../../services/http';
import qs from 'qs';

export default {
  methods: {
    ...mapActions('table', ['queryTableList', 'postUpdateRow', 'postDeleteRow']),

    async onConfirm () {
      this.visibleId = null;

      let {ok, del, update, post} = this.config.confirm;
      if (del) {
        let data = del.call(this, this.config.text, this.config.record, this.opData);

        window.Bus.$emit('showLoading');

        let error = await this.postDeleteRow({name: this.config.dbname, id:data});

        await this.queryTableList({name: this.config.dbname});

        window.Bus.$emit('hideLoading');

        if (error) {
          this.$message.error(error);
          return;
        }
        this.$message.success('delete success!');
      }

      if (update) {
        let data = update.call(this, this.config.text, this.config.record, this.opData);

        window.Bus.$emit('showLoading');

        let error = await this.postUpdateRow({name: this.config.dbname, data});

        await this.queryTableList({name: this.config.dbname});

        window.Bus.$emit('hideLoading');

        if (error) {
          this.$message.error(error);
          return;
        }
        this.$message.success('update success!');
      }

      if (post) {
        let url = post.url;
        let data = post.data.call(this, this.config.text, this.config.record, this.opData);

        window.Bus.$emit('showLoading');

        let ret = await http.post(url, qs.stringify(data));

        if (post.reset) {
          await this.queryTableList({name: this.config.dbname});
        }

        window.Bus.$emit('hideLoading');

        if (ret.errorNo != 200) {
          this.$message.error(ret.errorDesc);
          return;
        }

        this.$message.success(ret.errorDesc ? ret.errorDesc : 'post success!');
      }

      if (!ok) return;
      ok.call(this, this.config.text, this.config.record);
    }
  }
};
