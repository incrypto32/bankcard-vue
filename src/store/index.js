import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const vuexSessionStorage = new VuexPersistence({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.sessionStorage, // or window.sessionStorage or localForage
  reducer: (state) => ({
    keepThisModule: state.user,
    // getRidOfThisModule: state.getRidOfThisModule (No one likes it.)
  }),
});
export default new Vuex.Store({
  plugins: [vuexSessionStorage.plugin],
  state: {
    user: {},
  },
  getters: {
    getUser: (state) => state.user,
  },

  mutations: {},
  actions: {
    setUser(state, user) {
      console.log("setUser Called");
      console.log(user.email);
      state.user = user;
      console.log(`email is ${state.user.email}`);
      console.log(`user is ${this.getters.getUser}`);
    },
  },
  modules: {},
});
