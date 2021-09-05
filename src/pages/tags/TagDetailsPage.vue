<template>
  <div class="content">
    <h2 class="my-page-header">
      {{ insertTag ? "Insert Tag" : "Update Tag" }}
    </h2>
    <md-card class="my-card">
      <md-card-header :data-background-color="insertTag ? 'green' : 'orange'">
        <h4 class="title">Tag's information</h4>
      </md-card-header>

      <md-card-content>
        <div v-if="!insertTag && isLoading" style="text-align: center">
          <md-progress-spinner
            md-mode="indeterminate"
            style="margin: auto"
          ></md-progress-spinner>
        </div>
        <div v-if="insertTag || (!notfound && !isLoading)">
          <form class="md-layout" @submit.prevent="saveTag">
            <md-card class="">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="name">Name</label>
                      <md-input name="name" id="name" v-model="tag.name" />
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-checkbox v-model="tag.active">Active Tag</md-checkbox>
                  </div>
                </div>
              </md-card-content>

              <md-card-actions>
                <md-button type="submit" class="md-primary">Save</md-button>
              </md-card-actions>
            </md-card>
          </form>
        </div>
        <div v-if="!insertTag && notfound && !isLoading">
          <h3 style="text-align: center">Can not find this tag</h3>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import TagService from "../../services/tag.service";
import { isEmpty } from "@/utils/validations.js";
import { showSuccessMsg, showErrors } from "../../utils/alert";
import { getErrorsFromResponse } from "../../utils/errors";
import { SAVE_SUCCESS, SERVER_ERROR_MESSAGE } from "../../utils/constants";

export default {
  data: () => ({
    tag: {
      active: true,
    },
    isLoading: false,
    notfound: false,
    insertTag: false,
  }),
  methods: {
    getTagDetails: async function() {
      if (this.$route.path.indexOf("/tags/insert") > -1) {
        this.insertTag = true;
      } else {
        this.isLoading = true;
        const tagId = this.$route.params.tagId;
        try {
          const res = await TagService.getTagById(tagId);
          this.tag = res.data;
          console.log(this.tag);
          if (isEmpty(this.tag)) this.notfound = true;
        } catch (error) {
          this.notfound = true;
        }
        this.isLoading = false;
      }
    },

    showErrorsMessage: function(res) {
      const errors = getErrorsFromResponse(res.data.errors);
      showErrors({
        title: "Please check input data again!",
        text: errors,
      });
    },

    saveTag: async function() {
      this.isLoading = true;

      if (this.insertTag) {
        await this.handleInsertTag(this.tag);
      } else {
        await this.handleUpdateTag(this.tag);
      }
      this.isLoading = false;
    },

    handleInsertTag: async function(data) {
      try {
        const res = await TagService.insertTag(data);
        if (res.data.success === "1") {
          showSuccessMsg({ title: SAVE_SUCCESS, text: "" });
        } else {
          this.showErrorsMessage(res);
        }
      } catch (error) {
        showErrors({
          title: "System errors",
          text: SERVER_ERROR_MESSAGE,
        });
      }
    },

    handleUpdateTag: async function(data) {
      try {
        const res = await TagService.updateTag(data);
        if (res.data.success === "1") {
          showSuccessMsg({
            title: SAVE_SUCCESS,
            text: "",
          });
        } else {
          this.showErrorsMessage(res);
        }
      } catch (error) {
        showErrors({
          title: "System errors",
          text: SERVER_ERROR_MESSAGE,
        });
      }
    },

    getTags: async function() {
      const res = await TagService.getFullTags();
      this.tags = res.data;
    },
  },
  async created() {
    this.getTagDetails();
  },
};
</script>

<style>
.md-list-item span.md-list-item-text {
  padding-top: 13px;
  padding-left: 10px;
}

.page-heading {
  text-align: center;
  margin-top: 0;
  font-size: 2em;
}
</style>
