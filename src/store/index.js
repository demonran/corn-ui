/**
 * 应用状态管理
 */
import Vue from "vue";
import Vuex from 'vuex'
import app from './app';
import goods from "./goods";
import dbs from "./dbs";
import category from "./category";
import promo from "./promotion";
import order from "./order";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        goods,
        dbs,
        category,
        promo,
        order
    }
});
  
if (module.hot) {
    module.hot.accept([
        './app',
        "./goods",
        "./dbs",
        "./category",
        "./promotion",
        "./order"
    ], () => {
        var g = require('./app').default

        store.hotUpdate({
            modules:{
                app: g,
                goods:require('./goods').default,
                dbs:require('./dbs').default,
                category:require("./category").default,
                promo:require("./promotion").default,
                order:require("./order").default,
            }
        })
    })
}
export default store
