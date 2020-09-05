<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add Bank</md-dialog-title>
     <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-field>
      <label>Bank</label>
      <md-input v-model="initial" ></md-input>
    </md-field>
      <div class="md-layout-item">
        <md-field>
          <md-select md-dense v-model="country" name="country" id="country" placeholder="Country">
            <md-option value="australia" width="100%">Australia</md-option>
            <md-option value="brazil">Brazil</md-option>
            <md-option value="japan">Japan</md-option>
            <md-option value="united-states">United States</md-option>
          </md-select>
        </md-field>
      </div>
             
     </form>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="showDialog = false"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true"
      >Show Dialog</md-button
    >
  </div>
</template>

<script>
export default {
  name: "DialogCustom",
  data: () => ({
    showDialog: false,
  }),
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
