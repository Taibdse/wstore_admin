<template>
    <md-dialog :md-active="showDialog" style="max-width: 500px; min-width: 350px">
        <md-dialog-title>Edit word</md-dialog-title>
        <div style="padding: 20px">
            <form @submit.prevent="onSave" style="width: 100%">
                <md-field>
                    <label>English</label>
                    <md-input :value="word.en" @change="(e) => onChange('en', e.target.value)"></md-input>
                </md-field>
                <md-field>
                    <label>Vietnamese</label>
                    <md-input :value="word.vn" @change="(e) => onChange('vn', e.target.value)"></md-input>
                </md-field>
            </form>
        </div>
      <md-dialog-actions>
        <md-button class="md-default" type="button" @click="onToggleDialog(false)">Close</md-button>
        <md-button class="md-primary" :disabled="isSaving"  @click="onSave">
            {{ isSaving ? 'Saving...' : 'Save' }}
        </md-button>
      </md-dialog-actions>
    </md-dialog>

</template>

<script>
  export default {
    name: 'EditWordDialog',
    props: {
        showDialog: Boolean,
        isSaving: Boolean,
        onToggleDialog: Function,
        word: Object,
        onChange: Function,
        onSave: Function
    },
  }
</script>

<style scoped>
  /* .md-dialog .md-dialog-container {
    max-width: 768px!important;
    min-width: 768px!important;
    background-color: red;
  } */
</style>