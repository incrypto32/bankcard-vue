<template>
  <div>
    <md-table v-model="banks" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
        <dialog-vue></dialog-vue>
       
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Bank" md-sort-by="bank">{{
          item.bank
        }}</md-table-cell>
        <md-table-cell md-label="Country" md-sort-by="country">{{
          item.country
        }}</md-table-cell>
        <md-table-cell md-label="Tamlet" md-sort-by="country"
          ><img :src="item.url" width="200px" alt=""
        /></md-table-cell>
      </md-table-row>
    </md-table>
    <!-- <div  v-for="bank in banks" :key="bank.name">
      {{ bank.bank}} {{bank.country}}
    </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import { db, storage } from "../main";
import DialogVue from "../components/Dialog.vue";

Vue.use(VueMaterial);
export default {
  name: "TableTemplate",
  created() {
    db.collection("banks").onSnapshot((snap) => {
      var banks = [];
      if (!snap.empty) {
        snap.forEach(async (doc) => {
          var data = doc.data();
          data.id = doc.id;
          var pathReference = `/bankcardgen/${data.bank
            .toLowerCase()
            .replace(/\s/g, "")}`;
          await storage
            .ref(pathReference + ".png")
            .getDownloadURL()
            .then((url) => {
              data.url = url ?? "";
            });
          console.log(JSON.stringify(data));
          this.banks.push(data);
        });
      }
    });
  },
  components: {
    "dialog-vue": DialogVue,
  },
  data: () => ({
    banks: [],
    showDialog: null,
  }),
  methods: {
    setBanks(banks) {
      this.banks = banks;
    },
   
  },
};
</script>
<style lang="scss" scoped></style>
