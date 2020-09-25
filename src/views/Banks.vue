<template>
  <div class="mt-3"> 
    <div class="head-bar p-3 mx-2 row">
      <h2>Banks</h2>
      <bank-form-vue />
    </div>

    <b-table
      striped
      hover
      sort-icon-center
      :busy="isBusy"
      :fields="fields"
      :items="banks"
      responsive="sm"
    >
      <template v-slot:head()="data">
        <div class="table-header">{{ data.label.toUpperCase() }}</div>
      </template>

      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template v-slot:cell(url)="data">
        <center><img :src="data.value" class="img-fluid" alt="" /></center>
      </template>

      <template v-slot:cell(delete)="data">
        <center>
          <button
            class="btn btn-danger"
            v-b-modal.deleteModal
            v-on:click="deleteFunc(data.item)"
          >
            delete
          </button>
        </center>
      </template>

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
import BankFormVue from "../components/BankForm.vue";
import {
  bankAdsCollection,
  banksCollection,
  db,
  storage,
  updateTimestamp,
} from "../js/firebase";

import BankAdDialogVue from "../components/BankAdDialog.vue";
import { Page } from "../js/constants";
import OtherAdFormVue from "../components/OtherAdForm.vue";

export default {
  name: "Banks",
  props: ["page"],
  created() {
    var ref = "bankcardgen";
    var Itemname = "bank";
    var collection = banksCollection;

    switch (this.page) {
      case Page.banks:
        collection = banksCollection;
        var ref = "bankcardgen";
        break;
      case Page.bankAds:
        collection = bankAdsCollection;
        var ref = "bank_ads";
        name = "name";
        break;
      case Page.OtherAds:
        collection = bankAdsCollection;
        var ref = "random_ads";
        name = "name";
        break;
      default:
        collection = banksCollection;
    }

    collection.onSnapshot((snap) => {
      // Go for doc Changes
      snap.docChanges().forEach(async (docChange) => {
        var doc = docChange.doc;
        var data = doc.data();
        var oldIndex = docChange.oldIndex;
        var newIndex = docChange.newIndex;
        var err;

        data.id = docChange.doc.id;
        console.log(data.bank);
        console.log(docChange);

        const getDownloadURL = async () => {
          var name = data[Itemname].toLowerCase().replace(/\s/g, "");

          var downloadUrl = await storage
            .ref(ref)
            .child(name + ".png")
            .getDownloadURL()
            .catch((e) => {
              console.log(e);
              err = true;
            });

          return downloadUrl;
        };

        if (docChange.type == "added") {
          var url = await getDownloadURL();
          data.url = url;
          this.banks.push(data);
        } else if (docChange.type == "modified") {
          if (oldIndex == newIndex) {
            var url = await getDownloadURL();
            data.url = url;
            this.banks[docChange.newIndex] = data;
          } else {
            this.banks.splice(oldIndex, 1);
            this.banks[newIndex] = data;
          }
        } else if (docChange.type == "removed") {
          for (var i = 0; i < this.banks.length; i++) {
            if (doc.id == this.banks[i].id) {
              this.banks.splice(i, 1);
            }
          }
        }
      });
    });
  },
  components: {
    "bank-form-vue": BankFormVue,
    "other-ad-form": OtherAdFormVue,
    "bank-ad-form": BankFormVue,
  },
  data: () => ({
    fields: [
      { key: "index" },
      { key: "bank", sortable: true },
      { key: "country", sortable: true },
      { key: "url" },
      { key: "delete" },
    ],
    banks: [],
    showDialog: null,
    isBusy: null,
  }),
  methods: {
    pushToBanks() {},
    rowListener() {
      console.log("Clicked Row");
    },
    deleteFunc(item) {
      console.log(JSON.stringify(item));
      banksCollection
        .doc(item.id)
        .delete()
        .then(() => {
          storage
            .ref("bankcardgen")
            .child(item.bank.toLowerCase().replace(/\s/g, "") + ".png")
            .delete()
            .then(() => {
              updateTimestamp();
              console.log(
                `deleted ${item.bank.toLowerCase().replace(/\s/g, "") +
                  ".png"} from storage`
              );
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
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
  .img-fluid {
    width: 50%;
  }
}
</style>
