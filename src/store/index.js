import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const vuexSessionStorage = new VuexPersistence({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.sessionStorage, // or window.sessionStorage or localForage
  reducer: (state) => ({
    keepThisModule: state.user,
  }),
});
export default new Vuex.Store({
 
  state: {

  },
  getters: {

  },

  mutations: {
   
  },
  actions: {
  
  },
  modules: {},
});
