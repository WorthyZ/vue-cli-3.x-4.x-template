import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import state from './modules/state'
import actions from './modules/actions'
import mutations from './modules/mutations'
import getters from './modules/getters'

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
export default store
