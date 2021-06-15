<template>
  <div class="content">
    <Loading :isLoading="isLoading" />
    <h2 class="my-page-header">Website Details</h2>
    <div style="margin-bottom: 10px">
      <md-button
        class="md-raised md-primary"
        style="margin-left: auto; float: right"
        @click="handleUpdateSitemap"
      >
        Update sitemap
      </md-button>
    </div>

    <md-dialog :md-active="updatingSitemap">
      <md-dialog-title>Updating sitemap</md-dialog-title>
      <md-dialog-content>
        <div style="text-align: center">
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
      </md-dialog-content>
    </md-dialog>

    <md-card>
      <md-card-header data-background-color="orange">
        <h4 class="title" style="text-align: center">Edit Website Details</h4>
      </md-card-header>
      <md-card-content>
        <div v-if="!notfound && !isEmpty(website)">
          <form @submit.prevent="saveWebsite">
            <div class="md-layout md-gutter" style="margin-top: 20px">
              <div class="md-layout-item md-size-100">
                <strong>Upload home banner images (can upload multipleimages)</strong>
                <br /><br />
                <div>
                  <DropzoneUpload
                    ref="dropzoneHomeBannerImage"
                    :id="'dropzoneHomeBannerImage'"
                    :uploadMultiple="true"
                    :uploadedFiles="website.homeBannerImages"
                  >
                  </DropzoneUpload>
                </div>
              </div>
            </div>

            <div class="md-layout md-gutter" style="margin-top: 20px">
              <div class="md-layout-item md-size-100">
                <strong style="margin-bottom: 20px"
                  >Upload sub-banner image (only 1 image)</strong
                ><br /><br />
                <DropzoneUpload
                  ref="dropzoneSubBannerImage"
                  :id="'dropzoneSubBannerImage'"
                  :uploadMultiple="false"
                  :uploadedFiles="website.subBannerImage"
                ></DropzoneUpload>
              </div>
            </div>

            <div class="md-layout md-gutter" style="margin-top: 20px">
              <div class="md-layout-item md-size-100">
                <strong>AddThis Social Plugin</strong>
                <md-field>
                  <md-textarea v-model="website.socialPlugin" style="width: 100%"></md-textarea>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter mt-5" style="margin-top: 20px">
              <md-button
                type="submit"
                class="md-raised md-primary"
                style="margin-left: auto"
              >
                Save
              </md-button>
            </div>
          </form>
        </div>
        <div v-if="notfound">
          <h3 style="text-align: center">Can not find website details</h3>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import WebsiteService from "../../services/website.service";
import SitemapService from "../../services/sitemap.service";
import { isEmpty } from "../../utils/validations";
import { showErrors, showSuccessMsg } from "../../utils/alert";
import { getErrorsFromResponse } from "../../utils/errors";
import {
  SERVER_ERROR_MESSAGE,
  IMAGE_HOME_BANNER,
  IMAGE_SUB_BANNER,
  SAVE_SUCCESS,
  SAVE_FAILED,
} from "../../utils/constants";
import DropzoneUpload from "../../components/common/DropzoneUpload";
import { formatImageUrl } from "../../utils/strings";
import Loading from "../../components/common/Loading.vue";

export default {
  components: {
    DropzoneUpload,
    Loading,
  },

  data: () => ({
    website: {},
    isLoading: false,
    notfound: false,
    updatingSitemap: false,
  }),

  methods: {
    getWebsiteInfo: async function () {
      this.isLoading = true;
      try {
        const res = await WebsiteService.getLatestWebsiteInfo();
        this.website = res.data;
        if (isEmpty(this.website)) {
          this.notfound = true;
        } else {
          if (isEmpty(this.website.images)) {
            this.website.homeBannerImages = [];
            this.website.subBannerImage = [];
          } else {
            this.website.homeBannerImages = this.website.images
              .filter((img) => img.type == IMAGE_HOME_BANNER)
              .map((img) => ({
                url: formatImageUrl(img.url),
                name: img.name,
              }));

            this.website.subBannerImage = this.website.images
              .filter((img) => img.type == IMAGE_SUB_BANNER)
              .map((img) => ({
                url: formatImageUrl(img.url),
                name: img.name,
              }));
          }
        }
      } catch (error) {
        this.notfound = true;
      }
      this.isLoading = false;
    },

    saveWebsite: async function () {
      this.isLoading = true;
      try {
        const uploadedHomeBannerImages = this.$refs.dropzoneHomeBannerImage.getUploadedFiles();
        const uploadedSubBannerImage = this.$refs.dropzoneSubBannerImage.getUploadedFiles();
        const manaullyAddedHomeBannerImages = this.$refs.dropzoneHomeBannerImage.getManuallyAddedFiles();

        const websiteDto = JSON.parse(JSON.stringify(this.website));
        websiteDto.homeBannerImages = uploadedHomeBannerImages.map(
          (item) => item.dataURL
        );
        websiteDto.subBannerImage = isEmpty(uploadedSubBannerImage)
          ? null
          : uploadedSubBannerImage[0].dataURL;

        websiteDto.removedHomeBannerImages = this.website.images
          .filter((img) => {
            return (
              img.type == IMAGE_HOME_BANNER &&
              manaullyAddedHomeBannerImages.findIndex(
                (item) => item.name == img.name
              ) == -1
            );
          })
          .map((item) => item.id);

        const res = await WebsiteService.updateWebsiteInfo(websiteDto);
        if (res.data.success == "1") {
          this.getWebsiteInfo();

          showSuccessMsg({
            title: SAVE_SUCCESS,
            text: "The information was saved!",
            timer: 4000,
          });
        } else {
          let errorStr = getErrorsFromResponse(res.data.errors);
          showErrors({
            title: SAVE_FAILED,
            text: errorStr,
          });
        }
      } catch (error) {
        showErrors({
          title: "",
          text: SERVER_ERROR_MESSAGE,
        });
      }
      this.isLoading = false;
    },
    handleUpdateSitemap: async function () {
      this.updatingSitemap = true;
      try {
        await SitemapService.update();
        showSuccessMsg({
          title: SAVE_SUCCESS,
          text: "Sitemap was updated!",
          timer: 4000,
        });
      } catch (error) {
        console.log(error);
      }
      this.updatingSitemap = false;
    },
    isEmpty,
  },
  async created() {
    this.getWebsiteInfo();
  },
};
</script>

<style>
</style>