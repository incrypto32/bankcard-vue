<template>
  <div>
    <b-button v-b-modal="bank">Launch demo modal</b-button>

    <b-modal :id="bank" title="Bank Ad" hide-footer>
      <b-row align-h="center"
        ><div :v-if="loading">
          <b-spinner
            variant="primary"
            type="grow"
            label="Spinning"
          ></b-spinner></div
      ></b-row>
      <b-row align-h="center"
        ><div :v-if="docExists"><img :src="url" width="100%" alt="" /></div
      ></b-row>
      <b-row align-h="center"
        ><b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          required
          accept="image/png"
        ></b-form-file
      ></b-row>
    </b-modal>
  </div>
</template>

<script>
import { bankAdsCollection, storage } from "../js/firebase";
export default {
  created() {
    var bank = this.bank.toLowerCase().replace(/\s/g, "");
    console.log(bank);
    this.loading = true;
    bankAdsCollection.doc(bank).onSnapshot(async (snap) => {
      if (snap.exists) {
        console.log(`DOC EXISTS FOR ${bank}`);
        this.url = await storage
          .ref("bank_ads")
          .child(snap.data().asset)
          .getDownloadURL()
          .catch((e) => {
            console.log(e);
            this.loading = false;
          });

        console.log(this.url);
      }
      this.loading = false;
    });
  },
  props: ["bank"],
  data() {
    return { docExists: false, url: "", file: "", loading: true };
  },
  methods: {
    logger() {
      console.log(this.bank);
    },
  },
};
</script>
