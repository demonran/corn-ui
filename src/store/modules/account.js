import PouchDB from 'pouchdb';
import {postLogin} from '../../services/user';

var db = new PouchDB('admindb');

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setuser (state, user) {
      state.user = user;
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
      if( ret.errorNo === 200 ) {

         commit("setuser", ret.data);
         return;
      }
      return ret.errorDesc;
    }
  }
};
