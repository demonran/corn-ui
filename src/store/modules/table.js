import http from '../../services/http';
import mock from '../../services/mockHttp';
import qs from 'qs';
import dbTables from '../../tables/index';

let ret = {
  namespaced: true,
  state: {
    emailPage: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      list: []
    }
  },
  mutations: {
    setPage (state, {name, page}) {
      let s = state[name + 'Page'];
      s.total = page.total;
      s.pageSize = page.pageSize;
      s.pageNum = page.pageNum;
      s.list = page.content;
    }
  },
  actions: {

    async getTablePage ({dispatch, commit, state}, name) {
      return state[name + 'Page'];
    },

    async queryTableList ({dispatch, commit, state}, {name, query}) {
      let statePage = state[name + 'Page'];
      if (!query) query = {};
      if (!query.pageNum) {
        query.pageNum = statePage.pageNum;
      }
      if (!query.pageSize) {
        query.pageSize = statePage.pageSize;
      }

      let {services, debug} = dbTables.configs[name];

      let quryListUrl = services.list;

      let httpObj = debug ? mock : http;
      let ret = await httpObj.get(quryListUrl + '?' + qs.stringify(query));

      if (ret.errorNo === 200) {
        console.log(ret);
        commit('setPage', {name, page: ret.result});
        return;
      }

      return ret.errorDesc;
    },
    async postDeleteRow ({dispatch, commit, state}, {name, id}) {
      let {services, debug} = dbTables.configs[name];

      let deleteUrl = services.delete;

      let httpObj = debug ? mock : http;

      let ret = await httpObj.delete(deleteUrl + '/' + id);

      if (ret.errorNo === 200) {
        ret = await dispatch('queryTableList', {name});
        return ret;
      }

      return ret.errorDesc;
    },
    async postAddRow ({dispatch, commit, state}, {name, data}) {
      let services = dbTables.configs[name].services;
      let addUrl = services.add;

      let ret = await http.post(addUrl, qs.stringify(data));

      console.log('postAddRow', ret);

      if (ret.errorNo === 200) {
        ret = await dispatch('queryTableList', {name});
        return ret;
      }

      return ret.errorDesc;
    },
    async postUpdateRow ({dispatch, commit, state}, {name, data}) {
      let services = dbTables.configs[name].services;
      let updateUrl = services.update;

      let ret = await http.post(updateUrl, qs.stringify(data));
      if (ret.errorNo === 200) {
        ret = await dispatch('queryTableList', {name});
        return ret;
      }
      return ret.errorDesc;
    }
  }
};

for (let dbname in dbTables.configs) {
  ret.state[dbname + 'Page'] = {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    list: []
  };
}

export default ret;
