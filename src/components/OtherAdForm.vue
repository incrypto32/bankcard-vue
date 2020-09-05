<template>
  <div class="ml-auto">
    <b-modal id="my-modal" cancel-disabled ok-disabled hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          v-if="isBankAd"
          id="input-group-1"
          label="Bank :"
          label-for="input-1"
        >
          <b-form-select
            id="input-1"
            v-model="form.name"
            :options="banks"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          v-else
          id="input-group-2"
          label="Ad Name :"
          label-for="input-2"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter Ad Name"
          ></b-form-input>
        </b-form-group>

        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          required
          accept="image/png"
        ></b-form-file>

        <div class="mt-3">Selected file: {{ file ? file.name : "" }}</div>
        <b-progress
          :value="uploadProgress"
          :max="100"
          show-progress
          animated
        ></b-progress>

        <div class="err my-2 text-center text-white bg-danger">{{ err }}</div>
        <div class="err my-2 text-center text-white bg-success">{{ err }}</div>

        <hr />

        <b-button type="submit" variant="primary" class="mx-2">Submit</b-button>
        <b-button type="reset" variant="danger" class="mx-2">Reset</b-button>
      </b-form>
    </b-modal>

    <button class="btn btn-primary ml-auto" v-b-modal.my-modal>Add</button>
  </div>
</template>

<script>
import {
  firebase,
  banksCollection,
  metaDataCollection,
  cachingDoc,
  storage,
  bankAdsCollection,
  otherAdsCollection,
} from "../js/firebase";
export default {
  created() {
    if (this.isBankAd) {
      banksCollection.get().then((snap) => {
        snap.forEach((doc) => {
          this.banks.push(doc.data().bank);
        });
        console.log(this.banks);
      });
    }
  },
  props: ["isBankAd"],
  data() {
    return {
      form: {
        name: "",
      },
      banks: [],
      file: null,
      show: true,
      err: null,
      success: null,
      uploadProgress: null,
    };
  },
  methods: {
    async onSubmit(evt) {
      console.log("___Submitting____");
      var ref;
      if (this.isBankAd) {
        ref = "bank_ads";
      } else {
        ref = "random_ads";
      }

      evt.preventDefault();

      if (this.form.name) {
        if (this.file) {
          var thisRef = storage
            .ref(ref)
            .child(this.form.name.toLowerCase().replace(/\s/g, "") + ".png");

          var uploadTask = thisRef.put(this.file);

          // Fires on each upload snapshots
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot.bytesTransferred);
              this.uploadProgress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },

            // Fires When upload is unsuccessfull

            (err) => {
              console.log(err);
              this.err = "Upload error occured check network";
            },

            // Fires on upload success
            () => {
              console.log("Completed");
              otherAdsCollection.add(this.form).then(async (v) => {
                var ts = await cachingDoc
                  .update({
                    lud: firebase.firestore.FieldValue.serverTimestamp(),
                  })
                  .catch((e) => console.log(e));
                this.onReset();
                this.success = "Bank Created Successfully";
              });
            }
          );
        } else {
          this.err = "Error please try again";
        }
      } else {
        this.err = "Please fill all the fields";
      }
    },
    onReset(evt) {
      console.log("reset");
      if (evt) evt.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.file = null;
      this.err = null;
      this.uploadProgress = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
