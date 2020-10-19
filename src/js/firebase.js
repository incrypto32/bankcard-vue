import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// firebase init - add your own config here

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

// settings
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

// utils
const db = firebase.firestore();
db.enablePersistence().catch((e)=>{
  console.log(e)
})
console.log("firestore persistance enabled");
const auth = firebase.auth();
const storage = firebase.storage();


// collection references
const banksCollection = db.collection("banks");
const bankAdsCollection = db.collection("bank_ads");
const otherAdsCollection = db.collection("random_ads");
const requestsCollection = db.collection("requests");
const metaDataCollection = db.collection('metadata')
const cachingDoc = metaDataCollection.doc('caching')
const updateTimestamp= async () => await metaDataCollection.doc('caching').update({lud:firebase.firestore.FieldValue.serverTimestamp()})
// export utils/refs
export { firebase,db, auth, storage, banksCollection,metaDataCollection, bankAdsCollection,otherAdsCollection,cachingDoc, updateTimestamp,requestsCollection};
