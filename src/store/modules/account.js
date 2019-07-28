import PouchDB from 'pouchdb';
import {postLogin, postLoginout} from '../../services/user';
import defaultAvator from '../../assets/defaultAvator.jpeg';

var db = new PouchDB('admindb');

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setuser (state, user) {
      if (!user.name) user.name = user.dbid;
      if (!user.avatar) user.avatar = defaultAvator;

      state.user = user;
      console.log('user', user);

      db.get('currUser').then(doc => {
        db.put({
          _id: 'currUser',
          _rev: doc._rev,
          user: user
        });
      }).catch(e => {
        if (e.status === 404) {
          db.put({
            _id: 'currUser',
            user: user
          });
        } else {
          throw e;
        }
      });
    }
  },
  actions: {
    async login ({dispatch, commit}, {name, password, verifyCode}) {
      let ret = await postLogin({userName: name, password, verifyCode});
      if (ret.errorNo === 200) {
        commit('setuser', ret.result);

        localStorage.setItem('dbid', ret.result.dbid);

        return;
      }
      return ret.errorDesc;
    },

    async loginout ({dispatch, commit}) {
      let ret = await postLoginout();
      if (ret.errorNo !== 200) return ret.errorDesc;
    }

  }
};
