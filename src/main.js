import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import{MdTable,MdField} from 'vue-material/dist/components'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.config.productionTip = false

Vue.use(MdField)
Vue.use(MdTable)
const firebaseConfig = {
  apiKey: "AIzaSyD3ilbMwVrD-rsurHZq7cuJbD7lkOvQGXo",
  authDomain: "bank-card-generator.firebaseapp.com",
  databaseURL: "https://bank-card-generator.firebaseio.com",
  projectId: "bank-card-generator",
  storageBucket: "bank-card-generator.appspot.com",
  messagingSenderId: "443573184712",
  appId: "1:443573184712:web:f67d0ad88069c4f0369dfd",
  measurementId: "G-RFTW3652NF",
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
firebase.auth().onAuthStateChanged((user) =>{
  if(user){
      store.dispatch('setUser', user);
  }else{
      store.dispatch('setUser', null);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export const db = firebase.firestore()
export const storage = firebase.storage()