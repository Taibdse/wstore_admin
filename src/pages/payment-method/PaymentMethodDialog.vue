<template>
    <md-dialog :md-active="showDialog" style="width: 70%; max-width: 1200px; min-width: 600px; max-height: 90%">
        <md-dialog-title>{{ editMode ? 'Update' : 'Create' }} payment method</md-dialog-title>
        <md-dialog-content>

          <div v-if="loading" style="text-align: center">
            <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
          </div>          

          <div style="padding: 20px" v-if="!loading">
            <h3 class="text-center" v-if="notfound">Can not find this payment method</h3>
            <form v-if="!notfound" @submit.prevent="handleSave" style="width: 100%">
                <md-field>
                    <label>Name (VN)</label>
                    <md-input v-model="paymentMethod.name"></md-input>
                </md-field>
                <md-field>
                    <label>Name (EN)</label>
                    <md-input v-model="paymentMethod.nameEn"></md-input>
                </md-field>
                <div class="md-layout md-gutter" style="margin-top: 20px">
                      <div class="md-layout-item md-size-100">
                          <strong>Content (VN)</strong>
                          <MyEditor 
                              :ref="'paymentMethodContentVN'" 
                              :content="paymentMethod.content" />
                      </div>
                  </div>
                  <div class="md-layout md-gutter" style="margin-top: 20px">
                      <div class="md-layout-item md-size-100">
                          <strong>Content (EN)</strong>
                          <MyEditor 
                              :ref="'paymentMethodContentEN'" 
                              :content="paymentMethod.contentEn" />
                      </div>
                  </div>
            </form>
          </div>
        </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-default" type="button" @click="onToggleDialog(false)">Close</md-button>
        <md-button class="md-primary" :disabled="isSaving"  @click="handleSave">
            {{ isSaving ? 'Saving...' : 'Save' }}
        </md-button>
      </md-dialog-actions>
    </md-dialog>
</template>

<script>
import MyEditor from '../../components/common/MyEditor'

  export default {
    name: 'PaymentMethodDialog',
    components: {
      MyEditor
    },
    props: {
        showDialog: Boolean,
        isSaving: Boolean,
        onToggleDialog: Function,
        paymentMethod: Object,
        onSave: Function,
        editMode: Boolean,
        notfound: Boolean,
        loading: Boolean,
    },

    methods: {
        handleSave: function(){
          const content = this.$refs['paymentMethodContentVN'].$data.myContent;
          const contentEn = this.$refs['paymentMethodContentEN'].$data.myContent;
          const data = {
            ...this.paymentMethod,
            content, contentEn
          }
          console.log(data)
          this.onSave(data);

        }
    },

    watch: {
      paymentMethod: function(newVal, oldVal){

      },

      
    }
  }
</script>

<style scoped>
  /* .md-dialog .md-dialog-container {
    max-width: 768px!important;
    min-width: 768px!important;
    background-color: red;
  } */
</style>