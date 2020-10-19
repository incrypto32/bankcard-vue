<template>
  <div class="mt-3">
    <div class="head-bar p-3 mx-2 row">
      <h2>Bank Requests</h2>
      <!-- <other-form-vue :isBankAd="isBankAd" /> -->
    </div>

    <b-table
      striped
      hover
      sort-icon-center
      sort-des
      :busy="isBusy"
      
      :items="requests"
      responsive="sm"
    >
      
      <!-- <template v-slot:cell(ad)="data">
        <bank-ad-dialog :bank="data.item.bank"></bank-ad-dialog>
      </template> -->
      <!-- <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template> -->
    </b-table>
  </div>
</template>

<script>
import Vue from "vue";

import OtherAdFormVue from "../components/OtherAdForm.vue";
import {

  db,
  metaDataCollection,
 
  requestsCollection,
  storage,
  updateTimestamp,
} from "../js/firebase";

export default {
  name: "TableTemplate",
  data: () => ({
    requests: [],
    showDialog: null,
    deleting: false,
    isBusy: true,
  }),
  props: ["heading","isBankAd"],
 



  created() {
    console.log("_____________________________")
    // Default Collection
    var collection=requestsCollection;
   

   
    collection.get().then((snap)=>{
      snap.docs.forEach((doc)=>{
        console.log(JSON.stringify(doc.data()))
        this.requests.push(doc.data())
      });
    })
  },
};
</script>
<style lang="scss" scoped>
.table-header {
  text-align: center;
}
th {
  margin: 1rem;
}
@media only screen and (min-width: 600px) {
  .img-fluid {
    width: 50%;
  }
}
</style>
