<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="handleSubmit">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">SEO Content</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="title">Title</label>
                <md-input
                  name="title"
                  id="title"
                  v-model="pageMetadata.title"
                />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="keywords">Keywords</label>
                <md-input
                  name="keywords"
                  id="keywords"
                  v-model="pageMetadata.keywords"
                />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="description">Description</label>
                <md-textarea
                  name="description"
                  id="description"
                  v-model="pageMetadata.description"
                />
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions v-if="canSave">
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Save SEO</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { isEmpty } from "../../utils/validations";
export default {
  props: {
    onSubmit: Function,
    pageMetadataContent: Object,
    canSave: Boolean,
  },

  data: () => ({
    pageMetadata: {},
  }),

  methods: {
    handleSubmit: function () {
      if (!this.canSave) return;
      this.onSubmit();
    },
  },

  watch: {
    pageMetadataContent: function (newVal, oldVal) {
      if (isEmpty(newVal)) this.pageMetadata = {};
      else this.pageMetadata = newVal;
    },
  },

  created() {
    this.pageMetadata = isEmpty(this.pageMetadataContent) ? {} : this.pageMetadataContent;
  },
};
</script>

<style>
</style>