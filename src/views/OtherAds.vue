<template>
 <div class="mt-3">
   <div class="head-bar p-3 mx-2 row"><h2>Other Ads</h2>  <other-form-vue :isBankAd="false"/></div>
    
    <b-table
      striped
      hover
      sort-icon-center
      sort-des
      :busy="isBusy"
      :fields="fields"
      :items="banks"
      responsive="sm"
    >
  
      <template v-slot:head()="data">
        <div class="table-header">{{ data.label.toUpperCase() }}</div>
      </template>
      <!-- A virtual column -->
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>

     

      <!-- A virtual composite column -->
   

      <template v-slot:cell(ad)="data">
        <center><img :src="data.item.url" class="img-fluid" alt="" /></center>
      </template>
      <template v-slot:cell(delete)="data">
        <center>
          <button
            class="btn btn-danger"
            v-b-modal.deleteModal
            v-on:click="deleteFunc(data.item)"
          >
           <div v-if="deleting"><b-spinner variant="primary" label="Spinning"></b-spinner>
</div>  <div v-else>delete</div>
          </button>
        </center>
      </template>
      <!-- <template v-slot:cell(ad)="data">
        <bank-ad-dialog :bank="data.item.bank"></bank-ad-dialog>
      </template> -->
       <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from "vue";


import OtherAdFormVue from '../components/OtherAdForm.vue';
import { bankAdsCollection, banksCollection, db,metaDataCollection,otherAdsCollection,storage, updateTimestamp } from '../js/firebase';


export default {
  name: "TableTemplate",
  created() {
    otherAdsCollection.onSnapshot((snap) => {
      var banks = [];
      if (!snap.empty) {
        snap.forEach(async (doc) => {
          this.isBusy=false
          var data = doc.data();
          data.id = doc.id;
          var pathReference = `/random_ads/${data.name
            .toLowerCase()
            .replace(/\s/g, "")}`;
          await storage
            .ref(pathReference + ".png")
            .getDownloadURL()
            .then((url) => {
              data.url = url ?? "";
            });
          console.log(JSON.stringify(data));
          banks.push(data);
        });
        this.banks=banks
      }else{
        this.banks=[]
      }
    });
  },
  components: {
    
    "other-form-vue":OtherAdFormVue,
 
  },
  data: () => ({
    fields: [
      // A virtual column that doesn't exist in items
      { key: "index" },
      // A column that needs custom formatting
      { key: "name", sortable: true },
      // A regular column
      // A regular column
      { key: "ad" },
       { key: "delete" },
  
    ],
    banks: [],
    showDialog: null,
    deleting:false,
    isBusy:true,
  }),
  methods: {
    setBanks(banks) {
      this.banks = banks;
    },
    rowListener(){
      console.log("Clicked Row");
    },
     deleteFunc(item) {
       this.deleting=true
      console.log(JSON.stringify(item));
      otherAdsCollection
        .doc(item.id)
        .delete()
        .then(() => {
          storage
            .ref("random_ads")
            .child(item.name.toLowerCase().replace(/\s/g, "")+".png")
            .delete()
            .then(() => {
              updateTimestamp()
              console.log(
                `deleted ${item.name
                  .toLowerCase()
                  .replace(/\s/g, "")+".png"} from storage`
              );
              this.deleting=false
            })
            .catch((e) => {
              this.deleting=false
              console.log(e);
            });
        })
        .catch((e) => {
          this.deleting=false
          console.log(e);
        });
    },
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
.img-fluid{
  width:50%;
}
}
</style>
