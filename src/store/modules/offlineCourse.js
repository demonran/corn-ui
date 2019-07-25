
import {createCourse} from '../../services/offlineCurse';

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

      let ret = await createCourse(data);
      if (ret.errorNo === 200) {
        commit('createdCoursePage', ret.result);
        return;
      }
      return ret.errorDesc;
    },
    async getOfflineCourseList({dispatch, commit}, data) {
      
    }
  }
};
