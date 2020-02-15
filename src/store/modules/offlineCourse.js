
import Offline from '../../services/offlineCurse';

export default {
  namespaced: true,
  state: {
    coursePage: {list: []}
  },
  mutations: {
    createdCoursePage (state, data) {
      console.log(data);
    }
  },
  actions: {
    async postCreateCourse ({dispatch, commit}, data) {
      let ret = await Offline.create(data);
      if (ret.errorNo === 200) {
        commit('createdCoursePage', ret.result);
        return;
      }
      return ret.errorDesc;
    },

    async postUpdateCourse ({dispatch, commit},params) {
      console.log("diaoyonghou   "+params.id+"   =    "+params.data)
    let ret = await Offline.update(params.id,params.data);
      if (ret.errorNo === 200) {
        commit('updateCoursePage', ret.result);
        return;
      }
      return ret.errorDesc;
    },
    /* async postUpdateRow ({dispatch, commit, state}, {name, data}) {
      let {services, debug} = dbTables.configs[name];

      let updateUrl = services.update;

      let httpObj = debug ? mock : http;

      let ret = await httpObj.put(updateUrl, data);
      if (ret.errorNo === 200) {
        ret = await dispatch('queryTableList', {name});
        return ret;
      }
      return ret.errorDesc;
    } */
  }
};
